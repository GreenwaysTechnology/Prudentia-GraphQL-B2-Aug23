import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//mock data
const USERS = [{
        id: 1,
        name: 'A',
        email: 'a@gmail.com'
    },
    {
        id: 2,
        name: 'B',
        email: 'b@gmail.com'
    },
    {
        id: 3,
        name: 'C',
        email: 'c@gmail.com'
    }
];
//Address
const ADDRESS = [{
        city: 'CBE',
        state: 'TN',
        id: 1 //link field
    },
    {
        city: 'BNG',
        state: 'KA',
        id: 2 //link field
    },
    {
        city: 'NY',
        state: 'NY',
        id: 3 //link field
    },
];
//Define schema
const typeDefs = `
 type Address {
    city:String    
 }
 type User {
    id:ID!
    name:String
    email:String 
    address:Address # api
 }
 type Query {
    users:[User!]!
 }
`;
const resolvers = {
    //Query 
    Query: {
        users() {
            return USERS;
        }
    },
    User: {
        address(parent) {
            console.log(parent);
            return ADDRESS.find(address => {
                return address.id === parent.id;
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
    }
});
console.log(`Apollo Server is Started at ${url}`);
