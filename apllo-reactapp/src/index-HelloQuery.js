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
    const HelloQuery = gql`
        query HelloQuery {
            hello
        }
`

    const { loading, error, data } = useQuery(HelloQuery)

    if (loading) {
        return <p>Loading....</p>
    }
    if (error) {
        return <p>Error</p>
    }
    return <div>
        <h1>{data.hello}</h1>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>);

