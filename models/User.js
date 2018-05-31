const mongoose = require('mongoose');
// const Schema = mongoose.Schema; as es6 destructuring //
// Schema allows us to create a structured MongoDB document //
const { Schema } = mongoose;

const userSchema = new Schema({
  // describe different properties //
  googleId: String,
  credits: { type: Number, default: 0 }
});

// create mongoose Model class if doesn't already exist //
mongoose.model('users', userSchema);
