const { gql } = require("apollo-server");

module.exports = gql`
  type Message {
    text: String
    createdBy: String
  }

  input MessageInput {
    text: String
    username: String
  }

  type Query {
    message: [Message]
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
  }

  type Subscription {
    messageCreated: Message
  }
`;
