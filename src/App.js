import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import routes from '../src/routes';


function App() {
  return (
    <div>
      <Header />
      {routes}
    </div>
  );
}

export default App;
