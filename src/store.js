import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {cart, products} from "./reducers";

const logger = store => next => action => {
    console.log('Dispatching ', action);
    let result = next(action);
    console.log('Next state ', store.getState());
    return result;
};

export default createStore(combineReducers({cart, products}), applyMiddleware(logger, thunk));
