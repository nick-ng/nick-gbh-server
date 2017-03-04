const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

export default {
  newGame: new GraphQLObjectType({
    name: 'NewGame',
    fields: () => ({
      errors: { type: new GraphQLList(GraphQLString) },
      gameId: { type: GraphQLString },
      coachId: { type: GraphQLString },
    }),
  }),
};
