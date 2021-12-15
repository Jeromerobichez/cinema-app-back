const http = require('http'); // import http module



const port = 3000; // define the port

//below we create the function telling what the server 
// has to respond for the different URL request by the client
// 
const requester = (request, response) => {
    console.log(request.url);
    if (request.url === '/') {
        response.end('Hello Node.js Server! you are on the homepage');
      } else if (request.url === '/about') {
        response.end('This demonstrates routing with Node.js.');
      } else {
        response.end('Default page (URLs other than / and /about)');
      }
  };
  // this below create the server
  const server = http.createServer(requester);

  // this make the server listen on the defined port
  server.listen(port, (err) => {
    if (err) {
      console.error('oh noooooo');
    } else {
      console.log(`server is listening on ${port}`);
    }
  });
  