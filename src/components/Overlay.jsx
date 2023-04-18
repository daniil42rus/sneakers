import React, { useState } from 'react';
import { Info } from './Info';
// import { AppContext } from '../App';
import axios from 'axios';
import { useCart } from '../hooks/useCart';

export const Overlay = ({ onClose, onRemove, items = [] }) => {
	const [orderId, setOrderId] = useState(null);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// const { cartItems, setCartItems } = useContext(AppContext);
	// const summ = cartItems.reduce(
	// 	(accumulator, currentValue) => accumulator + currentValue.price,
	// 	0
	// );

	const { cartItems, setCartItems, summ } = useCart();

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('http://localhost:3004/orders', {
				items: cartItems,
			});
			setOrderId(Number(data.id));
			console.log(data);
			setIsOrderComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];

				await axios.delete(`http://localhost:3004/cart/${item.id}`);
			}
			// await axios.patch('http://localhost:3004/cart', []);
		} catch (error) {
			alert('Ошибка в корзине');
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<div className="overlay">
			<div className="drawer">
				<div className="cardTop">
					<h2>Корзина</h2>
					<img
						onClick={onClose}
						className="removeBtn"
						src="/img/btn-remove.svg"
						alt="Remove"
					/>
				</div>
				{items.length ? (
					<>
						<div className="items">
							{items.map((obj) => (
								<div className="cartItem">
									<img
										width={70}
										height={70}
										src={obj.imageUrl}
										alt="Sneakers"
									/>
									<div>
										<p>{obj.name}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className="removeBtn"
										src="/img/btn-remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>
						<div className="cardTotalBlock">
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{summ} руб.</b>
								</li>
								<li>
									<span>Нолог 5%</span>
									<div></div>
									<b>{(summ * 5) / 100} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className="greenButton"
							>
								Оформить заказ
								<img className="btnApply" src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</>
				) : (
					<Info
						image={
							isOrderComplete ? '/img/complite-order.png' : '/img/empty.png'
						}
						title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пуста'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
						}
					/>
				)}
			</div>
		</div>
	);
};
