const http = require('http'); // import http module
const url = require('url'); // import the "url" module of node.js
require('dotenv').config() // importing the dotenv
const express = require("express");
const app = express();
const cors = require('cors')
const axios = require('axios');
const { response } = require('express');

const api_key = process.env.api_key // creating the variable api_key in this file from the .env file

const port = process.env.PORT; // define the port

//below we create the function telling what the server 
// has to respond for the different URL request by the client
// 

/* let options = {
  host: 'https://api.themoviedb.org/3',
  port: {port},
  path: `/movie/500?${api_key}`,
  method: 'GET'
} */
/* app.use(cors('*')) */
app.listen(port, () => console.log(`hello we are listinning on port number ${port} `));
app.use(express.static('public'))
app.use(express.json())

let firstActor = ''
let secondActor = ''
let firstActorId = 0
let secondActorId = 0
let MyResults = {}
let picOne = 'https://emojipedia-us.s3.amazonaws.com/source/skype/289/question-mark_2753.png'
let picTwo ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKEbQ8upNPjiV8-rF263Ews12oMmJHf4RKwA&usqp=CAU"
app.post('/api', async (req, res) => {
  console.log("req.body dans le SERVEUR", req.body)


 firstActor = req.body.nameFirstActor.replace(' ', '+')



secondActor = req.body.nameSecondActor.replace(' ', '+')
const url = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${firstActor}&include_adult=false`
const secondUrl = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${secondActor}&include_adult=false`
let actor1 = await axios(url).catch(
  (err) => {
    console.log("ERREUR n°1", err);
  })
 
  if (actor1.data.results[0] !== undefined) { 
 picOne = actor1.data.results[0].profile_path
 firstActorId = actor1.data.results[0].id }

 

 let actor2 = await axios(secondUrl).catch(
  (err) => {
    console.log(err);
  })
  if (actor2.data.results[0] !== undefined) {
   
  picTwo = actor2.data.results[0].profile_path 
  secondActorId = actor2.data.results[0].id

  }



  const urlId = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_people=${firstActorId},${secondActorId}&sort_by=vote_average.desc`
  
  let filmList = await axios(urlId).catch(
    (err) => {
      console.log(err);
    })

    actor1.data.results[0] === undefined  ? 
      MyResults = {results:"no data for actor1"} :
      actor2.data.results[0] === undefined  ?  MyResults = { results: "no data for actor2"} :
      filmList.data.results.length === 0 ? MyResults = { results: "no common movie", firstPic: picOne, secondPic: picTwo} :
  MyResults = { results: filmList.data.results, firstPic: picOne, secondPic: picTwo}

  res.send(MyResults) 
  





})
app.post('/movie-detail', async (req, res) => {
  console.log("req cest ", req.body.id)
   const url = `https://api.themoviedb.org/3/movie/${req.body.id}?api_key=${api_key}&language=en-US`
 
   let movieDetail = await axios(url).catch(
    (err) => {
      console.log(err);
    })
    console.log("movieDetail", movieDetail.data)

res.send(movieDetail.data)})

// doc de l'api : https://developers.themoviedb.org/3





