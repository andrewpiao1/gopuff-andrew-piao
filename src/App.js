import React from 'react';
import './App.css';
import Cart from './components/Cart'

function App() {
  return (
    <div className="App">
      <div className="header">GoPuff Product Aassignment</div>
      <div className="container">
        <div className='left-block'>Description</div>
        <div className="right-block">Cart</div>
        <Cart />
      </div>
    </div>
  );
}

export default App;
