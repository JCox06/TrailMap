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

UserSchema.post("save", function (user) {
  bcrpyt.hash(user.password, 14, function (err, hash) {
    user.password = hash;
    user.save();
  });
});

UserSchema.methods.authenticate = async function(unhashed) {
  const result = await bcrpyt.compare(unhashed, this.password);
  return result;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;