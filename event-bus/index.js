const express = require('express')

const axios = require('axios')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {

    const event = req.body

    axios.post('http://127.0.0.1:4000/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://127.0.0.1:4001/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://127.0.0.1:4002/events', event).catch((err) => {
        console.log(err.message);
    })

})

app.listen(4005, () => {
    console.log('events server on port : 4005');
})

