import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//Define schema
const typeDefs = `

type Query{
  hello(name:String!):String
}

`;
const resolvers = {
    //Query 
    Query: {
        hello(parent, args, contextValue, info) {
            console.log(args);
            return `Welcome to ${args.name}`;
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
