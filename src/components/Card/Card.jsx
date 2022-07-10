import React, { useEffect } from 'react';
import './Card.scss';

function Card({ name, totalPrice, order, adress }) {
  useEffect(() => {
    Object.keys(order.orders)?.map((key) =>
      console.log(order.orders[key].items[0])
    );
  }, [order]);

  return (
    <>
      <dir className="history_card">
        <div className="history_name">{name}</div>
        <div className="history_you">Your products:</div>
        {Object.keys(order.orders)?.map((key) => (
          <div>{order.orders[key].items[0].name}</div>
        ))}
        <div className="history_price">Delivery Adress:{adress}</div>
        <div className="history_price">Total price:{totalPrice}</div>
      </dir>
    </>
  );
}

export default Card;
