import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './components/Routes';
import TopBar from './components/topbar';

import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './components/context/currentUser'
 

const App = () => {
  return (
    <div>
      <Router>
        <TopBar/>
        <Routes/>
      </Router>
    </div>
  )
}

ReactDOM.render(<><App /></>,document.getElementById('root'));

