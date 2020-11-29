const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
const PointSchema = new Schema({
    coordinates: { type: [Number], index: '2dsphere' },
    type: { type: String, default: 'Point' }
});
*/

const UserSchema = new Schema({
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  username: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    //  required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true
  },
  // location: PointSchema,
  roles: {
    type: Array,
    //  required: true
  },
  avatar: {
    type: String,
    // required: false
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
