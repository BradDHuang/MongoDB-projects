const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associating records', () => {
	let brad, blogPost, comment;

  beforeEach(done => {
    brad = new User({ name: 'Brad' });
    blogPost = new BlogPost({ title: 'js title', content: 'js content' });
    comment = new Comment({ content: 'comment content' });

// Association
    brad.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = brad;

    Promise.all([brad.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

// it.only() : only run this test.
  it('saves the relation', (done) => {
    User.findOne({ name: 'Brad' })
      .populate('blogPosts') // modifier.
      .then((user) => {
        // console.log(user.blogPosts[0]);
        assert(user.blogPosts[0].title === 'js title');
        done();
      });
  });

  it('saves all the relations', (done) => {
    User.findOne({ name: 'Brad' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
// specify which model to use!
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      }) // modifier nested in another one!
      .then((user) => {
        // console.log(user.blogPosts[0].comments[0]);
        assert(user.name === 'Brad');
        assert(user.blogPosts[0].content === 'js content');
        assert(user.blogPosts[0].comments[0].content === 'comment content');

        assert(user.blogPosts[0].comments[0].user.name === 'Brad');
        done();
      });
  });

});
