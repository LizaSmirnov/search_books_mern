const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async () => {
      return User.find();

    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
  },

  saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
    if (context.user) {
      const updateUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
        { new: true, runValidators: true }
      );
      return updateUser;
    }
    throw new AuthenticationError("You need to be logged in!");
  },

  removeBook: async (parent, { bookId }, context) => {
    if (context.user) {
      const updateUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updateUser;
    }
    throw new AuthenticationError("You need to be logged in!");
  },
},


};

module.exports = resolvers;
