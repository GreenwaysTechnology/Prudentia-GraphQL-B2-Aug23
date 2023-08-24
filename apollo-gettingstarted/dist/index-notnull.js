import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//Define schema
const typeDefs = `

type User {
    id:ID!
    firstName:String!
    lastName:String
    age:Int
    points:Float
    status:Boolean
}

type Query{
   user:User!    
}

`;
const resolvers = {
    //Query 
    Query: {
        user() {
            // return null;
            return {
                id: 1,
                firstName: "Subramanian",
                lastName: "Murugan",
                age: 10,
                points: 100,
            };
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
