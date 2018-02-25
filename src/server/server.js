var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var RandomDice = require('./model/RandomDice.js');

var schema = buildSchema(`
  type RandomDice {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
    biggerDice: RandomDice
  }

  type Query {
    hello: String
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSices: Int): [Int]
    getDice(numSices: Int): RandomDice
  }
`);

var root = { 
  hello: () => 'hello world!',
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: (args) => {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSices || 6)));
    }
    return output;
  },

  getDice: ({numSides}) => {
    return new RandomDice(numSides || 6);
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
