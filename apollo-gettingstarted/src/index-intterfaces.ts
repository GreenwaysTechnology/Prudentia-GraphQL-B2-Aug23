import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


const typeDefs = `
interface Book {
    title:String!
    author:Author!
}
type Course {
    name:String
}
type Author {
    name:String
}
type TextBook implements Book {
    title:String!
    author:Author!
    courses:[Course!]!
}
type ColoringBook implements Book {
    title:String!
    author:Author!
    colors:[String!]!
}

type Query {
    books:[Book!]!
}

 `
const BOOKS = [{
    title: 'Graphql',
    courses: [{
        name: 'IT'
    }]
}]
// const BOOKS = [{
//     title: 'Drawing',
//     colors: ['Red']
// }]


//Biz logic for api (hello)
const resolvers = {
    //Query 
    Query: {
        books() {
            return BOOKS
        }
    },
    //interface type
    Book: {
        //implementation
        __resolveType(book, context, info) {
            if (book.courses) {
                return 'TextBook' //must have implementation  type in string
            }
            if (book.colors) {
                return 'ColoringBook'
            }
            return null
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



