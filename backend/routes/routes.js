const express = require("express");
const { getTweet, postTweet, createUser, getUser } = require("../controlers/userControlers");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("/");
})

router.get("/tweet", getTweet);
router.post("/poster", postTweet);
router.post("/login", getUser);
router.get('/create', createUser);

module.exports = router;