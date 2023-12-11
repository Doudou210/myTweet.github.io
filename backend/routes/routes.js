const express = require("express");
const { getTweet, postTweet, createUser, loginUser, updatePassword, ForgotPassword, OutLogin } = require("../controlers/userControlers");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("/");
})

router.get("/tweet", getTweet);
router.post("/poster", postTweet);
router.post("/login", loginUser);
router.post('/create', createUser);
// router.get("/user", getUsername);
// router.get("/user", verifyToken, getUsername);
router.post("/updatepass", updatePassword);
router.post("/forgotpassword", ForgotPassword);
router.post("/out", OutLogin);

module.exports = router;