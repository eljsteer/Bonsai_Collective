import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { QUERY_BONSAI } from "../utils/queries";
import BonsaiItem from "../components/BonsaiItem";
import LoadingBackdrop from "../components/LoadingBackdrop";

//// ------ Explore page displaying bonsai's for sale ------>>
//// ------------------------------------------------------->>
export default function Explore() {
  //--- MongoDB query to return all Bonsai --->>
  const {error, loading, data} = useQuery(QUERY_BONSAI);
  
  if (loading) {
    return <LoadingBackdrop loadingText={"Spinning up server and growing bonsai..."}/>;
  }

  if(error) {
    if (error) return `Error! ${error.message}`;
  }

  return (
    <Box>
      <Box sx={{ display:"flex", justifyContent:"center", margin: 2 }}>
          <Typography variant="h3" sx={{margin: 5 }}>BONSAI</Typography>
      </Box>
      <Box sx={{flexGrow: 1,  padding: 2 }}>
        <Grid 
          container 
          sx={{display: "flex", justifyContent:"center", alignItems:"top"}} 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          >
          {data?.allBonsai?.map((bonsai) => (
            <Box 
                key={bonsai._id} 
                sx={{ margin:"10px", maxwidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/bonsai/${bonsai._id}`}
                underline="none"
              >
                <BonsaiItem bonsai={bonsai}/>
              </Link>            
            </Box>
          ))}        
        </Grid>
      </Box>
      <br/>
      <br/>
    </Box>    
  );
}