const mongoose = require('mongoose');
const Schema = mongoose.Schema; // prop.

const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;
