import React, { Component } from 'react'
import axios from 'axios'

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initCart: {}
    }
  }

  getInitCart() {
    const { initCart } = this.state;
    axios.get('https://www.facebook.com/messenger_media?thread_id=738500500&attachment_id=294441651562273&message_id=mid.%24cAAAAAHuls2J4naAkMVybFrT3jss0')
      .then(res => {
        this.setState({ initCart: res.data })
      }
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}