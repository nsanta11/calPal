const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const AuthSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

//UserSchema.plugin(passportLocalMongoose); 

AuthSchema.plugin(passportLocalMongoose);  

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;