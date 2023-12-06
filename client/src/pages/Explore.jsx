
import BonzaiItem from "../components/BonzaiItem";
import { Link } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
// import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useQuery } from "@apollo/client";
import { QUERY_BONZAI } from "../utils/queries";

// >>---------------------------------->>
// Explore Page Code
// >>---------------------------------->>

// Page Material UI Theme
// let theme = createTheme();
// theme = responsiveFontSizes(theme);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--ComponentGBColor)",
    ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Explore() {
  const {loading, data} = useQuery(QUERY_BONZAI, {
    refetchQueries: [
      {query: QUERY_BONZAI}
  ]
  });

  const allBonzai = data?.allBonzai || [];
  
  if (loading) {
    return <h2>Bonzai is starting...</h2>;
  }

  // JSX Page Returned
  return (
    <Box>
      <Box sx={{ display:"flex", justifyContent:"center", margin: 2 }}>
          <Typography variant="h3" sx={{margin: 5 }}>BONZAI</Typography>
      </Box>
      <Box sx={{flexGrow: 1,  padding: 2 }}>
        <Grid 
          container 
          sx={{display: "flex", justifyContent:"center", alignItems:"top"}} 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          >
          {allBonzai.map((bonzai, i) => (
            <Box key={i} sx={{ margin:"10px", maxwidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/bonzai/${bonzai._id}`}
                underline="none"
              >
                <BonzaiItem 
                  key={i}
                  title={bonzai.title}                
                  price={bonzai.price}
                  description={bonzai.description}
                  imageBonzai={bonzai.imageBonzai}
            
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