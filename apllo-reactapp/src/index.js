import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

//ApolloClient objec 
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
})

const App = props => {
    const BooksQuery = gql`
        query Books {
            books {
             title
            author
        }
}
`

    const { loading, error, data } = useQuery(BooksQuery)

    if (loading) {
        return <p>Loading....</p>
    }
    if (error) {
        return <p>Error</p>
    }
    return <div>
        <ul>
            {data.books.map(book => {
                return <li>{book.title} {book.author}</li>
            })}
        </ul>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>);

