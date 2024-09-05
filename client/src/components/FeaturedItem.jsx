import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardActions, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { getRandomPhoto } from "../utils/api";
import "./styles/Featured.css";

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
                image={photoUrl || "fallback-image-url.jpg"}  // Display the fetched image or a fallback
                alt={item.title}
              />
              <div className="Image_Overlay">
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="white">
                    ${item.price}
                  </Typography>
                </CardContent>
                <CardActions style={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="outlined" style={{ color: "white", border: "2px solid white" }}>
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
