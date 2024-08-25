const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/events', async (req, res) => {
    const {type, data} = req.body

    if(type === 'commentCreated') {
        console.log(data);
        let {id, postId, content, status} = data
        if(content.includes('orange')) {
            console.log(true);
            status = 'rejected'
            await axios.post('http://event-bus-srv:4005/events', {
                type : 'removeComment',
                data
            })
        } else {
            status = 'approved'
            await axios.post('http://event-bus-srv:4005/events', {
                type : 'removeComment',
                data
            })
        }
    }
    else {
        console.log(false);
    }
})

app.listen(4003, () => {
    console.log('moderation service on port : 4003')
})