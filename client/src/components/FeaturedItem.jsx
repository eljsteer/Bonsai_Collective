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

const shopImageURL = "https://source.unsplash.com/random";

function FeaturedItem ({item}) {

  FeaturedItem.propTypes = {
    item: PropTypes.object,
  };

  return (
    <swiper-slide >
    <div className="slide-content">
      <div className="card-wrapper">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={shopImageURL}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body1" color="text.primary">
                ${item.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  </swiper-slide>
  )
}

export default FeaturedItem;