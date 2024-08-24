import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { useQuery } from "@apollo/client";
import { QUERY_BONSAI } from "../utils/queries";
import BonsaiItem from "../components/BonsaiItem";

//// ------ Explore page displaying bonsai's for sale ------>>
//// ------------------------------------------------------->>
export default function Explore() {
  //--- MongoDB query to return all Bonsai --->>
  const {loading, data} = useQuery(QUERY_BONSAI, {
    refetchQueries: [
      {query: QUERY_BONSAI}
  ]
  });
  
  //returns all bonsai if any exist or empty array 
  const allBonsai = data?.allBonsai || [];
  
  if (loading) {
    return <h2>Bonsai is Growing...</h2>;
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
          {allBonsai.map((bonsai, i) => (
            <Box key={i} sx={{ margin:"10px", maxwidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/bonsai/${bonsai._id}`}
                underline="none"
              >
                {/* Bonsai component import */}
                <BonsaiItem 
                  key={i}
                  title={bonsai.title}                
                  price={bonsai.price}
                  description={bonsai.description}
                  imageBonsai={bonsai.imageBonsai}
                />
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