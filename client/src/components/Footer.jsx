import { Container, Divider, List, ListItem } from "@mui/material";

import "../styles/Footer.css"

////// <<---Images--->>//////
import bonzaiLogo from "../assets/headerLogo/BonzaiLogo1.png";


export default function Footer() {
  return(
    <Container id="FooterContainer" >
      <img className="logo" src={bonzaiLogo} style={{ flexShrink: 1, width: 100, height: 100 }} alt="Bonzai Collective logo" />
      <List className="footerNavList" >
        <ListItem className="nav-item"><a href="#" className>Home</a></ListItem>
        <ListItem className="nav-item"><a href="#" className>Features</a></ListItem>
        <ListItem className="nav-item"><a href="#" className>Pricing</a></ListItem>
        <ListItem className="nav-item"><a href="#" className>FAQs</a></ListItem>
        <ListItem className="nav-item"><a href="#" className>About</a></ListItem>
      </List>
      <Divider style={{ width: "100%", border: "1px solid black" }}  />
      <p style={{ textAlign: "center" }}>© 2023 JasonSteer</p>
    </Container>
  )
}