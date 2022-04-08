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
let firstActor = ''
let secondActor = ''
let firstActorId = 0
let secondActorId = 0
app.post('/api', (req, res) => {
console.log('lalalala', req.body)
res.send({"Your request is well HERE received : ": req.body})
 firstActor = req.body.nameFirstActor.replace(' ', '+')



secondActor = req.body.nameSecondActor.replace(' ', '+')
 app.get("/api",
  async (req, res)=> {
    const url = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${firstActor}&include_adult=false`
    const reponse = await axios(url).catch(
      (err) => {
        console.log(err);
      })
     firstActorId = reponse.data.results[0].id
     console.log("firstActorId, firstActorId, firstActorId", firstActorId)
     const secondUrl = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${secondActor}&include_adult=false`
     const rep = await axios(secondUrl).catch(
      (err) => {
        console.log(err);
      })
      secondActorId = rep.data.results[0].id
      console.log("secondActorId, secondActorId, secondActorId", secondActorId)
    res.send(reponse.data.results) 
  
  }) 
 app.get("/api/coco", async (req, res) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_people=${firstActorId},${secondActorId}&sort_by=vote_average.desc`
  const reponse = await axios(url).catch(
    (err) => {
      console.log(err);
    })
   
  res.send(reponse.data) 

}) 



})


// doc de l'api : https://developers.themoviedb.org/3





