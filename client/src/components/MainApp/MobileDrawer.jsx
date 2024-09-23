import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { Drawer } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material"; 
import { Typography } from "@mui/material"; 
import bonsaiLogo from "../../assets/headerLogo/BonsaiLogo3.png";
import Auth from "../../utils/authClient";


////------------------------------------------------------------------------------


////------------------------------------------------------////
////------ Small screen navigation drawer component ------////
////------------------------------------------------------////
export default function MobileDrawer({ mobileOpen, handleDrawerToggle }) {

  //------- Width of naviagation drawer when in small screen --->>
  const drawerWidth = 300;

  //------- Naviagation data objects ------>>
  const navItems = [
    {
        id: 0,
        name: "HOME",
        url: "/"
    }, {
        id: 1,
        name: "ABOUT",
        url: "/about"
    },
    {
        id: 2,
        name: "SHOP",
        url: "/products"
    },
    {
        id: 3,
        name: "EXPLORE",
        url: "/bonsai"
    },
    {
        id: 4,
        name: "BLOG",
        url: "/blog"
    },
  ];
  
  const loggedInItems = [
    ...navItems,
    {
        id: 5,
        name: "PROFILE",
        url: "/profile/myBonsai"
    },
    {
        id: 6,
        name: "LOGOUT",
        url: "/", 
        onClick: () => Auth.logout()
    }
  ];
  
  const loggedOutItems = [
    ...navItems,
    {
        id: 5,
        name: "LOGIN",
        url: "/login"
    }
  ];


  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <img className="logo" src={bonsaiLogo} style={{ width: 50, height: 50 }} alt="Bonsai Collective logo" />
        <Typography variant="h6" sx={{ my: 2 }}>
          BONSAI COLLECTIVE
        </Typography>
        <Divider />
        <List>
          {(Auth.loggedIn() ? loggedInItems : loggedOutItems).map((item) => (
          <Box key={item.id}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} to={item.url} component={ Link }>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
          </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

MobileDrawer.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};