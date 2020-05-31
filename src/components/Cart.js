import React, { Component } from 'react'
import axios from 'axios'

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initCart: {}
      
    }
  }

  componentDidMount(){
    this.getInitCart()
  }

  getInitCart() {
    axios.get('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json?fbclid=IwAR2dEMZK5yqhuNDgeC-_QpEZ5PazuwO6Fn0xaxKeUFt6ijjOg0Gafa5DoQc')
      .then(res => {
        console.log('res:', res.data.cart.products)
        this.setState({ initCart: res.data.cart })
      })
      .catch(e => console.log(e))
    }


  render() {
    // const { initCart } = this.state
    return (
      <div>
        {/* {initCart} */}
        <button onClick={this.getInitCart}>CLICK ME</button>
        
      </div>
    )
  }
}