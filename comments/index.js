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
    console.log(commentsByPostId);

    await axios.post('http://event-bus-srv-new:4005/events', {
        type : 'commentCreated',
        data : {
            id, postId, content
        }
    })
    
    res.status(201).json(comments)
})


app.post('/events', (req, res) => {
    console.log('event recieved : ' + req.body.type);
    const {type, data} = req.body
    if(type === 'removeComment'){
        const {id, postId, content} = data
        console.log(data);
        commentsByPostId[postId] = commentsByPostId[postId].filter(item => item.id !== id)
        console.log(commentsByPostId[postId]);
    }
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