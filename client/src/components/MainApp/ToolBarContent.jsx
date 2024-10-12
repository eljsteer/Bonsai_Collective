import PropTypes from "prop-types";
import { useContext, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import Auth from "../../utils/authClient"
import LoggedIn from "./LoggedIn"
import NotLoggedIn from "./NotLoggedIn"
import CartIcon from "./CartIcon";
import { CartContext } from "../../utils/CartContext";

import "./styles/header.css";

//// ------ Image imports------>>
import bonsaiLogo from "../../assets/headerLogo/BonsaiLogo2_Title.png";


// ------------------------------------------------------------------------------

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
      url: "/bonsai"
  }
];

////----------------------------------------------////
////------ Appbar toolbar content component ------////
////----------------------------------------------////
export default function ToolBarContent ({ anchorElUser }) {
  const { setCartIconAsAnchor } = useContext(CartContext);

  // Create a ref for the CartIcon button
  const cartIconRef = useRef(null);

    // When the component mounts, set CartIcon as the anchor
    useEffect(() => {
      if (cartIconRef.current) {
        setCartIconAsAnchor(cartIconRef.current); // Pass the CartIcon DOM element to the context
      }
    }, [setCartIconAsAnchor]);

  return (
    <>
      <Link to="/">
        <img className="logo" src={bonsaiLogo} style={{ width: 100, height: 100 }} alt="Bonsai Collective logo" />
      </Link>
      <Box className="NavLinks" sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center", }}>
        {navLinks.map((navlink) => (
          <Button
            id="navLinksBttn"
            href={navlink.url}
            key={navlink.id}
            sx={{ mx: { sm: 0, md: 2, lg: 6}, fontSize:{sm: "1.1rem", md: "1.4rem", lg: "1.7rem"}, fontWeight: "500", }}
          >
            {navlink.name}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems: "center"}}>
        { (Auth.loggedIn() ? <LoggedIn anchorElUser={anchorElUser}/> : <NotLoggedIn/>)}
        <CartIcon ref={cartIconRef}/>
      </Box>
    </>
  );
}

ToolBarContent.propTypes = {
  anchorElUser: PropTypes.object,
};