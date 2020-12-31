const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator"); // a plugin that acts as a hook that checks the data before it's saved into the db
const Schema = mongoose.Schema;
/*
const PointSchema = new Schema({
    coordinates: { type: [Number], index: '2dsphere' },
    type: { type: String, default: 'Point' }
});
*/

const UserSchema = new Schema(
  {
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
      required: true,
      unique: true, // unique does not act as a validator when aving data into db, unlike required
    },
    email: {
      type: String,
      required: true,
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
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
// UserSchema.plugin(uniqueValidator); // now an error will be threw if we try to save a user with an email that already exists

module.exports = User;
