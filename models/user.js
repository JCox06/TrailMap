const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const passportlocalmongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  gender: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: false
  }
});


UserSchema.plugin(passportlocalmongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User; 