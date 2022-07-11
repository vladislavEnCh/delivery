import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button/Button';
import { getAllShops, getProducts } from '../../http/shopsAPI';
import { addProductToCart } from '../../store/actions/cart';
import './Home.scss';

function Home() {
  const [shops, setShop] = useState([]);
  const [shopName, setShopName] = useState('');
  const dispatch = useDispatch();
  const [products, setProducts] = useState();
  const [activeShop, setActiveShop] = useState('');

  useEffect(() => {
    getAllShops().then((data) => {
      setShop(data.shop);
    });
  }, []);

  useEffect(() => {
    getProducts(shopName).then((data) => {
      setProducts(data);
    });
  }, [shopName, activeShop]);

  const chooseShopHandler = (shop) => {
    setShopName(shop.name);
    // console.log(shop);
  };
  const addToCartHandler = (product) => {
    dispatch(addProductToCart(product));
    setActiveShop(product.shopName);
    console.log('1', product.shopName);
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="shops">
          <div className="shops_tittle">Shops:</div>

          {shops.map((shop, index) => (
            <div
              onClick={() => chooseShopHandler(shop)}
              key={index}
              className={` ${
                !activeShop || shop.name === activeShop
                  ? 'shops_element active'
                  : ' shops_element anactive'
              }`}>
              <div className="shops_name">{shop.name}</div>
            </div>
          ))}
        </div>
        <div className="products">
          {activeShop ? (
            products?.map((product, index) => {
              return (
                <dir key={index} className="products_card">
                  <div className="products_name">{product.name}</div>
                  <div className="products_photo">photo</div>
                  <div className="products_desc">{product.description}</div>
                  <div className="products_price">Price:{product.price}</div>

                  <div
                    onClick={() => addToCartHandler(product)}
                    className="products_button">
                    {' '}
                    <Button text={'Add to cart'} />
                  </div>
                </dir>
              );
            })
          ) : (
            <div className="products_choose">Choose Store</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
