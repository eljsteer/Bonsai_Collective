import { useState } from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material"; 
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ResponsiveAppBar from "./Appbar";
import ToolBarContent from "./ToolBarContent";
import BonsaiDrawer from "./BonsaiDrawer";
import "./styles/header.css"


////-----------------------------------------------------------------


////------------------------------////
////------- Header Function ------////
////------------------------------////
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <div id="cover">
      <AppBar id="staticAppBar" component="nav" position="static">
        <Toolbar sx={{ justifyContent: "space-between"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className="mobileOpen"
            open={mobileOpen}
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <ToolBarContent />         
        </Toolbar>
      </AppBar>
      <nav>
        <BonsaiDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </nav>
      <ResponsiveAppBar />
    </div>
  ) 
}