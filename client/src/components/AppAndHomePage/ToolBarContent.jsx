import * as React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "@mui/material";
import { Badge } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import { Typography } from "@mui/material";
import { ListItemButton } from "@mui/material";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { getSavedCartProducts } from "../../utils/localStorage"

// import { useQuery } from "@apollo/client";
// import { QUERY_ME } from "../utils/queries";
import LogoutIcon from "@mui/icons-material/Logout";
import Auth from "../../utils/authClient";

// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { GiBonsaiTree } from "react-icons/gi";

import "./styles/Header.css"

////// <<---Images--->>//////
import bonzaiLogo from "../../assets/headerLogo/BonzaiLogo2_Title.png";

//// <<----Custom Theme Example---->> //////
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

// const StyledButton = styled(Button)(() => ({
//   "& .MuiButtonBase-root-MuiButton-root": {
//     borderRadius: "0px",
//   },
// }));

const navLinks = [
  {
      id: 0,
      name: "About",
      url: "/about"
  },
  {
      id: 1,
      name: "Blog",
      url: "/blog"
  },
  {
      id: 2,
      name: "Shop",
      url: "/products"
  },
  {
      id: 3,
      name: "Explore",
      url: "/bonzai"
  }
];

const AccountLinks = [
  {
      id: 0,
      icon: <Avatar sx={{ width: 30, height: 30 }} />,
      name: "Profile",
      url: "/profile"
  },
  {
      id: 1,
      icon: <ManageAccountsIcon />,
      name: "My Account",
      url: "/profile"
  },
];

// const cartItems = ["Black Rectangle Pot", "5yr Chinese Elm", "Japanese Red Maple Seeds - 20units","Display Rocks",];


////-----------------------------------------------////
////<<-------- Toolbar Component Function -------->>////
////-----------------------------------------------////
function ToolBarContent () {

  let cartProductsArray = []
  // const { data} = useQuery(QUERY_ME);
  // const userName = `${data.me.firstName} ${ data.me.lastName}`

  //// --- Cart Code--- //// 
  const [anchorElUserCart, setAnchorElUserCart] = React.useState(null);

  const handleOpenCartItems = (event) => {
    if(cartProductsArray.length === 0) {
      return;
    } else {
      setAnchorElUserCart(event.currentTarget);
    }
  };

  const handleNumCartItems = () => {
    const numCartItems = cartProductsArray.length;
    return numCartItems;
  }

  const handleCloseCartItems = () => {
    setAnchorElUserCart(null);
  };

  const handleLogout = () => {
    Auth.logout();
  }

  function retrieveCartProducts() {
    const cartProducts = getSavedCartProducts();
    return cartProducts;
  }

  cartProductsArray = retrieveCartProducts();

  function LoggedIn() {
     // --- Settings & Account Code--- //// 
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorElUser);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return (
      <Box>
        <Tooltip title="Account Settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: "10px" }}>
            <Avatar alt="Jason Steer" sx={{backgroundColor: "#353d2f" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElUser}
          id="account-menu"
          open={open}
          onClose={handleCloseUserMenu}
          onClick={handleCloseUserMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {AccountLinks.map((item) => (
            <MenuItem key={item.id} 
              onClick={handleCloseUserMenu}
              sx={{display:"flex", flexDirection:"row"}}
            >
              <Link 
                to={`${item.url}`}
                style={{display:"flex", flexWrap:"nowrap", color:"black", textDecoration:"none", fontFamily:"Montserrat,sans-serif", fontSize:"1.2rem"}}  
              >
                {item.icon}&nbsp;&nbsp;{item.name}
              </Link>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={handleCloseUserMenu}>
            <Link  style={{textDecoration:"none"}} to="/">
              <ListItemButton onClick={handleLogout} sx={{ color:"black", fontFamily:"Montserrat,sans-serif", fontSize:"1.2rem"}}>
                <ListItemIcon>
                  <LogoutIcon 
                    fontSize="small" 
                    style={{color:"black"}}
                  />
                </ListItemIcon>
                Logout
              </ListItemButton>
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    )
  }

  function NotLoggedIn() {
    return (
      <Link to="/login">
        <Button
          className="navLinksBttn"
          sx={{fontFamily:"Montserrat, sans-serif", fontSize:{sm: "0.7rem", md: "0.9rem", lg: "1.1rem"}, fontWeight: "600", color: "black", height:"fit-content"}}>
            LOGIN
        </Button>
      </Link>
    )
  }

  return (
    <>
      <Link to="/">
        <img className="logo" src={bonzaiLogo} style={{ width: 100, height: 100 }} alt="Bonzai Collective logo" />
      </Link>

      {/* <Typography
        variant="h5"
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          textAlign: "center",
          flexGrow: 1,
          fontFamily: "monospace",
          fontSize: "1em",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        BONZAI COLLECTIVE
      </Typography> */}
      <Box className="NavLinks" sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center", }}>
        {navLinks.map((navlink) => (
          <Button
            className="navLinksBttn"
            href={navlink.url}
            key={navlink.id}
            sx={{ mx: { sm: 0, md: 2, lg: 6}, fontFamily:"Montserrat, sans-serif",fontSize:{sm: "1.1rem", md: "1.4rem", lg: "1.7rem"}, fontWeight: "400", color: "black", borderRadius: "0"}}
          >
            {navlink.name}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems: "center"}}>
        { (Auth.loggedIn() 
          ? 
          <LoggedIn/>
          : 
          <NotLoggedIn/>)
        }
        <Tooltip title="View Cart">
          { cartProductsArray.length === 0 
            ?
            <IconButton aria-label="cart" onClick={handleOpenCartItems} sx={{ p: "20px" }}>
                <GiBonsaiTree style={{ fontSize: "2.5rem", color: "#000" }} />
            </IconButton>
            :
            <IconButton aria-label="cart" onClick={handleOpenCartItems} sx={{ p: "20px" }}>
              <StyledBadge badgeContent={handleNumCartItems} color="secondary">
                <GiBonsaiTree style={{ fontSize: "2.5rem", color: "#000" }} />
              </StyledBadge>
            </IconButton>
          }
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          keepMounted
          anchorEl={anchorElUserCart}
          anchorOrigin={{ horizontal: "right", vertical: "top"  }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          open={Boolean(anchorElUserCart)}
          onClose={handleCloseCartItems}
        >
          {cartProductsArray.map((cart) => (
            <MenuItem key={cart} onClick={handleCloseCartItems}>
              <Typography textAlign="center">{cart}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}

export default ToolBarContent;