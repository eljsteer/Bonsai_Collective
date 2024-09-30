import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography } from "@mui/material";

///--------------------------------------------------------------////
//------ Product card component - displayed on shop page ------////
////-------------------------------------------------------------////
export default function ProductCard({ product }) {

  const defaultImgUrl = "https://images.unsplash.com/photo-1529331700525-2e558dc5ecb8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Replace with your preferred default image URL
  const imageUrl = product.productImgUrl || defaultImgUrl;

  return (
    <Box>
      <Box sx={{ margin: "0px 20px", minWidth: 300, maxWidth: 300, borderRadius: "0" }}>
        <CardActionArea sx={{ flex: "1 0 auto" }}>
          <CardMedia
            component="img"
            height="300px"
            image={imageUrl}
            alt="Bonsai Growing Products"
          />
          <CardContent sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography 
              gutterBottom 
              sx={{
                color: "black", 
                textAlign: "center", 
                fontWeight: "600", 
                textDecoration: "none" // Remove underline
              }}
            >
              {product.productName}
            </Typography>
            <Typography 
              sx={{
                color: "black", 
                textDecoration: "none" // Remove underline
              }}
            >
              ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
    </Box>
  );
}

// Define the prop types, but make `productImgUrl` optional
ProductCard.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    productImgUrl: PropTypes.string, // Make this optional
  }).isRequired,
};
