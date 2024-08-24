const express = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.post('/posts', async (req, res) => {
    console.log('create a post');
    const id = randomBytes(4).toString('hex')
    const {title} = req.body
    posts[id] = {
        id, title
    }

    await axios.post('http://localhost:4005/events', {
        type : 'postCreated',
        data : {
            id, title
        }
    })

    console.log(posts[id]);
       
    res.status(201).json(posts[id])
})

app.get('/posts', async (req, res) => {
    console.log('retrive all the posts');
    console.log(posts);
    res.send(posts)
})

app.post('/events', (req, res) => {
    console.log('event recieved : ' + req.body.type);
    res.send({})
})

const PORT = 4000
app.listen(PORT, () => {
    console.log('v55')
    console.log("posts server on PORT : " + PORT);
})