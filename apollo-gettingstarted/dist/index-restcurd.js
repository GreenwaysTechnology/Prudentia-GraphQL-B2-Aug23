import { RESTDataSource } from "@apollo/datasource-rest";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//Type class
export class Book {
}
export class BooksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://localhost:3000/";
    }
    //apis
    async getBooks() {
        return this.get(`books`);
    }
    //books by id
    async book(id) {
        return this.get(`books/${id}`);
    }
    //save
    async postBook(book) {
        return this.post(`books`, { body: book }).then(res => res);
    }
    //update 
    async updateBook(bookId, book) {
        return this.put(`books/${bookId}`, { body: book }).then(res => res);
    }
}
//Define schema
const typeDefs = `

type Book {
    id:Int
    title:String
    author:String
}
type Query{
   books:[Book]
   book(id:Int):Book
}
input BookInput{
    id:Int
    title:String!
    author:String!
}
input BookUpdateInput {
    title:String!
    author:String!
}
type Mutation {
    addBook(input:BookInput):Book
    updateBook(id:Int!,input:BookUpdateInput):Book
}
`;
//
const resolvers = {
    //Query 
    Query: {
        //Books
        async books(parent, args, ctx) {
            return ctx.dataSources.booksAPI.getBooks();
        },
        //Book by id
        async book(parent, args, ctx) {
            const id = +args.id;
            return ctx.dataSources.booksAPI.book(id);
        }
    },
    Mutation: {
        //create Book
        async addBook(parent, args, ctx) {
            const { input } = args;
            return ctx.dataSources.booksAPI.postBook(input);
        },
        //update Book
        async updateBook(parent, args, ctx) {
            const { id, input } = args;
            return ctx.dataSources.booksAPI.updateBook(+id, input);
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
                booksAPI: new BooksAPI()
            }
        };
    }
});
console.log(`Apollo Server is Started at ${url}`);
