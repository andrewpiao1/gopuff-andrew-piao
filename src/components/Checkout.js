import React from 'react'

export default function Checkout(props) {
    const subTotal = calculateSubtotal(props.productsList)
    const tax = subTotal * 0.08
    const shipping = 5
    const grandTotal = subTotal + tax + shipping
    return (
         <div className='table'>
            <div className='checkout-row'>
                <div className='checkout-label'>Subtotal</div>
                <div>${subTotal.toFixed(2)}</div>
            </div>
            <div className='checkout-row'>
                <div className='checkout-label'>Tax (8%)</div>
                <div>${tax.toFixed(2)}</div>
            </div>
            <div className='checkout-row'>
                <div className='checkout-label'>Shipping</div>
                <div>${shipping.toFixed(2)}</div>
            </div>
            <div className='checkout-row' style={{fontWeight: 500}}>
                <div className='checkout-label'>Grand Total</div>
                <div>${grandTotal.toFixed(2)}</div>
            </div>
            <button className="checkout">Checkout</button>
        </div>
    )
}

const calculateSubtotal = (productsList) =>{
     let subTotal = 0;
     productsList.forEach(e => {
         subTotal += e.quantity * e.credit_coupon_price
     })
     return subTotal
}