const Email = require('email-templates');
const mjml2html = require("mjml")
const fs = require("fs")

function mjml(mjmlpath,locals,cb) {
  let mjmlContent =  mjml2html(fs.readFileSync(mjmlpath).toString());
  cb(null,mjmlContent.html)
}
const nodemailer = require("nodemailer")
const realtransporter = nodemailer.createTransport({
  port: 1025,
  host: "localhost"
})
const email = new Email({
  message: {
    from: 'dalongdemoapp@k8s.net.cn'
  },
  preview:false,
  views: {
    options: {
      extension: 'mjml', // for mjml 
      map: {
        mjml: 'mjml',
      },
      engineSource: {
        mjml:mjml
      }
    }
  },
  send: true,
  transport: realtransporter
}
);

email
  .send({
    template: 'templates',
    message: {
      to: '1141591465@qq.com',
      subject: "demoapp"
    },
    locals: {
      name: 'Elon'
    }
  })
  .then(console.log)
  .catch(console.error);