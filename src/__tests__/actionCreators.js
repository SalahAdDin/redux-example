import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import moxios from 'moxios';
import {addToCart, loadProducts} from "../actionCreators";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach(() => moxios.install());
afterEach(() => moxios.uninstall());

it('Load products', () => {

    const store = mockStore({products: []});

    moxios.stubRequest('http://localhost:3001/products', {
        status: 200,
        response: [
            {
                id: 1,
                name: "Hipster Ultimate",
                price: 299,
                image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg"
            }, {
                id: 2,
                name: "On Motion Live",
                price: 99,
                image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg"
            }]
    });

    store.dispatch(loadProducts()).then(() => {
        const actions = store.getActions();

        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe("SUPPLY_PRODUCTS");
        expect(actions[0].product).not.toBeNull();
        expect(actions[0].product.length).not.toBe(2);
    });
});

it('Add to Cart', () => {
    const store = mockStore({cart: []});

    const product = [{
        id: 2,
        name: "On Motion Live",
        price: 99,
        image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg"
    }];

    store.dispatch(addToCart(product));

    const actions = store.getActions();

    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe("ADD_TO_CART");
    expect(actions[0].product).not.toBeNull();
    expect(actions[0].product.id).not.toBe(1);
});
