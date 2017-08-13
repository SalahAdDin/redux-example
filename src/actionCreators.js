import axios from 'axios';

const loadProducts = () => {
  return dispatch => {
    axios.get("http://localhost:3001/products").then(reponse =>{
      dispatch({
        type: "SUPPLY_PRODUCTS",
        products: reponse.data
      })
    });
  }
};

const addToCart = product => {
  return {
    type: "ADD_TO_CART",
    product
  }
};

const removeFromCart = product => {
  return {
    type: "REMOVE_FROM_CART",
    product
  }
};

export { loadProducts, addToCart, removeFromCart };
