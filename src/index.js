import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import { 
  Switch, 
  BrowserRouter as Router,

} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes/>
      </Router>
    </div>
  )
}

ReactDOM.render(<><App /></>,document.getElementById('root'));

