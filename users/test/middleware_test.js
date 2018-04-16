const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
// const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
	let brad, blogPost;

  beforeEach(done => {
    brad = new User({ name: 'Brad' });
    blogPost = new BlogPost({ title: 'js title', content: 'js content' });
    // comment = new Comment({ content: 'comment content' });

// Association
    brad.blogPosts.push(blogPost);
    // blogPost.comments.push(comment);
    // comment.user = brad;

    Promise.all([brad.save(), blogPost.save()]) // , comment.save()
      .then(() => done());
  });

  it('remove his/her blogPosts when deleting a user', (done) => {
    brad.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

});
