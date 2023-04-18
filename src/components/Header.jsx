import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { AppContext } from '../App';

import { useCart } from '../hooks/useCart';

export const Header = (props) => {
	// const { cartItems } = useContext(AppContext);

	// const summ = cartItems.reduce(
	// 	(accumulator, currentValue) => accumulator + currentValue.price,
	// 	0
	// );
	const { summ } = useCart();

	return (
		<header>
			<Link to="/">
				<div className="headerLeft">
					<img width={40} height={40} src="/img/logo.png" alt="logo" />
					<div className="headerInfo">
						<h3>React Sneakers</h3>
						<p>Магазин кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="headerRight">
				<li onClick={props.onOpenCart}>
					<img width={18} height={18} src="/img/card.svg" alt="card" />

					<span>{summ} руб.</span>
				</li>
				<li>
					<Link to="/favorites">
						<img width={18} height={18} src="/img/heart.svg" alt="heart" />
					</Link>
				</li>
				<li>
					<Link to="/oders">
						<img width={18} height={18} src="/img/user.svg" alt="user" />
					</Link>
				</li>
			</ul>
		</header>
	);
};
