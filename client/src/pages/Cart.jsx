import { useContext } from "react";
import { Box, Container, Grid, Typography, IconButton, Button, Paper, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartContext } from "../utils/CartContext";
import './styles/cart.css';

export default function Cart () {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const handleQuantityChange = (ProductID, amount) => {
    setCartProducts((prevCart) => 
      prevCart.map(item => 
        item.ProductID === ProductID
          ? { ...item, Quantity: item.Quantity + amount >= 0 ? item.Quantity + amount : 0 }
          : item
        )
      );
    };

  const handleInputChange = (ProductID, event) => {
    const newQuantity = event.target.value ? Math.max(0, parseInt(event.target.value)) : 0;
    setCartProducts((prevCart) =>
      prevCart.map(item =>
        item.ProductID === ProductID ? { ...item, Quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = (ProductID) => {
    setCartProducts((prevCart) => prevCart.filter(item => item.ProductID !== ProductID));
  };

  const getTotal = () => {
    return cartProducts.reduce((sum, item) => sum + item.ProductPrice * item.Quantity, 0);
  };

  return (
    <Container id="cart-container">
      <Typography variant="h4" id="cart-title">Your Cart</Typography>
      <Paper id="cartWrapper" elevation={12}>
        <Grid container spacing={2}>
          {cartProducts.map((item) => (
            <Grid item xs={12} key={item.ProductID}>
              <Grid className="cart-item">
                <Grid item xs={1} sx={{ display: "flex", justifyContent: "center"}}>
                  <IconButton
                    onClick={() => handleDelete(item.ProductID)}
                  >
                    <RiDeleteBin6Line style={{ fontSize: "1em", color: "black" }} />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{item.ProductName}</Typography>
                </Grid>
                <Grid item xs={2} sx={{ display: "flex", justifyContent: "start"}}>
                  <Typography variant="body2">Price: ${item.ProductPrice}</Typography>
                </Grid>
                <Grid item xs={2} className="quantity-controls" sx={{ display: "flex", justifyContent: "start"}}>
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
                      style: { textAlign: "center", width: "15px", height: "15px" }
                    }}
                  />
                  <IconButton
                    aria-label="increase quantity"
                    onClick={() => handleQuantityChange(item.ProductID, 1)}
                  >
                    <Add />
                  </IconButton>
                </Grid>
                <Typography variant="body2" sx={{ textAlign: "center"}}>
                  Subtotal: ${(item.ProductPrice * item.Quantity).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box className="cart-footer">
        <Typography variant="h5" className="total-amount">Total: ${getTotal().toFixed(2)}</Typography>
        <Button variant="contained" color="success" className="checkout-button">
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
}
