import React from 'react';
import './App.css';
import Cart from './components/Cart'

function App() {
  return (
    <div className="App">
      <div className="header">GoPuff Product Aassignment</div>
      <div className="container">
        <Cart className='left-block'/>
        <div className='right-block'>Subtotal</div>
      </div>
    </div>
  );
}

export default App;
