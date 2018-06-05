const mongoose = require('mongoose');
const { Schema } = mongoose;

// import Recipient sub-document collection //
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // comma-separated list of email addresses //
  // use sub-document collection //
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // set up relationship with User collection //
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
