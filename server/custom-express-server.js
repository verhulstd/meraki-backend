const express = require('express')
const uuid = require('uuid/v4');
const cors = require('cors')
const morgan = require('morgan')
const data = require('./data')
// const { Client } = require('pg')
const knex = require('./db')
// before express version Express < 4.16.0
// const bodyParser = require('body-parser');

const server = express()
server.listen(5678)

server.use(express.json())
server.use(cors())
server.use(morgan('dev'))

// const client = new Client({
//     host: 'localhost',
//     port: 5433,
//     database: "meraki",
//     user: 'root',
//     password: 'rootpass'
// })

/* HTTP METHOD GET */

// GET ALL MOVIES
server.get('/api/movies', async (req, res) => res.json(await knex.from('movies')))


// server.get('/api/movies/:id', function (req, res) {
//     console.log('requested a movie')
//     //searching for the movie with specific id => movieObj
//     const foundMovieObj = data.find(movie => movie.id === req.params.id)
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     res.send(foundMovieObj)
// })

// server.post('/api/movies', (req, res) => {
//     data.push(req.body)
//     res.json(data)
// })

// // GET 1 OR MULTIPLE MOVIES

//server.get('/api/movies',async (req, res) => res.json(await knex.from('movies')))
const query = async (id) => await knex.from('movies').where({ id })
const handler = async ({ params: { id } }, res) => res.json(await query())
server.get('/api/movies/:id', handler)

// server.get('/api/movies/:ids', async function (req, res) {
//     console.log('requested one movie')
//     //res.setHeader('Access-Control-Allow-Origin', '*');
//     const id = req.params.ids
//     if (id.indexOf(',') === -1) {
//         // client.connect(err => {
//         //     if (err) {
//         //         console.log(err)
//         //     } else {
//         //         console.log('connected')

//         //     }
//         // })
//         // client.query(`SELECT * FROM movies WHERE id = $1`, [id], (err, result) => {
//         //     if (err) {
//         //         console.log(err)
//         //     } else {
//         //         console.log(result)
//         //         client.end()
//         //         res.json(result.rows)
//         //     }

//         // })
//         const movie = await knex.from('movies').where({ id })
//         res.send(movie)
//     } else {
//         const ids = req.params.ids.split(',')
//         res.send(data.filter(movie => ids.includes(movie.id)))
//     }
// })

// server.post('/api/movies/title', (req, res) => {
//     data.push(req.body)
//     res.json(data)
// })

// // /* POST DATA TO A RESTFULL ENDPOINT */
server.post('/api/movies', function (req, res) {
    // data.push({
    //     title: req.body.title,
    //     id: uuid()
    // })


    client.connect(err => {
        if (err) {
            console.log(err)
        } else {
            console.log('connected')

        }
    })
    client.query(`INSERT INTO movies (title, year) VALUES ($1, $2)`, [req.body.title, req.body.year], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            client.end()
            res.json({ "insert": "ok" })
        }
    })
    //res.setHeader('Access-Control-Allow-Origin', '*');
    // res.send(data)
})

server.put('/api/movies/:id', function (req, res) {
    //searching for the movie with specific id => movieObj
    const foundMovieObj = data.find(movie => movie.id === req.params.id)
    //where is this movieObj situated in the data array
    const positionInArray = data.indexOf(foundMovieObj)
    //at that specific spot i need to update the movieObject 
    data[positionInArray].title = req.body.title
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data)
})

// server.delete('/api/movies/:id', function (req, res) {
//     //searching for the movie with specific id => movieObj
//     const foundMovieObj = data.find(movie => movie.id === req.params.id)
//     //where is this movieObj situated in the data array
//     const positionInArray = data.indexOf(foundMovieObj)
//     data.splice(positionInArray, 1)
//     res.send(data)
// })