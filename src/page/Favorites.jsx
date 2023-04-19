import React, { useContext } from 'react';
import { AppContext } from '../App';
import { RenderItems } from '../components/RenderItems';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Empty } from '../components/Empty';

export const Favorites = () => {
	const { favoriteItems } = useContext(AppContext);

	return (
		<div className="content">
			<div className="contentHead">
				<h1>{favoriteItems.length ? 'Избранное' : ''}</h1>
			</div>
			<div className="cards">
				{favoriteItems.length ? (
					<RenderItems items={favoriteItems} />
				) : (
					<Empty
						heading={'Закладок нет :('}
						description={'Вы ничего не добавляли в закладки'}
						imgUrl={'img/tears.png'}
					/>
				)}
			</div>
		</div>
	);
};
