import React, { useContext } from 'react';
import { AppContext } from '../App';
import { RenderItems } from '../components/RenderItems';

export const Home = ({ searchValue, onCangeSearchInpue, setSearchValue }) => {
	const { items } = useContext(AppContext);




	return (
		<div className="content">
			<div className="contentHead">
				<h1>{searchValue ? `Поиск: "${searchValue}"` : 'Все кроссовокки'}</h1>
				<div className="search-block">
					<img src="img/search.svg" alt="Search" />
					<input
						value={searchValue}
						onChange={onCangeSearchInpue}
						type="text"
						placeholder="Поиск..."
					/>
					{searchValue && (
						<img
							width={20}
							src="img/btn-remove.svg"
							alt="Remove"
							onClick={() => setSearchValue('')}
						/>
					)}
				</div>
			</div>
			<div className="cards">
				<RenderItems items={items} />
			</div>
		</div>
	);
};
