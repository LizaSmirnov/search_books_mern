import React from 'react';
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context';

//creating httpLink using graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

//authLink used to set the request headers of every request to the server
//setContext() will take in the request object and return the headers to the context so httpLink can read them
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      // If token is there, add it to the headers
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  // Link to the server
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    // ApolloProvider is a special type of React component that we'll use to provide data to all of the other components
    // The whole app will be wrapped in ApolloProvider component so that every component has access to the server's API data
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            {/* If user tries to go to any other page, redirect to homepage */}
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>

  );
}

export default App;
