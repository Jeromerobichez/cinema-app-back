const http = require('http'); // import http module
const url = require('url'); // import the "url" module of node.js
require('dotenv').config() // importing the dotenv
const express = require("express");
const app = express();
const cors = require('cors')
const axios = require('axios');
const { response } = require('express');

const api_key = process.env.api_key // creating the variable api_key in this file from the .env file

const port = 5000; // define the port

//below we create the function telling what the server 
// has to respond for the different URL request by the client
// 

/* let options = {
  host: 'https://api.themoviedb.org/3',
  port: {port},
  path: `/movie/500?${api_key}`,
  method: 'GET'
} */
app.use(cors('*'))
app.listen(port, () => console.log("hello we are listinning"));
app.use(express.static('public'))
app.use(express.json())
app.post('/api', (req, res) => {
console.log(req.body)
res.send({"Your request is well received : ": req.body})
})

/*   app.get('/api', async (req, res)=> {
    const apiUrl = `https://api.themoviedb.org/3/movie/500?${api_key}`
    const respuestas = await axios(apiUrl)
    const jsonR =  await respuestas.json()
    res.json(jsonR);
    console.log('yilou', jsonR)
    
  })
 */
