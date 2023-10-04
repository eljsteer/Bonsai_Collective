import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from '@mui/material'

import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

import "../styles/ShopPrev.css"

let shopImageURL = "https://source.unsplash.com/random"

export default function ShopCarousel() {
  return (
    <Container className="slide-container">
      <div className="slide-content">
        <div className="card-wrapper">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={shopImageURL}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
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
    </Container>
  );
}