const express = require("express");
const multer = require("multer");
const { uploadFile } = require(_pathConst.controllersPath.fileUploadController);
const { authorize, authorizeCustomer } = require(_pathConst.filesPath.authHelper);
const router = express.Router();
const path = require('path')
const fs = require('fs');
let dir = path.resolve(__dirname, '../../../', 'uploads');
// console.log("routes dir log == >  ", __dirname);
console.log("routes path.resolve(__dirname, '..', 'uploads') == >  ", path.resolve(__dirname, '../../../', 'uploads'));
// const abc = require('../../uploads')
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname.split(" ").join("").toLowerCase()}`);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|bmp|gif|tiff|psd|pdf|jpe|jif|jfif|jfi|webp|heif|heic|raw|arw|cr|rw2|nrw|svg|svgz|eps)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  }
});
//changes
router.post('/upload', authorize, upload.single('uploaded_file'), uploadFile);
router.post('/uploadByCustomer', authorizeCustomer, upload.single('uploaded_file'), uploadFile);

module.exports = router;