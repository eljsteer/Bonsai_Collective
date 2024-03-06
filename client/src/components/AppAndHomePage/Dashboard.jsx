
import Box from '@mui/material/Box';
import Button from '@mui/material/Box';


import "./styles/Dashboard.css"
import { Typography } from '@mui/material';

function Dashboard() {
  return (
  <Box sx={{display:"flex", flexDirection:"column", flexGrow: 1, alignItems:"center", justifyContent:"space-between"}} className="headerImage">

    <Box className="welcomeTextContainer">
      <Typography className="welcomeText" sx={{ typography: { xs: "h6", sm: "h5", md: "h4", lg: "h3"} }}>Welcome to Bonzai Collective</Typography>
    </Box>
    <Button className="scrollDownContainer">
        <Box className="scrollDownCircle">
          <div className="circle"></div>
        </Box>
        <img width="50" height="50" src="https://img.icons8.com/ios/50/long-arrow-down.png" alt="long-arrow-down" className="downArrow"/>
      </Button>
  </Box>
  ) 
}

export default Dashboard;