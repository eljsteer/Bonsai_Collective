import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/authClient";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import { ListItemButton } from "@mui/material"
import { ListItemIcon } from "@mui/material"
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Tooltip } from "@mui/material";
import { Avatar } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountLinks = [
  {
      id: 0,
      icon: <Avatar sx={{ width: 30, height: 30 }} />,
      name: "Profile",
      url: "/profile"
  },
  {
      id: 1,
      icon: <ManageAccountsIcon />,
      name: "My Account",
      url: "/profile"
  },
];

//// ------ Logged in component ------>>
//// --------------------------------->>
  export default function LoggedIn() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);

  const handleLogout = () => {
    Auth.logout();
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  LoggedIn.propTypes = {
    anchorElUser: PropTypes.object,
  };

    return (
      <Box>
        <Tooltip title="Account Settings">
          <IconButton id="ProfileSettings" onClick={handleOpenUserMenu} sx={{ p: "10px" }}>
            <Avatar alt="Jason Steer" sx={{backgroundColor: "#353d2f" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElUser}
          id="account-menu"
          open={open}
          onClose={handleCloseUserMenu}
          onClick={handleCloseUserMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {AccountLinks.map((item) => (
            <MenuItem key={item.id} 
              onClick={handleCloseUserMenu}
              sx={{display:"flex", flexDirection:"row"}}
            >
              <Link 
                to={`${item.url}`}
                style={{display:"flex", flexWrap:"nowrap", color:"black", textDecoration:"none", fontSize:"1.2rem"}}  
              >
                {item.icon}&nbsp;&nbsp;{item.name}
              </Link>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={handleCloseUserMenu}>
            <Link  style={{textDecoration:"none"}} to="/">
              <ListItemButton onClick={handleLogout} sx={{ color:"black", fontSize:"1.2rem"}}>
                <ListItemIcon>
                  <LogoutIcon 
                    fontSize="small" 
                    style={{color:"black"}}
                  />
                </ListItemIcon>
                Logout
              </ListItemButton>
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    )
  }
