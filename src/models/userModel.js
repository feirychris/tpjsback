const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    email: {
        type: String,
        required: "L'email est requis",
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
    }
});

userSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        console.log(hashedPassword)
        this.password = hashedPassword
    } catch (error){
        next(error)
    }
})

module.exports = mongoose.model('User', userSchema);