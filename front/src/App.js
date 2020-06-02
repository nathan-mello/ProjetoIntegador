import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from './router';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          {Routes.map(r => (
            <Route {...r} key={r.path} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
