import React from 'react';
import './App.css';
import Cart from './components/Cart'

function App() {
  return (
    <div className="App">
      <div className="title">
      <i class="material-icons md-48">shopping_cart</i>
      <div>{'Shopping Cart'}</div>
      </div>
      <Cart />
      
    </div>
  );
}

export default App;
