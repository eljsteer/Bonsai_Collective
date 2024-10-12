import PropTypes from "prop-types";
import { useContext, forwardRef } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Tooltip } from "@mui/material";
import { Typography } from "@mui/material";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GiBonsaiTree } from "react-icons/gi";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import { CartContext } from "../../utils/CartContext";

// ------ Material UI custom styled component ----->>
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

// ------ CartIcon component with forwardRef ------->>
const CartIcon = forwardRef((props, ref) => {
  const { 
    cartProducts, 
    isCartMenuOpen, 
    closeCartMenu, 
    productAdded, 
    anchorElUserCart 
  } = useContext(CartContext);

  // ------ Function to query and return single products for cart ------>>
  const { data, error } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productAdded },
    skip: !productAdded
  });

  let singleProductAdded = data?.singleProduct || {};
  if (error) return <div>Error: {error.message}</div>;


  const handleCloseCartItems = () => {
    closeCartMenu();
  };

  const handleNumCartItems = () => {
    return cartProducts.length;
  };

  return (
    <Box>
      <Tooltip title="View Cart">
        {cartProducts.length === 0 ? (
          <IconButton component={Link} aria-label="cart" sx={{ p: "20px" }} to="/checkout" ref={ref}>
            <GiBonsaiTree style={{ fontSize: "2.5rem", color: "#000" }} />
          </IconButton>
        ) : (
          <IconButton component={Link} aria-label="cart" sx={{ p: "20px" }} to="/checkout" ref={ref}>
            <StyledBadge badgeContent={handleNumCartItems()} color="secondary">
              <GiBonsaiTree style={{ fontSize: "2.5rem", color: "#000" }} />
            </StyledBadge>
          </IconButton>
        )}
      </Tooltip>
      <Menu
        sx={{ mt: "85px"}}
        id="menu-cart"
        anchorEl={anchorElUserCart}
        open={Boolean(anchorElUserCart) && isCartMenuOpen}
        onClose={handleCloseCartItems}
        disableScrollLock={true}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography sx={{ padding: "16px"}}>{singleProductAdded.productName}</Typography>
        <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
          <Link 
            to="/checkout"
            style={{ textDecoration: "none", color: "black", fontSize: "1.2rem" }}
          >
            Go to Checkout
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
});

// Add displayName for better debugging and DevTools usage
CartIcon.displayName = "CartIcon";

// PropTypes validation for CartIcon props
CartIcon.propTypes = {
  cartProducts: PropTypes.array,
  isCartMenuOpen: PropTypes.bool,
  closeCartMenu: PropTypes.func,
  productAdded: PropTypes.string,
  anchorElUserCart: PropTypes.object,
  setAnchorElUserCart: PropTypes.func,
};

export default CartIcon;
