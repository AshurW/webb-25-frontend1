// const http = require('node:http');
// const moment = require('moment')
import http from "node:http"
import moment from "moment"

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  const payload = {
    "name": moment().format('MMMM Do YYYY, h:mm:ss a')
  }
  response.end(JSON.stringify(payload));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});