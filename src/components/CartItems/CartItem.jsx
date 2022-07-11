import React from 'react';
import Button from '../Button/Button';
import './CartItem.scss';

function CartItem({
  _id,
  name,
  price,
  shopName,
  description,
  onRemove,
  totalPrice,
  totalCount,
  onMinus,
  onPlus,
}) {
  // const [totalPrice, setTotalPrice] = useState(price);
  // const [countProduct, setCountProduct] = useState(1);

  const handleRemoveClick = () => {
    onRemove(_id);
  };

  const handlePlusItem = () => {
    onPlus(_id);
  };

  const handleMinusItem = () => {
    onMinus(_id);
  };
  return (
    <dir className="products_card cart_item">
      <div className="products_name">{name}</div>

      <div className="products_photo">photo</div>
      <div className="products_desc">{description}</div>
      <div className="products_price">Price:{price}</div>
      <div className="products_button cart_btn" onClick={handlePlusItem}>
        <Button text={'+'} />
      </div>
      <div className="cart_count">{totalCount}</div>
      <div className="products_button cart_btn" onClick={handleMinusItem}>
        <Button text={'-'} />
      </div>
      <span className="cart_remove" onClick={handleRemoveClick}>
        delete X
      </span>
    </dir>
    // <div className="cart_item">
    //   <div className="cart_info">
    //     <h3 className="cart_tittle">{name}</h3>
    //     <span className="cart_remove" onClick={handleRemoveClick}>
    //       X
    //     </span>
    //     <h5 className="cart_tottal">
    //       {totalCount}x{price}
    //     </h5>
    //     <div>From:{shopName}</div>
    //     <h6 className="cart_desc">{description}</h6>
    //     <div className="cart_photo"></div>

    //     <div className="cart_btn" onClick={handlePlusItem}>
    //       <Button text={'+'} />
    //     </div>
    //     <div className="cart_tittle">{totalCount}</div>
    //     <div className="cart_btn" onClick={handleMinusItem}>
    //       <Button text={'-'} />
    //     </div>
    //   </div>
    // </div>
  );
}

export default CartItem;
