const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const router = require('./routes/routes');


const port = 3001;
const app = express ();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/tweets')
.then(() => console.log(' DB connected!'))
.catch(err => console.error(err));

app.listen(port, () => {
    console.log("Serveur is runing on port:", port)
});

app.use(router);