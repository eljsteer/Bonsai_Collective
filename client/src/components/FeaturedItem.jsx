import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import "../styles/Featured.css";

const shopImageURL = "https://source.unsplash.com/random/1000x1400/?nature,plants,trees";

function FeaturedItem ({item}) {

  FeaturedItem.propTypes = {
    item: PropTypes.object,
  };

  return (
    <swiper-slide >
    <div className="slide-content">
      <div className="card-wrapper">
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea className="SwiperCardContainer">
            <CardMedia
              className="SwiperCardImage"
              component="img"
              image={shopImageURL}
              alt="green iguana"
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
              <CardActions style={{display:"flex", justifyContent: "center"}}>
                <Button variant="outlined" style={{color: "white", border: "2px solid white"}}>
                  Shop This
                </Button>
              </CardActions>
            </div>
          </CardActionArea>
        </Card>
      </div>
    </div>
  </swiper-slide>
  )
}

export default FeaturedItem;