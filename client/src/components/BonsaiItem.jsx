import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import ButtonStyled from "./MainApp/ButtonStyled";
import "./styles/bonsaiItem.css";


////-----------------------------------------------------------------------------


////-------------------------////
////------ Bonsai Item ------////
////-------------------------////
export default function BonsaiItem ({ bonsai, imageUrl}) {

  return (
      <Card sx={{ display: "flex", maxWidth: 400 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardActionArea  sx={{ flex: '1 0 auto' }} className="BonsaiCardContainer">
            <CardMedia 
              className="cardImage"
              component="img"
              image={imageUrl}
            />
            <div className="Image_Overlay">
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {bonsai.title}
                </Typography>
                <Typography variant="body1" color="white">
                  ${bonsai.price}
                </Typography>
              </CardContent>
              <CardActions style={{display:"flex", justifyContent: "center"}}>
                <ButtonStyled text="View My Story" borderColor="white"/>
              </CardActions>
            </div>
            {/* <div>
              <Typography variant="body1" color="black">
                {bonsai.description}
              </Typography>
            </div> */}
          </CardActionArea> 
        </Box>
      </Card>
  )
}

BonsaiItem.propTypes = {
  bonsai: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
};