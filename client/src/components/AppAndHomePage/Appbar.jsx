import * as React from "react";
import PropTypes from "prop-types";
import {AppBar} from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { IconButton } from "@mui/material";
import { Slide } from "@mui/material";
import { Toolbar } from "@mui/material";
import { useScrollTrigger } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ToolBarContent from "./ToolBarContent";
import BonsaiDrawer from "./BonsaiDrawer";
import "./styles/Header.css"


////---------------------------------------------------------------


////---------------------------------------////
////---------- Appbar component  ----------////
////---------------------------------------////
export default function ResponsiveAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  //------ Hide scroll up arrow on scroll up ------>>
  function HideOnScroll(hideProps) {
    const { children } = hideProps;
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={true} direction="down" in={trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return (
    <Container id="back-to-top-anchor" sx={{ display: "flex", position: "absolute"}}>
      <HideOnScroll>
        <AppBar sx={{backgroundColor: "#C3BCA9"}} component="nav">
          <Toolbar sx={{ justifyContent: "space-between"}}>
            <IconButton 
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className="mobileOpen"
              open={mobileOpen}
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "black"}}
            >
              <MenuIcon />
            </IconButton>
            <ToolBarContent />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav>
        <BonsaiDrawer mobileOpen={ mobileOpen } handleDrawerToggle={ handleDrawerToggle } />
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Container>
  );
}