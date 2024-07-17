// storeContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const storeContext = createContext({
    gadget_list: [],
    cartItems: {},
    addToCart: () => {},
    removeFromCart: () => {}
});

const StoreContextProvider = ({ children }) => {
    const [gadgetList, setGadgetList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000/";
    const [token, setToken] = useState("");

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const fetchGadgetList = async () => {
        try {
            const response = await axios.get(url + "api/gadget/list");
            setGadgetList(response.data.data);
        } catch (error) {
            console.error("Error fetching gadget list:", error);
        }

        }

        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        loadData();
    }, []);

    const contextValue = {
        gadget_list: gadgetList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken,
        getTotalCartAmount
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;