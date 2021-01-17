// Imports ****************************************************************************************************

import React from 'react';

// Navigation --------
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';

// Redux -------
import darkMode from './reducers/lightMode';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({darkMode}));

// FUNCTION ************************************************************************************************

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/movie-*" component={MovieScreen} />
          </Switch>
        </Router>
      </Provider>
  );
};

// Export *****************************************************************************************************

export default App;
