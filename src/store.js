import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
    if (action.type === "SUPPLY_PRODUCTS") {
        return {
            ...state, products: action.products
        };
    } else if (action.type === "ADD_TO_CART") {
        return {
            ...state, cart: state.cart.concat(action.product)
        };
    } else if (action.type === "REMOVE_FROM_CART") {
        return {
            ...state, cart: state.cart.filter(product => product.id !== action.product.id)
        };
    }
    return state;
};

const logger = store => next => action => {
    console.log('Dispatching ', action);
    let result = next(action);
    console.log('Next state ', store.getState());
    return result;
};

export default createStore(reducer, {cart: [], products: []}, applyMiddleware(logger, thunk));
