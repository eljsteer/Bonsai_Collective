import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GrowerBio from "../components/GrowerBio";


////--------------------------------------------------


////---------------------------------////
////------ Bonsai profile page ------////
////---------------------------------////
export default function ProfileBonsai() {

  return (
    <Box sx={{ flexGrow: 1, display:"flex", flexDirection:"column", margin:"5px" }}>
      <Grid container spacing={1}>
        <Grid xs={4} md={2}>
          <GrowerBio/>
        </Grid>
        <Grid 
          id="ProfileBonsaiWindow"
          sx={{display: "flex", justifyContent:"center"}} 
          xs={8} md={10}
        >
          <Outlet/>
        </Grid>
      </Grid>
    </Box>
  );
}