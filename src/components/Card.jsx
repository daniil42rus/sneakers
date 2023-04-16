import React, { useContext, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../App';

export const Card = ({
	name,
	price,
	imageUrl,
	onFavorite,
	onPlus,
	favorited = false,
	id,
	// added = false,
	loading = true,
}) => {

	const { isItemAdded } = useContext(AppContext);

	// const [isAddeed, setIsAdded] = useState(added);
	const [isFavorite, setIsFavorite] = useState(favorited);

	const handlePlus = () => {
		onPlus({ id, name, price, imageUrl });
		// setIsAdded(!isAddeed);
	};

	const onClickFavorite = () => {
		onFavorite({ id, name, price, imageUrl });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className="card">
			{loading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={260}
					viewBox="0 0 150 260"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="1" rx="10" ry="10" width="150" height="91" />
					<rect x="0" y="110" rx="10" ry="10" width="150" height="15" />
					<rect x="0" y="140" rx="10" ry="10" width="100" height="15" />
					<rect x="0" y="170" rx="10" ry="10" width="69" height="24" />
					<rect x="124" y="170" rx="10" ry="10" width="24" height="24" />
				</ContentLoader>
			) : (
				<>
					<button className="favorite" onClick={onClickFavorite}>
						<img
							src={
								isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'
							}
							alt="Unliked"
						/>
					</button>
					<img width={133} height={112} src={imageUrl} alt="Sneakers" />
					<p>{name}</p>
					<div className="cardContent">
						<div className="cardBottom">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						<button onClick={handlePlus}>
							<img
								src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
								alt="Plus"
							/>
						</button>
					</div>
				</>
			)}
		</div>
	);
};
