import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import "./styles/featured.css"

export default function FeaturedItem({ item, imageUrl }) {
  return (
      <div className="slide-content">
        <div className="card-wrapper">
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea className="SwiperCardContainer">
              <CardMedia
                className="SwiperCardImage"
                component="img"
                image={imageUrl}
                alt={item.productName}
              />
              <div className="Image_Overlay">
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.productName}
                  </Typography>
                  <Typography variant="body1" color="white">
                    ${item.price}
                  </Typography>
                </CardContent>
                <CardActions style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    component={Link}
                    to={`/products/${item._id}`}
                    variant="outlined"
                    style={{ color: "white", border: "2px solid white" }}
                  >
                    Shop This
                  </Button>
                </CardActions>
              </div>
            </CardActionArea>
          </Card>
        </div>
      </div>
  );
}

FeaturedItem.propTypes = {
  item: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
