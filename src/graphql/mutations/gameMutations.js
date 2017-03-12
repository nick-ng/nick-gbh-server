const { GraphQLString } = require('graphql');

const { doRegistration } = require('../../services/gameService');
const { newGame } = require('../types/gameTypes');

module.exports = {
  hostGame: {
    description: '',
    type: newGame,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      role: { type: GraphQLString },
      address: { type: GraphQLString },
      country: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    resolve: (_, args) => doRegistration(args)
      .then(result => ({ message: result }))
      .catch(err => ({ errors: [JSON.parse(err.message).description] })),
  },
};
