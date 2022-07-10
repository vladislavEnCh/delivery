import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import { findOrder } from '../../http/shopsAPI';
import './History.scss';

function History() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrders] = useState([]);

  const findHandler = () => {
    findOrder(email, phone).then((data) => {
      console.log(data);
      setOrders(data);
    });
  };

  return (
    <div className="wrappere">
      <div className="history_filter">
        <div className="history_controls">
          <div>Find By:</div>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input history_input"
            type="text"
            placeholder="Email:"
          />
          <input
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className=" input history_input"
            type="phone"
            placeholder="Phone:"
          />
          <div onClick={findHandler} className="btn">
            Go Find
          </div>
        </div>
      </div>
      <div className="history_items">
        {order['order'] ? (
          order['order']?.map((order) => (
            <Card
              key={order._id}
              name={order.name}
              order={order}
              totalPrice={order?.totalPrice}
              adress={order.adress}
            />
          ))
        ) : (
          <div className="history_nothing">Nothing found</div>
        )}
      </div>
    </div>
  );
}

export default History;
