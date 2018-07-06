// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our Photographer model
var userSchema = mongoose.Schema({

        username     : String,
        password     : String

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.pre('save', function (next){
    if (!this.password) {
        console.log('models/user.js =====NO PASSWORD PROVIDED=========')
        next();
    }
    else {
        console.log('models/user.js hashPassword in pre-save');

        this.password = this.hashPassword(this.password)
        next();
    }
})

// create the model for photographers and expose it to our app

module.exports = mongoose.model('User', userSchema);



// const UserSchema = new Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   calendars: {type: Array, default: null},
//   created: {type: Date, default: Date.now}
// });

