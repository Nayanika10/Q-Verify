import db from '../../sqldb';
import config from '../../config/environment';
import phpSerialize from '../php-serialize';
const swig = require('swig');

function sendEmail(email, subject, message = '<b></b>') {
  const emailInternals = {
    settings: {
      subject,
      to: email,
      bcc: 'bgc.notify@quetzal.in',
      emailFormat: 'html',
      from: ['bgc.notify@quetzal.in'],
      domain: 'app.qverify.com',
    },
    vars: { content: message },
  };
  const internalData = phpSerialize.serialize(emailInternals);
  const internalTask = {
    jobType: 'Email',
    group: 'email',
    data: internalData,
  };
  return db.QueuedTask.create(internalTask);
}

exports.emailIndividualTemplate = emailObject => {
  const html = swig.renderFile(`${config.root}/server/template/email_unread_message.html`, {
  });

  return sendEmail(emailObject.email, emailObject.subject, html);
};
