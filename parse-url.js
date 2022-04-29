const url = require('url'); // import the "url" module of node.js

const exampleUrl = '/about?name=Jane&city=Boston'; // the URL we want to parse put in a variable

const parsedUrl = url.parse(exampleUrl, true)



const urlNoQuery = '/about';
const parsedUrlNoQuery = url.parse(urlNoQuery, true);

