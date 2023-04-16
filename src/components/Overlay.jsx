import React from 'react';
import { Info } from './Info';

export const Overlay = ({ onClose, onRemove, items = [] }) => {
	let summ = 0;
	for (let item of items) {
		summ = summ + item.price;
	}

	let rate = (summ * 5) / 100;

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
									<b>{rate} руб.</b>
								</li>
							</ul>
							<button className="greenButton">
								Оформить заказ
								<img className="btnApply" src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</>
				) : (
					<Info 
					image={'/img/empty.png'}
					title={'Корзина пуста'}
					description={'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'}
					/>
				)}
			</div>
		</div>
	);
};
