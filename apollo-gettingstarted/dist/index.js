import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { prisma } from "./database.js";
//Define schema
const typeDefs = `

type User {
   id:Int
   email:String
   name:String
   createdAt:String
}
type Query {
    users:[User]
}
input UserInput {
    email:String
    name:String
    
}
type Mutation {
    createUser(user:UserInput):User
}
`;
const resolvers = {
    //Query 
    Query: {
        async users(parent, args, context, info) {
            return context.dataSources.db.user.findMany({});
        }
    },
    Mutation: {
        async createUser(parent, args, contxt, info) {
            const { user } = args;
            return await contxt.dataSources.db.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    createdAt: new Date()
                }
            });
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
    },
    context: async () => {
        return {
            dataSources: {
                db: prisma
            }
        };
    }
});
console.log(`Apollo Server is Started at ${url}`);
