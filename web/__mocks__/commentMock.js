const date = new Date();
const updatedDate = new Date();
const comment = {
  id: 1,
  authorId: 1,
  postId: 1,
  parentId: 0,
  content: "some comment",
  likes: 20,
  dislikes: 30,
  createdAt: date,
  updatedAt: date,
};

const updatedComment = {
  id: 2,
  authorId: 2,
  postId: 2,
  parentId: 0,
  content: "some comment",
  likes: 10,
  dislikes: 20,
  createdAt: date,
  updatedAt: new Date(updatedDate.setDate(updatedDate.getDate() + 5)),
};

const author = {
  id: 1,
  createdAt: new Date(),
  email: "1@1.1",
  password: "1212",
  name: "Author Name",
};

module.exports = { comment, author, updatedComment };
