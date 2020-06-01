import React, { Component } from 'react';
export default class ItemRow extends Component {
    getPrice(price, credit_coupon_price){
        return (price <= credit_coupon_price) 
            ? <div className='price'>${price}</div>
            : <div className='price'>
                <div style={{textDecoration:'line-through', color: 'red'}}>${price}</div>
                <div>${credit_coupon_price}</div>
            </div>
    }
	render() {
        const { productsList, handleQuantityChange, handleRemove} = this.props;

		return (
            
			productsList && productsList.map((product)=>{
                let {price, credit_coupon_price, quantity, image, name} = product
                
                return(
                    <div className="item-row" key={product.id}>
                        <div className="image">
                          <img src={image} alt='img' />                       
                        </div>
                        <div className="name">{name.slice(0, name.lastIndexOf(' '))}</div>
                        {this.getPrice(price, credit_coupon_price)}
                        <div className="quantity">
                            <input type='number' 
                            value={quantity}
                            min={0} 
                            onChange={ e =>handleQuantityChange(e, product.id)}/>
                        </div>
                        <div className="remove">
                            <button className='remove-product' onClick={ e => handleRemove(e, product.id)}>Remove</button>
                        </div>
                        <div className="total">${credit_coupon_price*quantity}</div>
                    </div>
                )
            })
        )
	}
}
