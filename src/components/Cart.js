import React, { Component } from 'react';
import axios from 'axios';
import ItemRow from './ItemRow';

export default class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productsList: [],
			postalCode: '',
			paymentMethod: '',
			userData: {},
			cartTotal: 0
        };
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
	}


	componentDidMount() {
        axios.get('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json?fbclid=IwAR2dEMZK5yqhuNDgeC-_QpEZ5PazuwO6Fn0xaxKeUFt6ijjOg0Gafa5DoQc')
        .then((res) => {

            const queryParam = res.data.cart.products.map((product) => product.id).join(',');
            this.getProductData(queryParam, res.data );
        })
        .catch((e) => console.log(e));
	}

	getProductData(productIds, data) {
		axios.get(`https://prodcat.gopuff.com/api/products?location_id=-1&product_ids=${productIds}`)
			.then((res) => {
                const metaData = res.data.products
                console.log('meta', metaData)
                const products = data.cart.products
				this.setState((state) => {
					
					metaData.forEach((productMetaData) => {
						const matched = products.find(
							(product) => product.product_id === productMetaData.product_id
						);
                        matched.name = productMetaData.name
                        matched.description = productMetaData.description
                        matched.image = productMetaData.images[0]['thumb']
                        
                    });
					return { productsList: products };
				});
			})
			.catch((e) => console.log(e));
    }
    
    handleQuantityChange(e, id){
        const newProductsList = [...this.state.productsList]
        const item = newProductsList.find(product => product.id === id)
        item.quantity = e.target.value
        this.setState({productsList: newProductsList})
    }

	render() {
        const { productsList } = this.state;
		return (
			<div className="cart-container">
                    <div className="item-row row">
                        <div className="image"></div>
                        <div className="name">Name</div>
                       <div className="price">Price</div>
                        <div className="quantity">Quantity</div>
                        <div className="remove">Remove</div>
                        <div className="total">Total</div>
                    </div>  
				{productsList.length && 
                    <ItemRow productsList={productsList} handleQuantityChange={this.handleQuantityChange}/>}
				<button onClick={() => this.getInitCart()}>CLICK ME</button>
			</div>
		);
	}
}
