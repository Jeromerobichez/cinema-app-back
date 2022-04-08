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
app.listen(port, () => console.log(`hello we are listinning on port number ${port} `));
app.use(express.static('public'))
app.use(express.json())
let yo = ''
app.post('/api', (req, res) => {
console.log('lalalala', req.body)
res.send({"Your request is well HERE received : ": req.body})
firstActor = req.body.nameFirstActor
secondActor = req.body.nameSecondActor
app.get("/api", async (req, res) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_people=${firstActor},${secondActor}&sort_by=vote_average.desc`
  const reponse = await axios(url).catch(
    (err) => {
      console.log(err);
    })
   
  res.send(reponse.data) 

})



})


// doc de l'api : https://developers.themoviedb.org/3





