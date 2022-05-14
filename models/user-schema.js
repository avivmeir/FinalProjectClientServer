const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    }
    },
    {
        collection: 'users'
    })
const User = mongoose.model('User', userSchema)
module.exports = User