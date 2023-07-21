// models
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const Note = require("../models/Note");
const User = require("../models/User");
// mock
const categoriesMock = require("../mock/categories.json");
const commentsMock = require("../mock/comments.json");
const notesMock = require("../mock/notes.json");
const usersMock = require("../mock/users.json");

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock);
  }

  const comments = await Comment.find();
  if (comments.length !== commentsMock.length) {
    await createInitialEntity(Comment, commentsMock);
  }

  const notes = await Note.find();
  if (notes.length !== notesMock.length) {
    await createInitialEntity(Note, notesMock);
  }

  const users = await User.find();
  if (users.length !== usersMock.length) {
    await createInitialEntity(User, usersMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
