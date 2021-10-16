import { reducerFunc } from "./reducer";

describe("testing cart", () => {
  test("should add to cart when a value is added", () => {
    let initialState = {
      cart: [],
      totalPrice: 0,
    };

    let product = {
      id: "610410e0a6c1ff06dd62ac85",
      name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
      price: 12000,
    };

    let action = { type: "ADD_TO_CART", payload: product };

    let state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
      ],
      totalPrice: 12000,
    });

    action = {
      type: "ADD_TO_CART",
      payload: {
        id: "610410e0a6c1ff06dd62ac8b0",
        name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
        price: 8000,
      },
    };

    state = reducerFunc(state, action);

    expect(state).toEqual({
      cart: [
        {
          id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
        {
          id: "610410e0a6c1ff06dd62ac8b0",
          name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
          price: 8000,
          quantity: 1,
        },
      ],
      totalPrice: 20000,
    });
  });

  test("should remove the item from the cart", () => {
    let initialState = {
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
        {
          _id: "610410e0a6c1ff06dd62ac8b0",
          name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
          price: 8000,
          quantity: 1,
        },
      ],
      totalPrice: 20000,
    };

    let action = {
      type: "REMOVE_FROM_CART",
      payload: {
        _id: "610410e0a6c1ff06dd62ac8b0",
        name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
        price: 8000,
        quantity: 1,
      },
    };

    let state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
      ],
      totalPrice: 12000,
    });

    initialState = {
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
        {
          _id: "610410e0a6c1ff06dd62ac8b0",
          name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
          price: 8000,
          quantity: 2,
        },
      ],
      totalPrice: 28000,
    };

    action = {
      type: "REMOVE_FROM_CART",
      payload: {
        _id: "610410e0a6c1ff06dd62ac8b0",
        name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
        price: 8000,
        quantity: 2,
      },
    };

    state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
      ],
      totalPrice: 12000,
    });
  });

  test("should increment quantity of product in cart", () => {
    let initialState = {
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
        {
          _id: "610410e0a6c1ff06dd62ac8b0",
          name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
          price: 8000,
          quantity: 1,
        },
      ],
      totalPrice: 20000,
    };

    let action = {
      type: "INC_QTY",
      payload: {
        _id: "610410e0a6c1ff06dd62ac85",
        price: 12000,
      },
    };

    let state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 2,
        },
        {
          _id: "610410e0a6c1ff06dd62ac8b0",
          name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
          price: 8000,
          quantity: 1,
        },
      ],
      totalPrice: 32000,
    });
  });

  test("should decrement quantity of product in cart", () => {
    let initialState = {
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 2,
        },
        {
          _id: "610410e0a6c1ff06dd62ac8b0",
          name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
          price: 8000,
          quantity: 1,
        },
      ],
      totalPrice: 32000,
    };

    let action = {
      type: "DEC_QTY",
      payload: {
        _id: "610410e0a6c1ff06dd62ac85",
        price: 12000,
      },
    };

    let state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          _id: "610410e0a6c1ff06dd62ac85",
          name: "2021 Polygon Strattos S5 - Shimano 105 Road Bike",
          price: 12000,
          quantity: 1,
        },
        {
          _id: "610410e0a6c1ff06dd62ac8b0",
          name: "2021 Polygon Siskiu D7 - Dual Suspension Mountain Bike",
          price: 8000,
          quantity: 1,
        },
      ],
      totalPrice: 20000,
    });
  });
});
