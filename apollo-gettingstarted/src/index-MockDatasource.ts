import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//Define schema
const typeDefs = `

type Book {
    title:String
    author:String
}
type Query{
   books:[Book]
}

`
const BOOKS = [{
    title: 'Graphql in Action',
    author: 'a'
},
{
    title: 'Typescript in Action',
    author: 'b'
}
]

//Data Source Class
export class BookDataSource {
    //api
    getBooks() {
        return BOOKS
    }
}


const resolvers = {
    //Query 
    Query: {
        books(parent, args, ctx) {
            return ctx.dataSources.booksAPI.getBooks()
        }
    }

}

//context Type
type MyContext = {
    dataSources: {
        booksAPI: BookDataSource
    }
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
            dataSources: {
                booksAPI: new BookDataSource()
            }
        }
    }
})
console.log(`Apollo Server is Started at ${url}`)



