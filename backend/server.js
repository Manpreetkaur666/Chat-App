const express = require('express');
const chats = require('./data/data');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    const singlechat = chats.find((c) => c._id === req.params.id);
    res.send(singlechat);
})

app.listen(PORT,
    console.log(`Server Started on PORT ${PORT}`));