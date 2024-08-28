import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

////------------------------------------------------////
////------ Context provider for shopping cart ------////
////------------------------------------------------////
export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productAdded, setProductAdded] = useState(null)
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem('CartProducts')) || [];
    setCartProducts(storedCartProducts);
  }, []);

////------ Function to add product to cart ------>> 
  const addProductToCart = (productID) => {
    const newCartProducts = [...cartProducts];
    const existingProductIndex = newCartProducts.findIndex(p => p.ProductID === productID);

////------ Function to check if product is already in cart, if so then increment quantity ------>> 
    if (existingProductIndex !== -1) {
      // If exists increment Quantity
      newCartProducts[existingProductIndex].Quantity += 1;
    } else {
      // Add new product to cart
      newCartProducts.push({ ProductID: productID, Quantity: 1 });
    }
  
    setCartProducts(newCartProducts);
    latestAddedProduct(productID)
    setIsCartMenuOpen(true);
    localStorage.setItem('CartProducts', JSON.stringify(newCartProducts));
    return productAdded;
  };

////------ Function to save latest added product to display in modal------>>
  const latestAddedProduct = (product) => {
    setProductAdded(product)
  }

////------ Function to close the cart dropdown info ------>>
    const closeCartMenu = () => {
      setIsCartMenuOpen(false);
    };

//// ------ Function to remove product from cart ------>>
    // const removeProductFromCart = (productId) => {
    // // Implement logic to remove product
    // // Update cartProducts state
    // };
    
  return (
    <CartContext.Provider value={{ cartProducts, addProductToCart, latestAddedProduct, productAdded, closeCartMenu, isCartMenuOpen }}>
      {children}
    </CartContext.Provider>
  );
};
    
CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
