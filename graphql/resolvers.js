const Message = require("../models/Message");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
const message = [];

module.exports = {
  Mutation: {
    async createMessage(_, { messageInput: { text, username } }) {
      //   const newMessage = new Message({
      //     text: text,
      //     createdBy: username,
      //   });
      //   const res = await newMessage.save();
      message.push({ id: message.length, text: text, createdBy: username });

      pubsub.publish("MESSAGE_CREATED", {
        messageCreated: {
          text: text,
          createdBy: username,
        },
      });

      return { text: text, createdBy: username };
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator("MESSAGE_CREATED"),
    },
  },
  Query: {
    message: () => message,
  },
};
