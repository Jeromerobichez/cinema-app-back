const http = require('http'); // import http module
const url = require('url'); // import the "url" module of node.js
require('dotenv').config() // importing the dotenv
const express = require("express");
const app = express();
const cors = require('cors')
const axios = require('axios');
const { response } = require('express');
const { log } = require('console');

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
app.use(cors('*'))
app.listen(port, () => console.log(`hello we are listinning on port number ${port} `));
app.use(express.static('public'))
app.use(express.json())

let firstActor = ''
let secondActor = ''
let firstActorId = 0
let secondActorId = 0
let MyResults = {}
let picOne = 'https://emojipedia-us.s3.amazonaws.com/source/skype/289/question-mark_2753.png'
let picTwo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKEbQ8upNPjiV8-rF263Ews12oMmJHf4RKwA&usqp=CAU"
let firstActorName = ''
let secondActorName = ''
app.post('/api', async (req, res) => {

  firstActor = req.body.nameFirstActor.replace(' ', '+')
  firstActor = firstActor.replace('é', 'e')
  firstActor = firstActor.replace('è', 'e')
  firstActor = firstActor.replace('ï', 'i')
  firstActor = firstActor.replace('î', 'i')
  firstActor = firstActor.replace('ô', 'o')
  firstActor = firstActor.replace('à', 'a')
  firstActor = firstActor.replace('ù', 'u')
  firstActor = firstActor.replace('ç', 'c')

  secondActor = req.body.nameSecondActor.replace(' ', '+')
  secondActor = secondActor.replace('é', 'e')
  secondActor = secondActor.replace('è', 'e')
  secondActor = secondActor.replace('î', 'i')
  secondActor = secondActor.replace('ï', 'i')
  secondActor = secondActor.replace('ô', 'o')
  secondActor = secondActor.replace('à', 'a')
  secondActor = secondActor.replace('ù', 'u')
  secondActor = secondActor.replace('ç', 'c')

  const url = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${firstActor}&include_adult=false`
  const secondUrl = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${secondActor}&include_adult=false`

  let actor1 = await axios(url).catch(
    (err) => {
      console.log("ERREUR n°1", err);
    })

  if (actor1.data.results[0] !== undefined) {
    picOne = actor1.data.results[0].profile_path
    firstActorId = actor1.data.results[0].id
    firstActorName = actor1.data.results[0].name
  }




  let actor2 = await axios(secondUrl).catch(
    (err) => {
      console.log(err);
    })
  if (actor2.data.results[0] !== undefined) {

    picTwo = actor2.data.results[0].profile_path
    secondActorId = actor2.data.results[0].id
    secondActorName = actor2.data.results[0].name

  }



  const urlId = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_people=${firstActorId},${secondActorId}&sort_by=vote_average.desc`

  let filmList = await axios(urlId).catch(
    (err) => {
      console.log(err);
    })

  actor1.data.results[0] === undefined ?
    MyResults = { results: "no data for actor1" } :
    actor2.data.results[0] === undefined ? MyResults = { results: "no data for actor2" } :
      filmList.data.results.length === 0 ? MyResults = {
        results: "no common movie",
        firstPic: picOne,
        secondPic: picTwo,
        nameActorOne: firstActorName,
        nameActorTwo: secondActorName
      } :
        MyResults = {
          results: filmList.data.results,
          firstPic: picOne,
          secondPic: picTwo,
          nameActorOne: firstActorName,
          nameActorTwo: secondActorName
        }
  res.set('Access-Control-Allow-Origin', '*')
  res.send(MyResults)






})
app.post('/movie-detail', async (req, res) => {

  const url = `https://api.themoviedb.org/3/movie/${req.body.id}?api_key=${api_key}&language=en-US`

  let movieDetail = await axios(url).catch(
    (err) => {
      console.log(err);
    })

  res.set('Access-Control-Allow-Origin', '*')
  res.send(movieDetail.data)
})

app.post('/populars', async (req, res) => {
  const url = `https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=en-US&page=${req.body.page}`
  console.log("req req", req.body)
  let popular
  await axios.get(url)
    .then(res => {
      popular = res.data.results

    })
    .catch(e => {
      console.log("erreur catché", e.message)
    })
  res.set('Access-Control-Allow-Origin', '*')
  res.send(popular)

}
 /*  let populars = await axios(url).catch(
    (err) => {
      console.log("erreur in populars post => ", err);
    }
  )
  console.log("populars", populars.data)
 
} */)

// doc de l'api : https://developers.themoviedb.org/3





