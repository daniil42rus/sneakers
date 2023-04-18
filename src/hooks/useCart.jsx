import React, { useContext } from 'react';
import { AppContext } from '../App';

export const useCart = () => {
	const { cartItems, setCartItems } = useContext(AppContext);
	const summ = cartItems.reduce(
		(accumulator, currentValue) => accumulator + currentValue.price,
		0
	);
	return { cartItems, setCartItems, summ };
}; 
 