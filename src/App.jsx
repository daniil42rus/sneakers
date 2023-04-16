import { createContext, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Overlay } from './components/Overlay';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Home } from './page/Home';
import { Favorites } from './page/Favorites';

export const AppContext = createContext({});

// const arr = [
// 	{
// 		name: 'Мужские Кроссовки Nike Blazer Mid Suede',
// 		price: 12999,
// 		imageUrl: '/img/sneakers/1.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Nike Air Max 270',
// 		price: 12999,
// 		imageUrl: '/img/sneakers/2.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Nike Blazer Mid Suede',
// 		price: 8499,
// 		imageUrl: '/img/sneakers/3.jpg',
// 	},
// 	{
// 		name: 'Кроссовки Puma X Aka Boku Future Rider',
// 		price: 8999,
// 		imageUrl: '/img/sneakers/4.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Under Armour Curry 8',
// 		price: 15199,
// 		imageUrl: '/img/sneakers/5.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Nike Kyrie 7',
// 		price: 11299,
// 		imageUrl: '/img/sneakers/6.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Jordan Air Jordan 11',
// 		price: 10799,
// 		imageUrl: '/img/sneakers/7.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Nike LeBron XVIII',
// 		price: 16499,
// 		imageUrl: '/img/sneakers/8.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Nike Lebron XVIII Low',
// 		price: 13999,
// 		imageUrl: '/img/sneakers/9.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Nike Blazer Mid Suede',
// 		price: 8599,
// 		imageUrl: '/img/sneakers/10.jpg',
// 	},
// 	{
// 		name: 'Кроссовки Puma X Aka Boku Future Rider',
// 		price: 8900,
// 		imageUrl: '/img/sneakers/11.jpg',
// 	},
// 	{
// 		name: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
// 		price: 11299,
// 		imageUrl: '/img/sneakers/12.jpg',
// 	},
// ];

function App() {
	const [items, setItems] = useState([]);
	const [cartClick, setCartClick] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [favoriteItems, setFavoriteItems] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const cartRes = await axios.get('http://localhost:3004/cart');
			const favRes = await axios.get('http://localhost:3004/favorites');
			const itemsRes = await axios.get('http://localhost:3004/items');
			setIsLoading(false);

			setCartItems(cartRes.data);
			setFavoriteItems(favRes.data);
			setItems(itemsRes.data);
		};

		fetchData();
	}, []);

	const onAddToCart = (obj) => {
		try {
			if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))) {
				axios.delete(`http://localhost:3004/cart/${obj.id}`);
				setCartItems((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				);
			} else {
				axios.post('http://localhost:3004/cart', obj);
				setCartItems((prev) => [...prev, obj]);
			}
		} catch (error) {
			alert('Не удалось добавить в корзину');
			console.log(error);
		}
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (
				favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id))
			) {
				axios.delete(`http://localhost:3004/favorites/${obj.id}`);
				setFavoriteItems((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				);
			} else {
				const { data } = await axios.post(
					'http://localhost:3004/favorites',
					obj
				);
				setFavoriteItems((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты');
			console.log(error);
		}
	};

	const onRemoveItem = (id) => {
		axios.delete(`http://localhost:3004/cart/${id}`);
		console.log(id);
		setCartItems((prev) =>
			prev.filter((item) => Number(item.id) !== Number(id))
		);
	};

	const onCangeSearchInpue = (e) => {
		setSearchValue(e.target.value);
	};

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.id) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{ cartItems, favoriteItems, items, isLoading, isItemAdded,setCartClick }}
		>
			<div className="wrapper">
				{cartClick && (
					<Overlay
						items={cartItems}
						onClose={() => setCartClick(!cartClick)}
						onRemove={onRemoveItem}
					/>
				)}

				<Header items={cartItems} onOpenCart={() => setCartClick(!cartClick)} />
				<Route path="/" exact>
					<Home
						searchValue={searchValue}
						onCangeSearchInpue={onCangeSearchInpue}
						setSearchValue={setSearchValue}
						items={items}
						cartItems={cartItems}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
						// isLoading={isLoading}
					/>
				</Route>
				<Route path="/favorites">
					<Favorites
						// items={favoriteItems}
						onAddToFavorite={onAddToFavorite}
					/>
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
