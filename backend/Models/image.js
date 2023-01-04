const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  url: String
}, {timestamps: true});

const Image = mongoose.model("Image", imageSchema)

module.exports = {Image}