import React, { useContext } from 'react';
import { Card } from './Card';
import { AppContext } from '../App';

export const RenderItems = ({ items = [] }) => {
  const { isLoading, onAddToFavorite, searchValue, onAddToCart } =
    useContext(AppContext);

  const filtredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return isLoading
    ? [...Array(8)].map((_, id) => <Card key={id} />)
    : filtredItems.map((item, index) => (
        <Card
          key={index}
          {...item}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
        />
      ));
};
