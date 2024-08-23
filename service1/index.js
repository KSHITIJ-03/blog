const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    console.log('retrive all the posts');
    console.log(posts);
    res.send(posts)
})

app.post('/events', (req, res) =>{
    //console.log(req.body); 
    const {type, data} = req.body

    if(type === 'postCreated') {

        const {id, title} = data

        posts[id] = {id, title, comments : []}
    }
    if(type === 'commentCreated') {
        const {id, content, postId, status} = data

        const post = posts[postId]
        console.log(post);
        
        post.comments.push({id, content})
    }
    // if(type === 'removeComment'){
    //     const {id, postId, content} = data
    //     const post = posts[postId]

    //     post.comments = post.comments.filter(item => item.id !== id)
    // }

    console.log(posts);
    
})


app.listen(4002, () =>{
    console.log('service1 server on port : 4002');
})

