import {products, cart} from "../reducers";

describe('Products', () => {
    it('Returns initial state', () => {
        expect(products(undefined, {})).toEqual([]);
    });
    it('Receive products', () => {
        const productList = [{
            id: 2,
            name: "On Motion Live",
            price: 99,
            image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg"
        }];

        expect(products([], {type: "SUPPLY_PRODUCTS", products: productList})).toEqual(productList);
    });
    it('Add products to the shopping cart', () => {
        const productItem = [{
            id: 2,
            name: "On Motion Live",
            price: 99,
            image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg"
        }];

        expect(cart([], {type: "ADD_TO_CART", product: productItem})).toEqual(productItem);
    });
    it('Remove products from shopping cart', () => {
        const productItem = [{
            id: 2,
            name: "On Motion Live",
            price: 99,
            image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg"
        }];

        expect(cart([productItem], {type:"REMOVE_FROM_CART", product: productItem})).toEqual([]);
    });
});
