import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//Define schema
const typeDefs = `
type Query{
    hello:String
    active:Boolean
    value:Int
}

`;
//Biz logic for api (hello)
const resolvers = {
    //Query 
    Query: {
        hello() {
            return "Hello";
        },
        active() {
            return true;
        },
        value() {
            return 100;
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
