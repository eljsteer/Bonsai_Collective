import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

////------------------------------------------------////
////------ Context provider for shopping cart ------////
////------------------------------------------------////
export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productAdded, setProductAdded] = useState(null);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const [anchorElUserCart, setAnchorElUserCart] = useState(null);

  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem('CartProducts')) || [];
    setCartProducts(storedCartProducts);
  }, []);

  // Sync cartProducts with localStorage whenever cartProducts changes
  useEffect(() => {
    localStorage.setItem('CartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

////------ Function to add product to cart ------>> 
  const addProductToCart = ( productID, productName, productPrice ) => {
    const newCartProducts = [...cartProducts];
////------ Function to function to check newCartProducts to check if the item to be added is already in array ------>> 
    const existingProductIndex = newCartProducts.findIndex(p => p.ProductID === productID);

////------ Function to check if product is already in cart, if so then increment quantity ------>> 
    if (existingProductIndex !== -1) {
      // If exists increment Quantity
      newCartProducts[existingProductIndex].Quantity += 1;
    } else {
      // Add new product to cart
      newCartProducts.push({ 
        ProductID: productID, 
        ProductName: productName,
        ProductPrice: productPrice,
        Quantity: 1 
      });
    }
  
    setCartProducts(newCartProducts);
    latestAddedProduct(productID, productName, productPrice)
    setIsCartMenuOpen(true);
    localStorage.setItem('CartProducts', JSON.stringify(newCartProducts));
    return productAdded;
  };

////------ Function to save latest added product to display in modal------>>
  const latestAddedProduct = (product) => {
    setProductAdded(product)
  }

// Set CartIcon as anchor manually
    const setCartIconAsAnchor = (cartIconElement) => {
      setAnchorElUserCart(cartIconElement);
    };

////------ Function to close the cart dropdown info ------>>
    const closeCartMenu = () => {
      setIsCartMenuOpen(false);
      setAnchorElUserCart(null); // Reset anchor when closing
    };

//// ------ Function to remove product from cart ------>>
    // const removeProductFromCart = (productId) => {
    // // Implement logic to remove product
    // // Update cartProducts state
    // };
    
  return (
    <CartContext.Provider value={{ cartProducts, addProductToCart, latestAddedProduct, productAdded, closeCartMenu, isCartMenuOpen, anchorElUserCart, setCartIconAsAnchor }}>
      {children}
    </CartContext.Provider>
  );
};
    
CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
