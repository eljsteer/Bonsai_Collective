// import * as React from 'react';
// import PropTypes from 'prop-types';
// import {
//   AppBar,
//   Badge,
//   Box,
//   Button,
//   Container,
//   Divider,
//   Drawer,
//   Fab,
//   Fade,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Menu,
//   MenuItem,
//   styled,
//   Toolbar,
//   Tooltip,
//   Typography,
//   useScrollTrigger,
//   IconButton,
//   } from '@mui/material';

// const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];
// const pages = ['Home', 'About', 'Blog','Shop', 'Explore', 'Blog'];

// function ScrollTop(props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event) => {
//     const anchor = (event.target.ownerDocument || document).querySelector(
//       '#back-to-top-anchor',
//     );

//     if (anchor) {
//       anchor.scrollIntoView({
//         block: 'center',
//       });
//     }
//   };

//   return (
//     <Fade in={trigger}>
//       <Box
//         onClick={handleClick}
//         role="presentation"
//         sx={{ position: 'fixed', bottom: 16, right: 16 }}
//       >
//         {children}
//       </Box>
//     </Fade>
//   );
// }

// ScrollTop.propTypes = {
//   children: PropTypes.element.isRequired,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };


// function ResponsiveAppBar(props) {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   // const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const [mobileOpen, setMobileOpen] = React.useState(false);


//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   // const handleOpenUserMenu = (event) => {
//   //   setAnchorElUser(event.currentTarget);
//   // };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         MUI
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item} disablePadding>
//             <ListItemButton sx={{ textAlign: 'center' }}>
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar sx={{background: "none"}}>
//         <Container component="nav" maxWidth="none" >
//           <Toolbar disableGutters sx ={{display: "flex", flexDirection: "row", margin: "20px"}}>
//             <Box sx={{ flexGrow: 1 ,display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
//               {pagesLeft.map((page) => (
//                 <Button
//                   key={page}
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: 'white', fontSize: "20px", display: 'block' }}
//                 >
//                   {page}
//                 </Button>
//               ))}
//             </Box>
//             <Typography
//               variant="h5"
//               noWrap
//               component="a"
//               href="/"
//               sx={{
//                 mr: 2,
//                 display: { xs: 'none', md: 'flex' },
//                 fontFamily: 'monospace',
//                 fontWeight: 700,
//                 letterSpacing: '.3rem',
//                 color: 'inherit',
//                 textDecoration: 'none',
//               }}
//             >
//             </Typography>
//             <img className="logo" src={bonzaiLogo} style={{ width: 100, height: 100 }} alt="Bonzai Collective logo" />
//             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'left',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'left',
//                 }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//                 sx={{
//                   display: { xs: 'block', md: 'none' },
//                 }}
//               >
//                 {pages.map((page) => (
//                   <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center">{page}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//             <Typography
//               variant="h5"
//               component="a"
//               href="/"
//               sx={{
//                 mr: 2,
//                 display: { xs: 'flex', md: 'none' },
//                 flexGrow: 1,
//                 fontFamily: 'monospace',
//                 fontWeight: 700,
//                 letterSpacing: '.3rem',
//                 color: 'inherit',
//                 textDecoration: 'none',
//               }}
//             >
//             </Typography>
//             <Box sx={{ flexGrow: 1 ,display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
//               {pagesRight.map((page) => (
//                 <Button
//                   key={page}
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: 'white', fontSize: "20px", display: 'block' }}
//                 >
//                   {page}
//                 </Button>
//               ))}
//             </Box>
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="View Cart">
//                 <IconButton aria-label='cart' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <StyledBadge badgeContent={4} color="secondary">
//                     <ShoppingCartOutlinedIcon />
//                   </StyledBadge>
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </Toolbar>
//           <ScrollTop {...props}>
//           <Fab size="small" aria-label="scroll back to top">
//             <KeyboardArrowUpIcon />
//           </Fab>
//         </ScrollTop>
//         </Container>
//       </AppBar>
//       <nav>
//       <Drawer
//         container={container}
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true, // Better open performance on mobile.
//         }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//         }}
//       >
//         {drawer}
//       </Drawer>
//     </nav>
//   </Box>
//   );
// }
// export default ResponsiveAppBar;

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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
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

function ResponsiveAppBar(props) {
  ResponsiveAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUserCart, setAnchorElUserCart] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenCartItems = (event) => {
    setAnchorElUserCart(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseCartItems = () => {
    setAnchorElUserCart(null);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
  <>
    <AppBar component="nav" position="static" 
      // sx={{background: "none"}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img className="logo" src={bonzaiLogo} style={{ width: 100, height: 100 }} alt="Bonzai Collective logo" />
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontSize: "2em",
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BONZAI COLLECTIVE
          </Typography>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              textAlign: "center",
              flexGrow: 1,
              fontFamily: 'monospace',
              fontSize: "0.75em",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BONZAI COLLECTIVE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View Cart">
              <IconButton aria-label='cart' onClick={handleOpenCartItems} sx={{ p: 0 }}>
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
      </Container>
    </AppBar>
    <nav>
      <Drawer
        container={container}
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
    <Toolbar id="back-to-top-anchor" />
  </>
  );
}
export default ResponsiveAppBar;

