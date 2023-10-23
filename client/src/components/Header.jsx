import ResponsiveAppBar from "./Appbar";
import React from "react";
import { AppBar,Toolbar, IconButton, } from "@mui/material";
import ToolBarContent from './ToolBarContent';
import MenuIcon from '@mui/icons-material/Menu';
import "../styles/Header.css"

function Header() {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <div>
      <AppBar className="staticAppBar" sx={{background: "#515b3a"}} component="nav" position="static">
        <Toolbar sx={{ justifyContent: "space-between"}}>
          <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={mobileOpen}
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <ToolBarContent />
        </Toolbar>
      </AppBar>
      <ResponsiveAppBar />
    </div>
  ) 
}

export default Header;