import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const products = (state=[], action) => {
    if (action.type === "SUPPLY_PRODUCTS") {
        return action.products;
    }
    return state;
};

const cart = (state=[], action) => {
    if (action.type === "ADD_TO_CART") {
        return state.concat(action.product)
    } else if (action.type === "REMOVE_FROM_CART") {
        return state.filter(product => product.id !== action.product.id);
    }
    return state;
};

const logger = store => next => action => {
    console.log('Dispatching ', action);
    let result = next(action);
    console.log('Next state ', store.getState());
    return result;
};

export default createStore(combineReducers({cart, products}), applyMiddleware(logger, thunk));
