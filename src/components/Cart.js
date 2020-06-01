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
	}

	componentDidMount() {
        axios.get('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json?fbclid=IwAR2dEMZK5yqhuNDgeC-_QpEZ5PazuwO6Fn0xaxKeUFt6ijjOg0Gafa5DoQc')
        .then((res) => {
            this.setState({
                productsList: res.data.cart.products,
                postalCode: res.data.postal_code,
                paymentMethod: res.data.payment_method,
                userData: res.data.user
            })
            const queryParam = res.data.cart.products.map((product) => product.id).join(',');
            this.getProductData(queryParam);
        })
        .catch((e) => console.log(e));
	}

	getProductData(productIds) {
		axios.get(`https://prodcat.gopuff.com/api/products?location_id=-1&product_ids=${productIds}`)
			.then((res) => {
				console.log(res);
				const metaData = res.data.products;
				console.log('metaData', metaData);
				this.setState((state) => {
					let newProductData = this.state.productsList;
					metaData.forEach((productMetaData) => {
						const matched = newProductData.find(
							(product) => product.product_id === productMetaData.product_id
						);
						matched.metaData = productMetaData;
					});
					return { productsList: newProductData };
				});
			})
			.catch((e) => console.log(e));
	}

	render() {
		console.log('cartdata: ', this.state);

		const { productsList } = this.state;
		// Image   quantity  name   price   subt
		return (
			<div className="right-block">
				{productsList.length && <ItemRow productsList={productsList} />}
				{/* {productsList.length && <ItemRow name={name} quantity={quanity} price={price} img={img} description={description}/>} */}

				<button onClick={() => this.getInitCart()}>CLICK ME</button>
			</div>
		);
	}
}
