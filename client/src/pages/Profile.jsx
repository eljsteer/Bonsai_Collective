import { Link, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';

import { GiTreeBranch } from "react-icons/gi";
import { RiSeedlingFill } from "react-icons/ri";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import UserBonzais from '../components/MyBonzai';

export default function Profile() {
  const {loading, data, error} = useQuery(QUERY_ME);

  if(error) {
    console.log(error);
    return <div>Error loading data</div>;
  }
  
  if (loading) {
    return <div>Profile is Loading...</div>;
  }

  console.log(data)

  const userData = data?.me || [];
  const allUserBonzai = data?.me.userBonzai || [];

  console.log(userData)
  console.log(data)
  console.log(allUserBonzai)

  const profileOptions = [
    {
        id: 0,
        icon: <GiTreeBranch />,
        name: "My Bonzai",
        url: "myBonzai"
    },
    {
        id: 1,
        icon: <RiSeedlingFill />,
        name: "Add Bonzai",
        url: "addBonzai"
    }
  ];


  return (
    <Box sx={{ flexGrow: 1, display:"flex", flexDirection:"column", margin:"5px" }}>
      <Grid container spacing={1}>
        <Grid xs={4} md={2}>
          <Box>
            <CardMedia
              image={userData?.profileImage || "https://source.unsplash.com/random/?profile"}
            >
            </CardMedia>
            <Box>
              {profileOptions.map((option, i) => (
              <Link
                key={i}
                to={`/profile/${option.url}`}
                underline="none"
              >
                <Button key={i} variant="outlined">
                  {option.name}
                </Button>
              </Link>    
              )
              )}
            </Box>
          </Box>
        </Grid>
        <Grid 
          sx={{display: "flex", justifyContent:"center", alignItems:"top"}} 
          // spacing={{ xs: 2, md: 3 }} 
          xs={8} md={10}
        >
          <Outlet/>
        </Grid>
      </Grid>
    </Box>

  );
}