import { useContext } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { CartContext } from "../utils/CartContext";


////----------------------------------------------------


////--------------------------------////
////------ Shopping Cart Page ------////
////--------------------------------////
export default function Checkout () {
  const { cartProducts } = useContext(CartContext);

  let cartProductsArray = cartProducts

  return (
    <Box id="cartContainer">
      {cartProductsArray.map((cart, i) => (
        <Box key={i}>
          <Typography textAlign="center">{cart.ProductID}</Typography>
          <Typography>{cart.Quantity}</Typography>
        </Box>
      ))}
    </Box>
  );
}