const http = require("http");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secret = crypto.randomBytes(16).toString('hex');

const server = http.createServer((request,response)=>{
  const successMesage = jwt.sign(
    {
    message: "Success",
    data: [1,5,6,8]
    },
    secret
  );

  response.writeHead(200,{
    'Content-Type': 'application/json'
  });

  response.write(successMesage);

  response.end();

});

server.listen(8080);
