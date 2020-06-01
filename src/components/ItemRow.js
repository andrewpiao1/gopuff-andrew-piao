import React, { Component } from 'react';
export default class ItemRow extends Component {
	
	render() {
		const { productsList } = this.props;
		return (
			productsList &&
			productsList.map((product) => {
				return <div className="item-row" key={product.id} />;
			})
		);
	}
}
