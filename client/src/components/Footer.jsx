import { Box, Container, Divider, List, ListItem } from "@mui/material";

import "../styles/Footer.css"

////// <<---Images--->>//////
import bonzaiLogo from "../assets/headerLogo/BonzaiLogo1.png";


export default function Footer() {
  return(
    <Box sx={{background:"#282e23"}}>
      <Container id="FooterContainer" sx={{background:"#282e23"}}>
        <img className="logo" src={bonzaiLogo} style={{ flexShrink: 1, width: 100, height: 100 }} alt="Bonzai Collective logo" />
        <List className="footerNavList" >
          <ListItem className="nav-item"><a href="#" className>Home</a></ListItem>
          <ListItem className="nav-item"><a href="#" className>Features</a></ListItem>
          <ListItem className="nav-item"><a href="#" className>Pricing</a></ListItem>
          <ListItem className="nav-item"><a href="#" className>FAQs</a></ListItem>
          <ListItem className="nav-item"><a href="#" className>About</a></ListItem>
        </List>
        <Divider style={{ width: "100vw", border: "1px solid #fff" }}  />
        <p style={{ textAlign: "center", color:"#fff" }}>© 2023 JasonSteer</p>
      </Container>
    </Box>
  )
}