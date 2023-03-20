require('dotenv').config({ path: '.env' });
// exports.currencyInfo = {
//     currency: "INR",
//     currencySign: "₹"
// }
let whatsAppApiData ={
    otpTemplateName:"coolbox_otp_test",
    authToken: "g47g6NqHOBXEDcqQxmEy0VdeAK_2"
}
const env = process.env.NODE_ENV || "staging"; // 'development' or 'prod'

const staging = {
    app: {
        appPort: parseInt(process.env.APP_PORT || 8010),
        tokectSecret: process.env.TOKEN_SECRET || 'LowRate!@#$%^&*()',
        aesKey: process.env.AES_KEY || '',
        s3_accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        s3_secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        s3_region: process.env.S3_REGION || '',
        s3_bucket: process.env.S3_BUCKET || '',
        razorpay_test_key_id: process.env.RAZORPAY_TEST_KEY_ID,
        razorpay_test_key_seceret: process.env.RAZORPAY_TEST_KEY_SECERET,
        razorpay_test_webhook_seceret: process.env.RAZORPAY_TEST_WEBHOOK_SECERET,
        whatsAppApiData: whatsAppApiData
    },
    aws: {
        sqs_AccessKeyId: "AKIAZ6WTMWYQE2OZSYHY",
        sqs_AccountId: "684416874016",
        sqs_SecretAccessKey: "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",
        sqs_region: "ap-south-1",
    },
    db: {
        client: process.env.DB_CLIENT || 'mysql',
        host: process.env.STAGING_DB_HOST || '',
        user: process.env.STAGING_DB_USER || '',
        password: process.env.STAGING_DB_PASS || '',
        database: process.env.STAGING_DB_NAME || '',
        port: parseInt(process.env.STAGING_DB_PORT) || 3306,
        migrations: {
            // directory: './api/migrations',
            // tableName: 'migrations'
        },
    },
    pool: { }
};
const prod = {
    app: {
        appPort: parseInt(process.env.APP_PORT || 8010),
        tokectSecret: process.env.TOKEN_SECRET || 'LowRate!@#$%^&*()',
        aesKey: process.env.AES_KEY || '',
        s3_accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        s3_secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        s3_region: process.env.S3_REGION || '',
        s3_bucket: process.env.S3_BUCKET || '',
        razorpay_test_key_id: process.env.RAZORPAY_TEST_KEY_ID,
        razorpay_test_key_seceret: process.env.RAZORPAY_TEST_KEY_SECERET,
        razorpay_test_webhook_seceret: process.env.RAZORPAY_TEST_WEBHOOK_SECERET,
    },

    aws: {
        sqs_AccessKeyId: "AKIAZ6WTMWYQE2OZSYHY",
        sqs_AccountId: "684416874016",
        sqs_SecretAccessKey: "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",
        sqs_region: "ap-south-1",
    },
    db: {
        client: process.env.DB_CLIENT || 'mysql',
        host: process.env.PROD_DB_HOST || '',
        user: process.env.PROD_DB_USER || '',
        password: process.env.PROD_DB_PASS || '',
        database: process.env.PROD_DB_NAME || '',
        port: parseInt(process.env.PROD_DB_PORT) || 3306,
        migrations: {
            // directory: './api/migrations',
            // tableName: 'migrations'
        },
    },
    pool: { }
};

const config = {
    staging,
    prod
};

module.exports = config[env];