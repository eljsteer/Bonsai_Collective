import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productAdded, setProductAdded] = useState(null)
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

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
    latestAddedProduct(productID)
    setIsCartMenuOpen(true);
    localStorage.setItem('CartProducts', JSON.stringify(newCartProducts));
    return productAdded;
  };
  
  const latestAddedProduct = (product) => {
    setProductAdded(product)
  }

    // Function to close the cart menu
    const closeCartMenu = () => {
      setIsCartMenuOpen(false);
    };

    // Function to remove product from cart (if needed later)
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
