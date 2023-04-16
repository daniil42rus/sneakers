import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const Header = (props) => {
	let summ = 0;
	for (let item of props.items) {
		summ = summ + item.price;
	}

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
					<img width={18} height={18} src="/img/user.svg" alt="user" />
				</li>
			</ul>
		</header>
	);
};
