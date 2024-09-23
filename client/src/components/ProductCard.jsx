import PropTypes from "prop-types";
import { Box } from '@mui/material';
import { CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';


////-------------------------------------------------------------------


///--------------------------------------------------------------////
////------ Product card component - displayed on shop page ------////
////-------------------------------------------------------------////
export default function ProductCard({ product, imageUrl}) {

  return (
    <Box>
      <Box sx={{ margin: "0px 20px", minWidth: 300, maxWidth: 300, borderRadius: "0" }}>
        <CardActionArea sx={{ flex: '1 0 auto' }}>
          <CardMedia
            component="img"
            height="300px"
            image={imageUrl}
            alt="Bonsai Growing Products"
          />
          <CardContent sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography gutterBottom sx={{color:"black", textAlign: "center", fontWeight:"600"}}>
              {product.productName}
            </Typography>
            <Typography sx={{color:"black" }}>
              ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
    </Box>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
};