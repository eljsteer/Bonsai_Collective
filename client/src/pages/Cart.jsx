import { useContext } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { CartContext } from "../utils/CartContext";


////----------------------------------------------------


////--------------------------------////
////------ Shopping Cart Page ------////
////--------------------------------////
export default function Cart () {
  const { cartProducts } = useContext(CartContext);

  let cartProductsArray = cartProducts

  return (
    <Box>
          {cartProductsArray.map((cart, i) => (
            <Box id="cartContainer" key={i}>
              <Typography textAlign="center">{cart.ProductID}</Typography>
              <Typography>{cart.Quantity}</Typography>
            </Box>
          ))}
      </Box>
  );
}