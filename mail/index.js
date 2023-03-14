require("dotenv").config();
const http = require("http");
const nodemailer = require("nodemailer");
const fs = require("fs");

const email = (message, response) => {
  const auth = nodemailer.createTransport({
    service: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PWD,
    },
  });

  const reciept = {
    from: "manishsheela902@gmail.com",
    to: "manish.2021ca058@mnnit.ac.in",
    subject: "Verification code",
    html: message,
    attachments: [
      {
        filename: "demo.jpg",
        content: fs.createReadStream("assets/test.jpg"),
      },
      {
        filename: "test.pdf",
        content: fs.createReadStream("assets/notes.pdf"),
      },
    ],
  };

  auth.sendMail(reciept, (error, emailRes) => {
    if (error) throw error;
    console.log("Success!");
    response.end();
  });
};

const server = http.createServer((request, response) => {
  fs.readFile("template.html", (error, message) => {
    email(message, response);
    response.end();
  });
});

server.listen(8080);
