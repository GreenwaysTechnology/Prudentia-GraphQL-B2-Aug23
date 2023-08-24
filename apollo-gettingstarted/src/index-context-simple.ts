import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//Define schema
const typeDefs = `

type Query{
  hello(name:String!):String
}

`
const resolvers = {
    //Query 
    Query: {
        hello(parent, args, ctx, info) {
            console.log(args)
            return `${ctx.greeting} to ${args.name}`
        }
    }

}

//context Type
type MyContext = {
    greeting: string
    name: string
}

const server = new ApolloServer<MyContext>({
    typeDefs: typeDefs,
    resolvers: resolvers
})
//Start the Webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    context: async () => {
        return {
            greeting: 'Welcome',
            name: 'Subramanian'
        }
    }
})
console.log(`Apollo Server is Started at ${url}`)



