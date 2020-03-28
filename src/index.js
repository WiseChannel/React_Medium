import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './components/Routes';
import TopBar from './components/topBar/topbar';

import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './components/context/currentUser'
import CurrentUserCheker from './components/context/currentUserCheker';


const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserCheker>
        <Router>
            <TopBar/>
            <Routes/>
          </Router>
      </CurrentUserCheker>
    </CurrentUserProvider>
  )
}

ReactDOM.render(<><App /></>,document.getElementById('root'));

