import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { Button, Card, CardActions, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { getRandomPhoto } from "../utils/api";
import "./styles/featured.css";

export default function FeaturedItem({ item, queryImg }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);   
  
  useEffect(() => {
    async function fetchPhoto() {
      try {
        const data = await getRandomPhoto(queryImg); 
        const randomPhoto = data.results[Math.floor(Math.random() * data.results.length)]; 
        setPhotoUrl(randomPhoto.urls.regular);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch photo:", error);
        setLoading(false);
      }
    }
    fetchPhoto();
  }, [queryImg]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <swiper-slide>
      <div className="slide-content">
        <div className="card-wrapper">
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea className="SwiperCardContainer">
              <CardMedia
                className="SwiperCardImage"
                component="img"
                image={photoUrl}
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
    </swiper-slide>
  );
}

FeaturedItem.propTypes = {
  item: PropTypes.object,
  queryImg: PropTypes.string,
};
