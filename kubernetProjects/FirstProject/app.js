const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Kubernetes!');
});

server.listen(5001, () => {
  console.log('Server running at http://localhost:5001/');
});