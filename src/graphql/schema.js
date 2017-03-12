const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const gameMutations = require('./mutations/gameMutations');

module.exports = new GraphQLSchema({
  // list all GraphQL queries here
  // query: new GraphQLObjectType({
  //   name: 'Query',
  //   fields: () => Object.assign({},
  //     someQueries
  //   ),
  // }),

  // list all GraphQL mutations here
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => Object.assign({}, gameMutations),
  }),
});
