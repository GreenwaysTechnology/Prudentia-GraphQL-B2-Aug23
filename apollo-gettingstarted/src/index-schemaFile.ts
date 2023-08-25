import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from "fs"

const typeDefs = readFileSync("./schema.graphql", { encoding: 'utf-8' })

//Biz logic for api (hello)
const resolvers = {
    //Query 
    Query: {
        books() {
            return [{
                title: 'Graphql in Action',
                author: 'Subramanian'
            }]
        }
    }

}
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})
//Start the Webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Started at ${url}`)



