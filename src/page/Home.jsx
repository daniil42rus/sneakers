import React, { useContext } from 'react';
import { Card } from '../components/Card';
import { AppContext } from '../App';

export const Home = ({
	searchValue,
	onCangeSearchInpue,
	setSearchValue,
	items,
	onAddToFavorite,
	onAddToCart,
	// cartItems,
	// isLoading,
}) => {
	const { isLoading } = useContext(AppContext);

	const renderItems = () => {
		return isLoading
			? [...Array(8)].map(() => <Card />)
			: items
					.filter((item) =>
						item.name.toLowerCase().includes(searchValue.toLowerCase())
					)
					.map((item, index) => (
						<Card
							key={index}
							// added={isItemAdded(item && item.id)}
							onFavorite={(obj) => onAddToFavorite(obj)}
							onPlus={(obj) => onAddToCart(obj)}
							loading={isLoading}
							{...item}
						/>
					));
	};

	return (
		<div className="content">
			<div className="contentHead">
				<h1>{searchValue ? `Поиск: "${searchValue}"` : 'Все кроссовокки'}</h1>
				<div className="search-block">
					<img src="/img/search.svg" alt="Search" />
					<input
						value={searchValue}
						onChange={onCangeSearchInpue}
						type="text"
						placeholder="Поиск..."
					/>
					{searchValue && (
						<img
							width={20}
							src="/img/btn-remove.svg"
							alt="Remove"
							onClick={() => setSearchValue('')}
						/>
					)}
				</div>
			</div>
			<div className="cards">{renderItems()}</div>
		</div>
	);
};
