const aws = require('aws-sdk');
aws.config = new aws.Config();
const { aws: { sqs_AccessKeyId, sqs_AccountId, sqs_region, sqs_SecretAccessKey } } = require(_pathConst.filesPath.config);
aws.config.accessKeyId = sqs_AccessKeyId,
  aws.config.secretAccessKey = sqs_SecretAccessKey,
  aws.config.region = sqs_region;


const sqs = new aws.SQS({ apiVersion: '2012-11-05' });
exports.addToSqs = async function (queueName, messageBody) {
  try {
    const params = {
      MessageBody: messageBody,
      QueueUrl: `https://sqs.ap-south-1.amazonaws.com/${sqs_AccountId}/${queueName}`
    };
    let data = await sqs.sendMessage(params).promise();
    return data;
  } catch (err) {
    throw err;
  }
}