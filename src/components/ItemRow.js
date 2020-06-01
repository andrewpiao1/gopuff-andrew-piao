import React, { Component } from 'react';
export default class ItemRow extends Component {
    getPrice(price, credit_coupon_price){
        console.log(price, credit_coupon_price)
        return (price <= credit_coupon_price) 
            ? <div className='price'>{price}</div>
            : <div className='price'>
                <div style={{textDecoration:'line-through'}}>{price}</div>
                <div>{credit_coupon_price}</div>
            </div>
    }
	render() {
        const { productsList } = this.props;

		return (
            
			productsList && productsList.map((product)=>{
                const {price, credit_coupon_price, quantity, image, name} = product
                
                
                return(
                    <div className="item-row" key={product.id}>
                        <img className='image' src={image} alt='img' />
                        <div className="name">{name.slice(0, name.lastIndexOf(' '))}</div>
                        {this.getPrice(price, credit_coupon_price)}
                        <div className="quantity">{quantity}</div>
                        <div className="remove">remove</div>
                        <div className="subtotal">subtotal</div>
                    </div>
                )
            })
        )
	}
}
