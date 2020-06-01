import React from 'react';
export default function ItemRow({ productsList, handleQuantityChange, handleRemove}){
    return (        
        productsList && productsList.map((product)=>{
            const {price, credit_coupon_price, quantity, image, name} = product
            
            return(
                <div className="item-row" key={product.id}>
                    <div className="image">
                        <img src={image} alt='img' />                       
                    </div>
                    <div className="name">{name.slice(0, name.lastIndexOf(' '))}</div>
                    {getPrice(price, credit_coupon_price)}
                    <div className="quantity">
                        <input type='number' 
                        value={quantity}
                        min={1} 
                        onChange={ e =>handleQuantityChange(e, product.id)}/>
                    </div>
                    <div className="remove">
                        <button className='remove-product' onClick={ e => handleRemove(e, product.id)}>Remove</button>
                    </div>
                    <div className="total">${(credit_coupon_price*quantity).toFixed(2)}</div>
                </div>
            )
        })
    )
}

const getPrice = (price, credit_coupon_price) => {
    return (price <= credit_coupon_price) 
        ? <div className='price'>
            <div className="price-tag">${price}</div>
            </div>
        : <div className='price'>
            <div className="price-tag" style={{textDecoration:'line-through', color: 'crimson', opacity: '90%'}}>${price}</div>
            <div className="price-tag" style={{color:'green'}}>${credit_coupon_price}</div>
        </div>
}