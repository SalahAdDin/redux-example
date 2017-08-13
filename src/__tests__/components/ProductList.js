import React from "react";
import {mount, render} from "enzyme";
import configureStore from 'redux-mock-store';
import ConnectedProductList from "../../components/ProductList";


const mockStore = configureStore();

it('Render no products when story is empty', () => {
    const store = mockStore({products: []});

    const wrapper = render(<ConnectedProductList store={store}/>);
    expect(wrapper.find(".product").length).toBe(0);
});

it('Render products', () => {
    const store = mockStore({
        products: [{
            id: 2,
            name: "On Motion Live",
            price: 99,
            image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg"
        },]
    });

    const wrapper = render(<ConnectedProductList store={store}/>);
    expect(wrapper.find(".product").length).toBe(1);
});

it('Add a product to the shopping cart', () => {
    const store = mockStore({
        products: [{
            id: 1,
            name: "On Motion Live",
            price: 99,
            image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg"
        },]
    });

    const wrapper = mount(<ConnectedProductList store={store}/>);
    wrapper.find('#product-1 button').simulate('click');

    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe("ADD_TO_CART");
    expect(actions[0].product).not.toBeNull();
});

