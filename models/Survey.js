const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema], // Sub document collection - array of schemas
  yes: { type: Number, default: 0},
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'user' }, // Relationship to User collection
  dateSent: Date,
  lastResponed: Date
});

mongoose.model('surveys', surveySchema);
