import PropTypes from "prop-types";
import { Box } from '@mui/material';
import { CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';


////-------------------------------------------------------------------


///--------------------------------------------------------------////
////------ Product card component - displayed on shop page ------////
////-------------------------------------------------------------////
export default function ProductCard(props) {

  return (
    <Box>
      <Box sx={{ margin: "0px 20px", minWidth: 300, maxWidth: 300, borderRadius: "0" }}>
        <CardActionArea sx={{ flex: '1 0 auto' }}>
          <CardMedia
            component="img"
            height="300px"
            image={props.imageProduct[0]}
            alt="Bonsai Growing Products"
          />
          <CardContent sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography gutterBottom sx={{color:"black", textAlign: "center", fontFamily:"Montserrat, sans-serif", fontWeight:"600"}}>
              {props.productName}
            </Typography>
            <Typography sx={{color:"black", fontFamily:"Montserrat, sans-serif", }}>
              ${props.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
    </Box>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string,
  productName: PropTypes.string,
  productDescription: PropTypes.string,
  price: PropTypes.string,
  imageProduct: PropTypes.arrayOf(PropTypes.string),
};