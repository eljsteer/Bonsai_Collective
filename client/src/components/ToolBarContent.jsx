import * as React from 'react';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,

  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
  } from '@mui/material';

import Logout from '@mui/icons-material/Logout';


// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { GiBonsaiTree } from 'react-icons/gi';

import "../styles/Header.css"

////// <<---Images--->>//////
import bonzaiLogo from "../assets/headerLogo/BonzaiLogo2_Title.png";

//// <<----Custom Theme Example---->> //////
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

// const StyledButton = styled(Button)(() => ({
//   '& .MuiButtonBase-root-MuiButton-root': {
//     borderRadius: "0px",
//   },
// }));

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = ['About', 'Blog','Shop', 'Explore'];
const cartItems = ['Black Rectangle Pot', '5yr Chinese Elm', 'Japanese Red Maple Seeds - 20units','Display Rocks',];

function ToolBarContent () {
   //// --- Cart Code--- //// 
    const [anchorElUserCart, setAnchorElUserCart] = React.useState(null);

  const handleOpenCartItems = (event) => {
    setAnchorElUserCart(event.currentTarget);
  };

  const handleCloseCartItems = () => {
    setAnchorElUserCart(null);
  };

 //// --- Settings & Account Code--- //// 
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <img className="logo" src={bonzaiLogo} style={{ width: 100, height: 100 }} alt="Bonzai Collective logo" />
      {/* <Typography
        variant="h5"
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', sm: 'flex' },
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
      </Typography> */}
      <Box className="NavLinks" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: "center", }}>
        {pages.map((page) => (
          <Button
            className="navLinksBttn"
            href={"#"}
            key={page}
            sx={{ mx: 3, fontWeight: "bold", color: "black", borderRadius: "0"}}
          >
            {page}
          </Button>
        ))}
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: "10px" }}>
            <Avatar alt="Remy Sharp" sx={{backgroundColor: "#353d2f" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElUser}
          id="account-menu"
          open={open}
          onClose={handleCloseUserMenu}
          onClick={handleCloseUserMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <Tooltip title="View Cart">
          <IconButton aria-label='cart' onClick={handleOpenCartItems} sx={{ p: "20px" }}>
            <StyledBadge badgeContent={4} color="secondary">
              <GiBonsaiTree style={{ fontSize: "2.5rem", color: "#000" }} />
            </StyledBadge>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          keepMounted
          anchorEl={anchorElUserCart}
          anchorOrigin={{ horizontal: 'right', vertical: 'top'  }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
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
    </>
  );
}

export default ToolBarContent;