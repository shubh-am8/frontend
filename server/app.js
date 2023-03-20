const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
global.appRoot = path.resolve(__dirname)
global._pathConst = require('./api/helpers/constantData/pathConst.js')
global._resHelper = require(_pathConst.filesPath.resHelper);
global._msgConst = require(_pathConst.filesPath.msgConst);
// global._pushNotificationTemplates = require(_pathConst.filesPath.pushNotificationsTemplates);
// global._fireBaseConnect = require(_pathConst.filesPath.connectFirebaseApp);
// global._err = require(_pathConst.filesPath.onErr);
const _dBContaxt = require(_pathConst.filesPath.dBContaxt);
global.knexSqlDb = _dBContaxt.getContext()
const app = express();
/*
 deleting tempUpload folder on 
restarting app to flush unnesseccory 
data from server
*/
// const fs = require('fs');
// let dir = './tempUploads';
// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir);
// } else {
//   fs.rmdirSync(dir, { recursive: true });
//   // fs.rm(dir, { recursive: true });
// }

var resModel = {
  meta: {
    status: false,
    message: "",
    code: null
  },
  data: {}
};
/**
 * Express MiddleWare
 */
//handle multipart requests
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //handle queryStrings
app.use(bodyParser.json({ limit: '50mb' }))

//handle session
app.use(session({
  secret: 'realtourup',
  rolling: true,
  saveUninitialized: true,
  resave: false
}))

//handle static files
// app.use(express.static(__dirname + '../uploads'))
app.use('/uploads',express.static(path.resolve(__dirname, '../', 'uploads')));
console.log("path.resolve(__dirname, '..', 'uploads')   ==> ", path.resolve(__dirname, '../', 'uploads'))
// app.use(express.static('./tempUploads'))
// app.use(express.static('assets'));
// app.use('/tempUploads', express.static('tempUploads'));
// app.use(express.static(path.resolve(__dirname, '..', 'build')));
// app.use(express.static('public'));
// app.get('/style.css', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'public/', 'style.css'));
// });
// app.get('/script.js', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'public/', 'script.js'));
// });
/**
 * app.use(express.static(path._makeLong('client')))      //handle static files
 * Root level routing
 */
// app.get('*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '..', 'build/', 'index.html'));
// })
// app.get('/tempUploads', function (req, res) {
//   res.sendFile(_pathConst.PagesPath.DocPage)
// })


app.use(function (req, res, next) {
  // Mentioning content types
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions) 
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use('/api', require(_pathConst.filesPath.routes));

// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
  if (err.error && err.error.isJoi) {
    let errDetail = []
    // we had a joi error, let's return a custom 400 json response
    if (err.error.details) {
      err.error.details.map(function (item) {
        var temp = {}
        temp[item.context.key] = item.message
        errDetail.push(temp)
      })
    }
    resModel.meta.status = false;
    resModel.meta.code = 400;
    resModel.meta.message = 'Model InValid';
    resModel.data = errDetail;
    res.json(resModel);
  } else {
    resModel.meta.status = false;
    resModel.meta.code = 500;
    resModel.meta.message = 'Error Occured';
    res.json(resModel);
  }
});
module.exports = app