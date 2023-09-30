import * as React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
  } from '@mui/material';


import MenuIcon from '@mui/icons-material/Menu';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import { GiBonsaiTree } from 'react-icons/gi';

import "../styles/Header.css"

////// <<---Images--->>//////
import bonzaiLogo from "../assets/headerLogo/BonzaiLogo1.png";

//// <<----Custom Theme Example---->> //////
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
const pages = ['About', 'Blog','Shop', 'Explore'];
const cartItems = ['Black Rectangle Pot', '5yr Chinese Elm', 'Japanese Red Maple Seeds - 20units','Display Rocks',];

function ResponsiveAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

    const [anchorElUserCart, setAnchorElUserCart] = React.useState(null);

  const handleOpenCartItems = (event) => {
    setAnchorElUserCart(event.currentTarget);
  };

  const handleCloseCartItems = () => {
    setAnchorElUserCart(null);
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

  function HideOnScroll(props) {
    const { children } = props;
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
          <Toolbar >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img className="logo" src={bonzaiLogo} style={{ width: 100, height: 100 }} alt="Bonzai Collective logo" />
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', sm: 'none' },
                justifyContent: "center",
                textAlign: "center",
                flexGrow: 1,
                fontFamily: 'monospace',
                fontSize: "1em",
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BONZAI COLLECTIVE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: "center", }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white'}}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="View Cart">
                <IconButton aria-label='cart' onClick={handleOpenCartItems} sx={{ p: "10px" }}>
                  <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCartOutlinedIcon />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUserCart}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUserCart)}
                onClose={handleCloseCartItems}
              >
                {cartItems.map((cart) => (
                  <MenuItem key={cart} onClick={handleCloseCartItems}>
                    <Typography textAlign="center">{cart}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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