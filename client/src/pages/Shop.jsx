import PropTypes from "prop-types";

import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2";
import { Button, CardActionArea, CardActions } from '@mui/material';


import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

export default function Shop() {
  const {error, loading, data} = useQuery(QUERY_PRODUCTS, {
    refetchQueries: [
      {query: QUERY_PRODUCTS}
    ]
  });

  const allProducts = data?.allProducts || [];

  console.log(allProducts)

  if (loading) {
    return <h2>Bonzai is Growing...</h2>;
  }

  if(error) {
    if (error) return `Error! ${error.message}`;
  }

function ProductCard(props) {

  ProductCard.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    productDescription: PropTypes.string,
    imageProduct: PropTypes.src,
  };

  return (
    <Card sx={{ margin: "10px", maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={props.imageProduct}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.productDescription}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        View
      </Button>
    </CardActions>
  </Card>
  );
}

  return (
    <Box>
      <Box sx={{ display:"flex", justifyContent:"center", margin: 2 }}>
          <Typography variant="h3" sx={{margin: 5 }}>Shop</Typography>
      </Box>
      <Box sx={{flexGrow: 1,  padding: 2 }}>
        <Grid 
          container 
          sx={{display: "flex", justifyContent:"center", alignItems:"top"}} 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          >
          {allProducts.map((product, i) => (
              <ProductCard 
                key={i}
                name={product.name}
                productDescription={product.productDescription}
                price={product.price}
                imageProduct={product.imageProduct}
              />
            ))
          }
        </Grid>
      </Box>
      <br/>
      <br/>
    </Box>   
  );
}
