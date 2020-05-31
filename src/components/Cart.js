import React, { Component } from 'react'
import axios from 'axios'

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      postalCode: '',
      paymentMethod: '',
      userData: {}
    }
    this.getInitCart = this.getInitCart.bind(this)
  }

  componentDidMount(){
    this.getInitCart()
  }

  getInitCart() {
    axios.get('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json?fbclid=IwAR2dEMZK5yqhuNDgeC-_QpEZ5PazuwO6Fn0xaxKeUFt6ijjOg0Gafa5DoQc')
      .then(res => {
        console.log('res:', res.data.cart.products)
        this.setState({ 
          products: res.data.cart.products,
          postalCode: res.data.postal_code,
          paymentMethod: res.data.payment_method,
          userData: res.data.user
        })
      })
      .catch(e => console.log(e))
    }

  render() {
    // const { products, postalCode, paymentMethod, userData } = this.state
    console.log('state', this.state)
    return (
      <div>
        {}
        <button onClick={() => this.getInitCart()}>CLICK ME</button>
        
      </div>
    )
  }
}