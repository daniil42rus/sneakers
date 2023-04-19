import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RenderItems } from '../components/RenderItems';
import { Empty } from '../components/Empty';

export const Orders = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		try {
			const fetchOrders = async () => {
				const orderRes = await axios.get('http://localhost:3004/orders');
				setOrders(
					orderRes.data.reduce((prev, obj) => [...prev, ...obj.items], [])
				);
			};
			fetchOrders();
		} catch (error) {
			alert('Ошибка');
			console.log(error);
		}
	}, []);

	return (
		<div className="content">
			<div className="contentHead">
				<h1>{orders.length ? 'Мои покупки' : ''}</h1>
			</div>
			<div className="cards">
				{orders.length ? (
					<RenderItems items={orders} />
				) : (
					<Empty
						heading={'У вас нет заказов'}
						description={'Оформите хотя бы один заказ'}
						imgUrl={'img/sad.png'}
					/>
				)}
			</div>
		</div>
	);
};
