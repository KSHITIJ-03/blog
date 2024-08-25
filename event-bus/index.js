const express = require('express')

const axios = require('axios')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {

    const event = req.body

    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message);
    })
    console.log('in event bus');
    
    axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://service1-srv:4002/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://modservice-srv:4003/events', event).catch((err) => {
        console.log(err.message);
    })
    res.send({ status: 'OK' })  // sending back response to the client
                                // otherwise it will lead to the client (the posts service) 
                                // waiting indefinitely for a response. 

})

app.listen(4005, () => {
    console.log('update');
    console.log('events server on port : 4005');
})

