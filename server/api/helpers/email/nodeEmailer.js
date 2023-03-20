const nodemailer = require('nodemailer');
const { generateLeadEmailTemplate } = require(_pathConst.filesPath.emailTemplate);


exports.sendEmail = async (emailData) => {
  let emailTemplate = await generateLeadEmailTemplate(emailData)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chatbotlarix@gmail.com',
      pass: 'cyqtmvixznylkpnl'
    }
  });

  var mailOptions = {
    from: 'chatbotlarix@gmail.com',
    to: 'ashish.yadav@larixtechnologies.com',
    cc: 'shubham.sharma@larixtechnologies.com,jyoti@larixtechnologies.com,monika@larixtechnologies.com',
    subject: emailData.subject ? emailData.subject : 'New Lead Generated on Chatbot.team',
    html: emailTemplate
  };

 await transporter.sendMail(mailOptions,async function (error, info) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log('Email sent: ' + info.response);
      return true;
    }
  });

}


