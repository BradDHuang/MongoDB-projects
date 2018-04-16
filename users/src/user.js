const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema; // prop.

const UserSchema = new Schema({
  // name: String,
  name: {
    type: String,
    validate: {
      validator: (name) => name.length >= 3,
      message: 'Name must be no less than 3 characters.'
    },
    required: [true, 'Name required!'] // validation!
  },
  // postCount: Number,
  likes: Number,

  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// define a virtual field.
// .postCount will run the func. below
// we use function(), not () =>,
// to get use of 'this' in an instance scope
UserSchema.virtual('postCount').get(function() {
  // return this;
  return this.posts.length;
});

// middleware.
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // this: an instance of User.
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
    // go to the next middleware.
});

const User = mongoose.model('user', UserSchema); // 'User' is a collection of users.

module.exports = User;
