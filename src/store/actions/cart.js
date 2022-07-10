export let addProductToCart = (product)=>({
    type: 'ADD_PRODUCT_TO_CART',
    payload: product
})

export let clearCart = ()=>({
    type: 'CLEAR_CART',
    
})

export const removeCartItem = (_id) => ({
    type: 'REMOVE_CART_ITEM',
    payload: _id,
  });
  
  export const plusCartItem = (_id) => ({
    type: 'PLUS_CART_ITEM',
    payload: _id,
  });
  
  export const minusCartItem = (_id) => ({
    type: 'MINUS_CART_ITEM',
    payload: _id,
  });
  