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
export default function BonsaiItem ({ bonsai }) {

  const defaultImgUrl = "https://images.unsplash.com/photo-1561641250-c06551cf3b02?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Replace with your preferred default image URL
  const imageUrl = bonsai.bonsaiImgUrl || defaultImgUrl;

  return (
      <Card sx={{ display: "flex", maxWidth: 400 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardActionArea  sx={{ flex: '1 0 auto' }} className="BonsaiCardContainer">
            <CardMedia 
              className="cardImage"
              component="img"
              image={imageUrl}
              alt="Bonsai Trees"
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
  bonsai: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    bonsaiImgUrl: PropTypes.string,
  }).isRequired,
};