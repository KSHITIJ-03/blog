const express = require('express')

const axios = require('axios')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {

    const event = req.body

    axios.post('http://posts-clusterip-srv-new:4000/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://comments-srv-new:4001/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://service1-srv-new:4002/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://modservice-srv-new:4003/events', event).catch((err) => {
        console.log(err.message);
    })

    res.send({ status: 'OK' }) 

})

app.listen(4005, () => {
    console.log('events server on port : 4005');
})

