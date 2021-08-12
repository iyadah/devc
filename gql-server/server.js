const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        message: String
    }
`);

const root = {
    message: () => 'Hello there' 
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL is running on 4000'));
