const express = require("express");
const router = new express.Router();
var resModel = {
  meta: {
    status: false,
    message: "",
    code: null
  },
  data: {}
};
router.use("/user", require(_pathConst.routesPath.userRoutes));
router.use("/file", require(_pathConst.routesPath.fileUploadRoutes));
router.use("/customer", require(_pathConst.routesPath.customerRoutes));
router.use("/triplePlayApis", require(_pathConst.routesPath.triplePlayApisRoutes));
// router.use("/v1/messages", require(_pathConst.routesPath.waMessageSenderRoutes));
// router.use("/v1/chatUsers", require(_pathConst.routesPath.chatUserRoutes));
// router.use("/v1/chatLogs", require(_pathConst.routesPath.chatLogRoutes));
// catch 404 and forward to error handler 
router.use((err, req, res, next) => {
  if (err.error && err.error.isJoi) {
    let errDetail = [];
    // we had a joi error, let's return a custom 400 json response
    if (err.error.details) {
      err.error.details.map(function (item) {
        var temp = new Object();
        temp[item.context.key] = item.message;
        errDetail.push(temp);
      });
    }
    resModel.meta.status = false;
    resModel.meta.code = 400;
    resModel.meta.message = "Model InValid";
    resModel.data = errDetail;
    res.json(resModel);
  }  else if ((err.code && err.code == 'LIMIT_FILE_SIZE')||err.message && err.message == 'Please upload a Image') {
    resModel.meta.status = false;
    resModel.meta.code = 500;
    resModel.meta.message = err.message;
    res.json(resModel);

  } else {
    resModel.meta.status = false;
    resModel.meta.code = 500;
    resModel.meta.message = "Error Occured";
    res.json(resModel);
  }
});

module.exports = router;
