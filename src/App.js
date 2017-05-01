import React from 'react';
import Nav from './components/Nav';



const App = ({ children })=> (
  <div className='container'>
    <h1>React Router Template</h1>
    <Nav />
    { children }
  </div> 
);


export default App;
