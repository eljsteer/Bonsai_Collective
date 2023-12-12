

import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import PropTypes from "prop-types";
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import { FaCartArrowDown } from 'react-icons/fa';

export default function ProductCard(props) {

  ProductCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    productDescription: PropTypes.string,
    price: PropTypes.string,
    imageProduct: PropTypes.src,
  };

  return (
    <Box>
      <Box sx={{ margin: "0px 20px", minWidth: 300, maxWidth: 300, borderRadius: "0" }}>
        <CardActionArea sx={{ flex: '1 0 auto' }}>
          <CardMedia
            component="img"
            height="300px"
            image={props.imageProduct}
            alt="Bonzai Growing Products"
          />
          <CardContent sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography gutterBottom sx={{textAlign: "center", fontFamily:"Montserrat, sans-serif", fontWeight:"600"}}>
              {props.name}
            </Typography>
            <Typography sx={{fontFamily:"Montserrat, sans-serif", }}>
              ${props.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
      <CardActions sx={{display:"flex", justifyContent:"center"}}>
          <Button size="medium" color="success" variant="outlined">
            <FaCartArrowDown style={{fontSize:"20px", marginRight:"5px"}} color="green"/>
            Add to Cart
          </Button>
      </CardActions>
    </Box>
  );
}