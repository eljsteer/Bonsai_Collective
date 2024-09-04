import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ButtonStyled from "./MainApp/ButtonStyled";
import "./styles/comingsoon.css"

function ComingSoon() {
  const navigate = useNavigate();
  
  return (
    <Box id="comingSoonIMG">
      <Box id="soonImgOverlay">
        <Typography id="comingSoonText" variant="h1">
          COMING SOON
        </Typography>
        <ButtonStyled 
          text="Return" 
          borderColor="white"
          hoverColor="white"
          color="white"
          onClick={() => navigate(-1)}
        />
      </Box>
    </Box>
  );
}

export default ComingSoon;