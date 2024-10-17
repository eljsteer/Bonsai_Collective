import { useContext, useState } from "react";
import { Box, Container, Grid, Typography, IconButton, Button, Paper, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartContext } from "../utils/CartContext";
import './styles/cart.css';

////----------------------------------------------------


////--------------------------------////
////------ Shopping Cart Page ------////
////--------------------------------////
export default function Cart () {
  const { cartProducts } = useContext(CartContext);
  let cartProductsArray = cartProducts;
  const [ cartItems, setCartItems ] = useState(cartProductsArray);

  const handleQuantityChange = (ProductID, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.ProductID === ProductID
          ? { ...item, Quantity: item.Quantity + amount >= 0 ? item.Quantity + amount : 0 }
          : item
      )
    );
  };

  const handleInputChange = (ProductID, event) => {
    const newQuantity = event.target.value ? Math.max(0, parseInt(event.target.value)) : 0;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.ProductID === ProductID ? { ...item, Quantity: newQuantity } : item
      )
    );
  };


  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.ProductPrice * item.Quantity, 0);
  };


  return (
    <Container id="cart-container">
      <Typography variant="h4" id="cart-title">Your Cart</Typography>
      <Paper id="cartWrapper" elevation={12}>
        <Grid container spacing={2}>
          {cartProductsArray.map((item) => (
            <Grid item xs={12} key={item.ProductID}>
              <Grid className="cart-item">
                <Grid xs={1} sx={{ display: "flex", justifyContent: "center"}}>
                  <RiDeleteBin6Line style={{ fontSize: "1.5em" }} />
                </Grid>
                <Grid xs={6}>
                  <Typography variant="h6">{item.ProductName}</Typography>
                </Grid>
                <Grid xs={2}>
                  <Typography variant="body2">Price: ${item.ProductPrice}</Typography>
                </Grid>
                <Grid xs={2} className="quantity-controls">
                  <IconButton
                    aria-label="reduce quantity"
                    onClick={() => handleQuantityChange(item.ProductID, -1)}
                  >
                    <Remove />
                  </IconButton>
                  <TextField 
                    className="quantity-display"
                    value={item.Quantity}
                    onChange={(event) => handleInputChange(item.ProductID, event)}
                    inputProps={{
                      min: 0,
                      style: {textAlign: "center", width: "10px", height: "10px"}
                    }}
                  />
                  <IconButton
                    aria-label="increase quantity"
                    onClick={() => handleQuantityChange(item.ProductID, 1)}
                  >
                    <Add />
                  </IconButton>
                </Grid>
                <Typography variant="body2">
                  Subtotal: ${(item.ProductPrice * item.Quantity).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box className="cart-footer">
        <Typography variant="h5" className="total-amount">Total: ${getTotal().toFixed(2)}</Typography>
        <Button variant="contained" color="primary" className="checkout-button">
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
}