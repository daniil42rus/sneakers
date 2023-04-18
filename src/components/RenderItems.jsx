import React, { useContext } from 'react';
import { Card } from './Card';
import { AppContext } from '../App';

export const RenderItems = ({ items = [] }) => {
	const { isLoading, onAddToFavorite, onAddToCart } = useContext(AppContext);

	return isLoading
		? [...Array(8)].map(() => <Card />)
		: items.map((item, index) => (
				<Card
					key={index}
					{...item}
					onFavorite={(obj) => onAddToFavorite(obj)}
					onPlus={(obj) => onAddToCart(obj)}
					loading={isLoading}
				/>
		  ));
};
