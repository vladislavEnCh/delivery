import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import CartItem from '../../components/CartItems/CartItem';
import { createOrder } from '../../http/shopsAPI';
import {
  clearCart,
  minusCartItem,
  plusCartItem,
  removeCartItem,
} from '../../store/actions/cart';
import './Cart.scss';

function Cart() {
  const { totalPrice, items } = useSelector(({ cart }) => cart);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [adressInput, setAdressInput] = useState('');
  // ==================
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [adressDirty, setAdressDirty] = useState(false);
  const [emailError, setEmailError] = useState('Cant be empty');
  const [nameError, setNameError] = useState('Cant be empty');
  const [phoneError, setPhoneError] = useState('Cant be empty');
  const [adressError, setAdressError] = useState('Cant be empty');
  // ==================
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    adress: '',
  });
  const [formValid, setFormValid] = useState(false);

  // =====Validation form=================
  useEffect(() => {
    if (emailError || nameError || phoneError || adressError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, nameError, phoneError, adressError]);
  const emailHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEmailInput(e.target.value);
    const validators =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validators.test(String(e.target.value).toLowerCase())) {
      setEmailError('uncorrect email');
    } else {
      setEmailError('');
    }
  };
  const nameHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setNameInput(e.target.value);
    if (e.target.value.length < 3) {
      setNameError('min length 3 simbol');
    } else {
      setNameError('');
    }
  };
  const adressHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setAdressInput(e.target.value);
    if (e.target.value.length < 3) {
      setAdressError('min length 3 simbol');
    } else {
      setAdressError('');
    }
  };
  const phoneHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setPhoneInput(e.target.value);
    if (e.target.value.length < 3) {
      setPhoneError('min length 3 simbol');
    } else {
      setPhoneError('');
    }
  };
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'name':
        setNameDirty(true);
        break;
      case 'phone':
        setPhoneDirty(true);
        break;
      case 'adress':
        setAdressDirty(true);
        break;
    }
  };
  // =================================

  const dispatch = useDispatch();

  const products = Object.keys(items).map((key) => {
    return items[key].items[0];
  });
  const onRemoveItem = (id) => {
    if (window.confirm('Are you shure?')) {
      dispatch(removeCartItem(id));
    }
  };
  const onClickClearCart = () => {
    dispatch(clearCart());
  };

  const onPlusItem = (_id) => {
    dispatch(plusCartItem(_id));
  };

  const onMinusItem = (id) => {
    dispatch(minusCartItem(id));
  };

  const submitHandler = () => {
    createOrder(
      nameInput,
      emailInput,
      adressInput,
      phoneInput,
      items,
      totalPrice
    );
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="cart_order">
          <input
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => nameHandler(e)}
            value={nameInput}
            name="name"
            className="cart_input"
            placeholder="name"
            type="text"
          />
          {nameDirty && nameError && <div className="error">{nameError}</div>}
          <input
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => emailHandler(e)}
            value={emailInput}
            className="cart_input"
            name="email"
            placeholder="email"
            type="text"
          />
          {emailDirty && emailError && (
            <div className="error">{emailError}</div>
          )}
          <input
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => phoneHandler(e)}
            value={phoneInput}
            className="cart_input"
            placeholder="phone"
            name="phone"
            type="text"
          />
          {phoneDirty && phoneError && (
            <div className="error">{phoneError}</div>
          )}
          <input
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => adressHandler(e)}
            value={adressInput}
            className="cart_input"
            name="adress"
            placeholder="adress"
            type="text"
          />
          {adressDirty && adressError && (
            <div className="error">{adressError}</div>
          )}
        </div>

        <div className="cart_products">
          <div className="cart_items">
            {!products.length ? (
              <div className="cart_empty">Cart is empty</div>
            ) : (
              products.map((obj) => (
                <CartItem
                  _id={obj._id}
                  key={`${obj.name}_${obj.name}`}
                  name={obj.name}
                  price={obj.price}
                  shopName={obj.shopName}
                  description={obj.description}
                  totalPrice={items[obj._id].totalPrice}
                  totalCount={items[obj._id].items.length}
                  onRemove={onRemoveItem}
                  onMinus={onMinusItem}
                  onPlus={onPlusItem}
                />
              ))
            )}
          </div>

          <div className="cart_fetures">
            <div>
              <h4 className="cart_total">Total Price:{totalPrice}</h4>
            </div>
            {totalPrice ? (
              <div onClick={onClickClearCart} className="btn">
                Clear Cart
              </div>
            ) : (
              ''
            )}
            <button
              disabled={!formValid}
              onClick={submitHandler}
              className="cart_submit btn ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
