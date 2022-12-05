const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  audio: {
    type: String,
    required: true,
  },
  cover_cloudinary_id: {
    type: String,
  },
  audio_cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Track", trackSchema);
