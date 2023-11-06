import { Button } from "@mui/material";
import "../styles/Footer.css"

import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="footer">
      <div className="res__footer section__padding">
        <div className="res__footer-links">
          <div className="res__footer-links_div">
            <h4>About</h4>
            <a href="/about">
              <Button>About</Button>
            </a>
            <a href="/team">
              <Button>Team</Button>
            </a>
            <a href="/testimonials">
              <Button>Testimonials</Button>
            </a>
          </div>
          <div className="res__footer-links_div">
            <h4>Explore</h4>
            <a href="/bonzais">
              <Button>Bonzais</Button>
            </a>
            <a href="/growers">
              <Button>Growers</Button>
            </a>
            <a href="/vintage">
              <Button>Vintage</Button>
            </a>
          </div>
          <div className="res__footer-links_div">
            <h4>Resources</h4>
            <a href="/Essentials">
              <Button>Essentials</Button>
            </a>
            <a href="/decorations">
              <Button>Decorations</Button>
            </a>
            <a href="/delivery">
              <Button>Delivery</Button>
            </a>
          </div>
          <div className="res__footer-links_div">
            <h4>Contact</h4>
            <a href="/contact">
              <Button>Contact</Button>
            </a>
            <a href="/faqs">
              <Button>FAQs</Button>
            </a>
            <a href="/blog">
              <Button>Grow Blog</Button>
            </a>
          </div>
        </div>

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