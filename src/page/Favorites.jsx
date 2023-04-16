import React, { useContext } from 'react';
import { Card } from '../components/Card';
import { AppContext } from '../App';

export const Favorites = ({
	// items,
	onAddToFavorite,
}) => {
	const { favoriteItems } = useContext(AppContext);
	const { isLoading } = useContext(AppContext);

	const renderItems = () => {
		return isLoading
			? [...Array(8)].map(() => <Card />)
			: favoriteItems.map((item, index) => (
					<Card
						key={index}
						{...item}
						favorited={true}
						onFavorite={onAddToFavorite}
						loading={isLoading}
					/>
			  ));
	};

	return (
		<div className="content">
			<div className="contentHead">
				<h1>{favoriteItems.length ? 'Избранное' : 'Ничего нет'}</h1>
			</div>
			<div className="cards">
				{renderItems()}
			</div>
		</div>
	);
};
