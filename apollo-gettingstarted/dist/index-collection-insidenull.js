import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//Define schema
const typeDefs = `

type Query{
   skills:[String!]    
}

`;
const resolvers = {
    //Query 
    Query: {
        skills() {
            //return []
            //return ['graphql']
            //return null
            return [null];
        }
    }
};
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
//Start the Webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});
console.log(`Apollo Server is Started at ${url}`);
