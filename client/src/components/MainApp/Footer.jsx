import { Box, Typography}  from "@mui/material";
// import { Link } from "react-router-dom"
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import "./styles/footer.css"

////------------------------------////
////------ Footer component ------////
////------------------------------////
export default function Footer() {
  return (
    <Box className="footer">
      <Box className="res__footer section__padding">
      <hr />
      <Box className="res__footer-below">
        <Box className="res__footer-copyright">
          <Typography>
            @{new Date().getFullYear()} Eljsteer. All rights reserved.
          </Typography>
          <Box className="res__footer-below-links">
            <a href="/about"><Box><Typography>About</Typography></Box></a>
            <a href="/blog"><Box><Typography>Blog</Typography></Box></a>
            <a href="/Terms"><Box><Typography>Terms</Typography></Box></a>
          </Box>
        </Box>
        <Box className="res__footer-social" style={{alignItems: "center"}}>
          <h4>Coming soon on</h4>
          <Box id="socialmedia">
            <FaXTwitter style={{fontSize:"2rem", margin:"2.5px"}}/>
            <FaFacebook style={{fontSize:"2rem", margin:"2.5px"}}/>
            <FaPinterest style={{fontSize:"2rem", margin:"2.5px"}}/>
            <FaInstagram style={{fontSize:"2rem", margin:"2.5px"}}/>
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  )
}