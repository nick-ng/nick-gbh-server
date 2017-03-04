const { GraphQLString } = require('graphql');

export default {
  hostGame: {
    description: '',
    type: ,
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
    resolve: (_, args, { dbClient }) => {
      return doRegistration(args, dbClient).then((result) => {
        return { message: result };
      }).catch((err) => {
        return { errors: [JSON.parse(err.message).description] };
      });
    },
  },
};
