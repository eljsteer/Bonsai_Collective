// import { Button}  from "@mui/material";
// import { Link } from "react-router-dom"
import "./styles/Footer.css"

import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

//// --- Footer Function and JSX --- ////
export default function Footer() {
  return (
    <div className="footer">
      <div className="res__footer section__padding">
        {/* <div className="res__footer-links">
          <div className="res__footer-links_div">
            <h4>About</h4>
            <Link className="res__footer-links_Link" href="/about">
              <Button>About</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/team">
              <Button>Team</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/testimonials">
              <Button>Testimonials</Button>
            </Link>
          </div>
          <div className="res__footer-links_div">
            <h4>Explore</h4>
            <Link className="res__footer-links_Link" href="/bonzais">
              <Button>Bonzais</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/growers">
              <Button>Growers</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/vintage">
              <Button>Vintage</Button>
            </Link>
          </div>
          <div className="res__footer-links_div">
            <h4>Resources</h4>
            <Link className="res__footer-links_Link" href="/Essentials">
              <Button>Essentials</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/decorations">
              <Button>Decorations</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/delivery">
              <Button>Delivery</Button>
            </Link>
          </div>
          <div className="res__footer-links_div">
            <h4>Contact</h4>
            <Link className="res__footer-links_Link" href="/contact">
              <Button>Contact</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/faqs">
              <Button>FAQs</Button>
            </Link>
            <Link className="res__footer-links_Link" href="/blog">
              <Button>Grow Blog</Button>
            </Link>
          </div>
        </div> */}

      <hr />

      <div className="res__footer-below">
        <div className="res__footer-copyright">
          <p>
            @{new Date().getFullYear()} Eljsteer. All rights reserved.
          </p>
          <div className="res__footer-below-links">
            <a href="/terms"><div><p>Terms & Conditions</p></div></a>
            <a href="/privacy"><div><p>Privacy</p></div></a>
            <a href="/security"><div><p>Security</p></div></a>
          </div>
        </div>
        <div className="res__footer-social_div" style={{alignItems: "center"}}>
          <h4>Coming soon on</h4>
          <div className="socialmedia">
            <FaXTwitter style={{fontSize:"2rem", margin:"2.5px"}}/>
            <FaFacebook style={{fontSize:"2rem", margin:"2.5px"}}/>
            <FaPinterest style={{fontSize:"2rem", margin:"2.5px"}}/>
            <FaInstagram style={{fontSize:"2rem", margin:"2.5px"}}/>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}