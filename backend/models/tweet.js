const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: String,
    messages: String,
},{
    timestamps: true
});
const Tweet = mongoose.model('Tweet', userSchema);
module.exports = Tweet;
