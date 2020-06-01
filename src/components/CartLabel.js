import React from 'react'

export default function CartLabel() {
    return (
        <div className="item-row row">
            <div className="image"></div>
            <div className="name">Name</div>
            <div className="price">Price</div>
            <div className="quantity">Quantity</div>
            <div className="remove">Remove</div>
            <div className="total">Total</div>
        </div>  
    )
}
