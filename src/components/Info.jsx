import React, { useContext } from 'react';
import { AppContext } from '../App';

export const Info = ({ image, title, description }) => {
	const { setCartClick } = useContext(AppContext);
	return (
		<div className="cart">
			<img src={image} alt="" />
			<h3>{title}</h3>
			<p>{description}</p>
			<button onClick={() => setCartClick(false)} className="greenButton">
				<img className="btnBack" src="img/back-arrow.svg" alt="Arrow" />
				Вернуться назад
			</button>
		</div>
	);
};
