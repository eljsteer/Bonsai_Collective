import * as React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  useScrollTrigger,
  } from '@mui/material';

import "../styles/Header.css"

////// <<---Images--->>//////
import bonzaiLogo from "../assets/headerLogo/BonzaiLogo1.png";
import ToolBarContent from './ToolBarContent';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function ResponsiveAppBar() {
   //// --- Cart Code--- //// 
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
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  function HideOnScroll(hideProps) {
    const { children } = hideProps;
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return (
    <Container id="back-to-top-anchor" sx={{ display: 'flex' }}>
      <HideOnScroll>
        <AppBar sx={{background: "none"}} component="nav">
          <Toolbar sx={{justifyContent: "space-between"}}>
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
      </HideOnScroll>
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
      <Box component="main">
        <Toolbar />
      </Box>
    </Container>
  );
}

export default ResponsiveAppBar;