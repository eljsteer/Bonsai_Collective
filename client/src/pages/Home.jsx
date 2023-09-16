import { Container } from "@mui/material";
import ShopPreview from "../components/shopPreview"
import "../styles/Header.css"

function Home() {
  return (
    <Container className="headerImage">
      <ShopPreview/>
    </Container>
    // <div>
    //   <ShopPreview/>
    // </div>
  ) 
}

export default Home;