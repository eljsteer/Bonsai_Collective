import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import "../styles/Explore.css";


////-----------------------------------------------------------------------------


////-------------------------////
////------ Bonsai Item ------////
////-------------------------////
export default function BonsaiItem (props) {

  return (
      <Card sx={{ display: "flex", maxWidth: 400 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardActionArea  sx={{ flex: '1 0 auto' }} className="BonsaiCardContainer">
            <CardMedia 
              className="cardImage"
              component="img"
              image={props.imageBonsai[0]}
            />
            <div className="Image_Overlay">
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {props.title}
                </Typography>
                <Typography variant="body1" color="white">
                  ${props.price}
                </Typography>
              </CardContent>
              <CardActions style={{display:"flex", justifyContent: "center"}}>
                <Button variant="outlined" style={{color: "white", border: "2px solid white"}}>
                  View my Story
                </Button>
              </CardActions>
            </div>
            <div>
              <Typography variant="body1" color="black">
                {props.description}
              </Typography>
            </div>
          </CardActionArea> 
        </Box>
      </Card>
  )
}

BonsaiItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  imageBonsai: PropTypes.arrayOf(PropTypes.string),
};