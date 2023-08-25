import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

//ApolloClient objec 
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
})

//simple client 
client.query({
    query: gql`
    query HelloQuery {
        hello
      }    
    `
}).then(res => console.log(res.data.hello))


const App = props => {
    return <div>
        <h1>Graphql -Apollo Integration</h1>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

