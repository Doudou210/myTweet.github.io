const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require('./routes/routes');


const port = 5000;
const app = express ();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


mongoose.connect('mongodb://localhost:27017/tweets')
.then(() => console.log(' DB connected!'))
.catch(err => console.error(err));

app.listen(port, () => {
    console.log("Serveur is runing on port:", port)
});

app.use(router);