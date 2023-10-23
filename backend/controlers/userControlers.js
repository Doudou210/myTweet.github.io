const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const Tweet = require("../models/tweet");
const User = require("../models/users");

const getTweet = async (req, res) => {
    Tweet.find()
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

// Login
const getUser = async(req, res) => {
    try {
        const {username, password} = req.body;
        const user= await User.findOne({username});
        if (!user) {
            return res.status(401).json({ error: "Username not found" });
        };

        const passVerif = await bcrypt.compare(password, username.password);
        if (passVerif) {
            res.status(200).json({messages:"Connexion réussie!"})
        } else {
            res.status(405).json({error:"Username or password is invalide"});
        }
        
    } catch (error) {
        res.status(405).json({error:"Internal server error"});
    }
}

//Log up
const createUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const existUser = await User.findOne({username});
        // const existEmail = await User.findOne({email});
        if (existUser) {
            return res.status(400).json({error: "Nom d'utilisateur déjà pris!!!"})
        };
        // if (existEmail) {
        //     return res.status(400).json({error: "Email déjà pris!!!"})
        // };

        const HashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password:HashedPassword
        })
       newUser.save()
       .then(res => {
        // res.redirect("/home");
        })
        .catch(err => res.json(err));
    } catch (error) {
        console.error("Inscription échoué!!!");
    }
}

//Poster
const postTweet= async(req, res) => {
    try {
        const {title, messages } = req.body;
        
        const messagesTweet = new Tweet({
        title,
        messages,
        });

        const savedMessage = await messagesTweet.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
};

module.exports = {
    createUser,
    getUser,
    getTweet,
    postTweet,
};