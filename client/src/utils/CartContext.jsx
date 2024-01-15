import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem('CartProducts')) || [];
    setCartProducts(storedCartProducts);
  }, []);

  const addProductToCart = (productID) => {
    const newCartProducts = [...cartProducts];
    const existingProductIndex = newCartProducts.findIndex(p => p.ProductID === productID);
  
    if (existingProductIndex !== -1) {
      // Product already in cart, increment Quantity
      newCartProducts[existingProductIndex].Quantity += 1;
    } else {
      // Add new product to cart
      newCartProducts.push({ ProductID: productID, Quantity: 1 });
    }
  
    setCartProducts(newCartProducts);
    localStorage.setItem('CartProducts', JSON.stringify(newCartProducts));
  };
  

    // Function to remove product from cart (if needed later)
    // const removeProductFromCart = (productId) => {
    // // Implement logic to remove product
    // // Update cartProducts state
    // };
    
  return (
    <CartContext.Provider value={{ cartProducts, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
    
  CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
