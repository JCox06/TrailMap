const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


UserSchema.methods.runhash = async function () {
  const hashed = await bcrpyt.hash(this.password, 12);
  this.password = hashed;
  await this.save();
};

UserSchema.methods.authenticate = async function (unhashed) {
  const result = await bcrpyt.compare(unhashed, this.password);
  return result;
};

const User = mongoose.model("User", UserSchema);
module.exports = User; 