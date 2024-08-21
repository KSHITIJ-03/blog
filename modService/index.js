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
        const {id, postId, content} = data
        if(content.includes('orange')) {
            console.log(true);
            
            await axios.post('http://127.0.0.1:4005/events', {
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