const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/passport-fb", { useNewUrlParser: true,useUnifiedTopology: true });
var bycrypt = require('bcrypt-nodejs');

var schema = new mongoose.Schema({
  email: String,
  name: String,
  googleId: String,
  password: String
});

schema.methods.encryptPassword = function(password) {
  return bycrypt.hashSync(password, bycrypt.genSaltSync(10), null);
}
schema.methods.validPassword = function(password) {
  return bycrypt.compareSync(password, this.password);
}

const user = mongoose.model('user', schema);
module.exports = user;
