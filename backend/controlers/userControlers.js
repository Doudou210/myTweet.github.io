const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tweet = require("../models/tweet");
const User = require("../models/users");

const getTweet = async (req, res) => {
    Tweet.find()
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

// const getUsername = async (req, res) => {
//     if (req.user) { // Assurez-vous que l'utilisateur est authentifié
//         const { username } = req.user; // Obtenez le nom d'utilisateur à partir des données de l'utilisateur authentifié
//         res.json({ username });
//     } else {
//         res.status(401).json({ error: "Utilisateur non authentifié" });
//     }
// };
const ForgotPassword = async (req, res) => {
    try {
        const {email} = req.body
        User.findOne({email})
        .then(user =>{
            const token = jwt.sign({id:user._id}, "jwt_secret_key", {expiresIn:"1h"});
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pro.test.projet@gmail.com',
                pass: 'idlwtsecfnbdoism'
            }
            });

            var mailOptions = {
            from: 'pro.test.projet@gmail.com',
            to: `${email}`,
            subject: 'Reset your Password',
            text: `Your link for reset your password is: http://localhost:3000/update/${user._id}/${token}\r\n`};

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                // return res.send({status:"success"})
                console.log('Email sent: ' + info.response);
            }
            });
        })
    } catch (error) {
        console.error(error,"Impossible to reset");
    }
}
const updatePassword = async (req, res) => {
    const { username, newPassword } = req.body;
    
    try {
        // Recherchez l'utilisateur dans la base de données par son nom d'utilisateur
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        
        // Vérifiez si l'ancien mot de passe correspond à celui stocké dans la base de données
        // const isMatch = await bcrypt.compare(oldPassword, user.password);
        // if (!isMatch) {
        //     return res.status(401).json({ error: "Ancien mot de passe incorrect" });
        // }
        
        // Hachez et stockez le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du mot de passe" });
    }
};
// Login
const loginUser = async(req, res) => {
    try {
        const {id, username, password} = req.body;
        const user= await User.findOne({username});
        if (!user) {
            return res.status(401).json({ error: "Username not found" });
        };
        
        const passVerif = await bcrypt.compare(password, user.password);
        if (passVerif) {
            res.status(200).json({messages:"Connexion réussie!"})
        } else {
            res.status(405).json({error:"Username or password is invalide"});
        }

        //Creation de cookie
        let t = req.body._id;
        console.log(t);
        if (username === "user" && password === "password") {
            // Créez un cookie contenant le nom d'utilisateur
            res.cookie("_id", id, { maxAge: 60000, httpOnly: true })
            res.cookie("username", username, { maxAge: 60000, httpOnly: true });
            res.status(200).json({ message: "Connexion réussie" });
            console.log(user);
          } else {
            res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
          }
    } catch (error) {
        res.status(405).json({error:"Internal server error"});
    }
}
//LogOut
const OutLogin = async (req, res) =>{
    res.clearCookie("username");
    res.status(200).json({ message: "Déconnexion réussie" });
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
       const savedUser = await newUser.save();
       res.status(201).json(savedUser);
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
    loginUser,
    getTweet,
    postTweet,
    // getUsername,
    ForgotPassword,
    updatePassword,
    OutLogin,
};