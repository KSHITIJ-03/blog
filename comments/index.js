const express = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
app.use(cors())
app.use(bodyParser.json())

const commentsByPostId = {}

app.post('/posts/:id/comments', async (req, res) => {
    console.log('create a comment');
    const id = randomBytes(4).toString('hex')
    const postId = req.params.id
    const {content} = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({id, content})
    commentsByPostId[req.params.id] = comments

    await axios.post('http://127.0.0.1:4005/events', {
        type : 'commentCreated',
        data : {
            id, postId, content
        }
    })
    console.log(commentsByPostId);
    
    res.status(201).json(comments)
})


app.post('/events', (req, res) => {
    console.log('event recieved : ' + req.body.type);
    res.send({})
})

app.get('/posts/:id/comments', async (req, res) => {
    console.log('retrive all the comments');
    res.send(commentsByPostId[req.params.id] || [])
})

const PORT = 4001
app.listen(PORT, () => {
    console.log("comments server on PORT : " + PORT);
})