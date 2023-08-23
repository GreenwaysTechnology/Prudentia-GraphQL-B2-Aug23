import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//Define schema
const typeDefs = `
type Query{
    """
      This is hello api which returns Hello Graphql!
    """
    hello:String
}

`
//Biz logic for api (hello)
const resolvers = {
    //Query 
    Query: {
     
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



