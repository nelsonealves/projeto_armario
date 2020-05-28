import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import Sidebar from './Pages/Sidebar';

ReactDOM.render(
  <div>
    <Sidebar/>
    <Router> 
      <Routes/>
    </Router>
  </div>,
  document.getElementById('root')
);


// import Login from './Pages/Login'

// // import Routes from './Routes';
// // import Sidebar from './Pages/Sidebar';

// ReactDOM.render(
//   <div>
//     <Login/>
//   </div>,
//   document.getElementById('root')
// );