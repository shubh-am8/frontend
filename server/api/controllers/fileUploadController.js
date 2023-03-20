exports.uploadFile = async (req, res) => {
    try {
        const { refreshedToken, file } = req; 
        console.log("file  => ", file);
        let finalRes = { file_path: file.path ? `https://onboard.tripleplay.in/uploads/${file.filename}` : "", file_name: file.filename ? file.filename : "" }
        if (file) {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.fileUploadSuccess, 200, finalRes, refreshedToken);
        } else {
            _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.uploadFail, 400, finalRes, refreshedToken);
        }
    } catch (err) {
        console.log("uploading file err", err)
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
}