// const { app: { aesKey } } = require(_pathConst.filesPath.configUrl);
const {app:{aesKey}} = require("../constantdata/config");

const randomString = require("randomstring"),
    cryptoJs = require("crypto-js"),
    crypto = require('crypto'),
    algorithm192 = 'aes-192-cbc',
    algorithmSha = "sha256",
    passCode = 'Anything which cant be encrypted',
    key = crypto.scryptSync(passCode, 'salt', 24),
    iv = Buffer.alloc(16, 0);




exports.encryptedPassword = (password) => {
    try {
        var salt = crypto.createHmac(algorithmSha, aesKey).update((crypto.randomBytes(8).toString('hex'))).digest('hex');
        var cipher = crypto.createHmac(algorithmSha, aesKey).update(salt + password).digest('hex');
        return (`${cipher} ${salt}`);
    } catch (error) {
        return error;
    }
}
/*
This Function used in sign in 
 it will return the password and salt string
 here salt (saltFromDb) is coming from database and pass (userPassword) from front end
 */
exports.getPasswordAndSaltString = (userPassword, saltFromDb) => {
    try {
        var cipher = crypto.createHmac(algorithmSha, aesKey).update(saltFromDb + userPassword).digest('hex');
        return (`${cipher} ${saltFromDb}`);
    } catch (error) {
        return error;
    }
}
