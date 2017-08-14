const products = (state = [], action) => {
    if (action.type === "SUPPLY_PRODUCTS") {
        return action.products;
    }
    return state;
};

const cart = (state = [], action) => {
    if (action.type === "ADD_TO_CART") {
        return state.concat(action.product)
    } else if (action.type === "REMOVE_FROM_CART") {
        return state.filter(product => product.id !== action.product.id);
    }
    return state;
};

export {products, cart};
