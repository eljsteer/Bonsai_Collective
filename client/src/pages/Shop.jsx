import React from "react";
import PropTypes from "prop-types";

import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2";
import { Button, CardActionArea, CardActions, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

import { FaCartArrowDown } from "react-icons/fa6";


import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      
    },
  },
}));


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

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
    };

function ProductCard(props) {

  ProductCard.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    productDescription: PropTypes.string,
    imageProduct: PropTypes.src,
  };

  return (
    <Card sx={{ margin: "20px", minWidth: 300, maxWidth: 300, borderRadius: "0" }}>
      <CardActionArea sx={{ flex: '1 0 auto' }}>
        <CardMedia
          component="img"
          height="300px"
          image={props.imageProduct}
          alt="green iguana"
        />
        <CardContent sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Typography gutterBottom sx={{textAlign: "center", fontFamily:"20px, Montserrat, sans-serif", fontWeight:"600"}}>
            {props.name}
          </Typography>
          <Typography sx={{fontFamily:"20px, Montserrat, sans-serif", }}>
            ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{display:"flex", justifyContent:"center"}}>
        <Button size="medium" color="success" variant="outlined">
          <FaCartArrowDown style={{fontSize:"20px", marginRight:"5px"}} color="green"/>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

  return (
  <Container>
    <Box sx={{ display:"flex", justifyContent:"center", margin: 2 }}>
      <Typography variant="h3" sx={{margin: 5 }}>Shop</Typography>
    </Box>
    <Box sx={{ padding:"10px 0px", borderTop:"2px Solid Black", borderBottom:"2px Solid Black"  }}>
      <FormControl sx={{ }} variant="standard">
        <NativeSelect
          id="demo-customized-select-native"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
          label="All Products"
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
    </Box>
    <Box sx={{display:"flex", flexDirection:"row"}}>
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
    </Box>
  </Container> 
  );
}
