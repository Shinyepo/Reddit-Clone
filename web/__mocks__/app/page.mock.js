const PostResponse = {
  id: 1,
  authorId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "Post Title",
  content: "Post Content",
  likes: 1,
  dislikes: 2,
  author: {
    id: 3,
    createdAt: new Date(),
    email: "1@1.1",
    password: "1212",
    name: "username",
  },
};

module.exports = { PostResponse };
