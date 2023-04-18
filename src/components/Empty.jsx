import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const Empty = ({ heading, description, imgUrl }) => {
	return (
		<div className="empty">
			<img width={70} height={70} src={imgUrl} alt="SoSad" />
			<h3>{heading}</h3>
			<span>{description}</span>
			<Link to="/">
				<button className="greenButton">
					<img className="btnBack" src="/img/back-arrow.svg" alt="Arrow" />
					Вернуться назад
				</button>
			</Link>
		</div>
	);
};
