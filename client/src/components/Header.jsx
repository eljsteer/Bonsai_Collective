import ResponsiveAppBar from "./Appbar";
import React from "react";
import { 
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar, 
  IconButton, 
} from "@mui/material";
import ToolBarContent from './ToolBarContent';
import MenuIcon from '@mui/icons-material/Menu';
import "../styles/Header.css"

import bonzaiLogo from "../assets/headerLogo/BonzaiLogo3.png";

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function Header() {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img className="logo" src={bonzaiLogo} style={{ width: 50, height: 50, paddingTop: "auto" }} alt="Bonzai Collective logo" />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <ResponsiveAppBar />
    </div>
  ) 
}

export default Header;