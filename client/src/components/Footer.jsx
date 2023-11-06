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
              <p>About</p>
            </a>
            <a href="/team">
              <p>Team</p>
            </a>
            <a href="/testimonials">
              <p>Testimonials</p>
            </a>
          </div>
          <div className="res__footer-links_div">
            <h4>Explore</h4>
            <a href="/bonzais">
              <p>Bonzais</p>
            </a>
            <a href="/growers">
              <p>Growers</p>
            </a>
            <a href="/vintage">
              <p>Vintage</p>
            </a>
          </div>
          <div className="res__footer-links_div">
            <h4>Resources</h4>
            <a href="/Essentials">
              <p>Essentials</p>
            </a>
            <a href="/decorations">
              <p>Decorations</p>
            </a>
            <a href="/delivery">
              <p>Delivery</p>
            </a>
          </div>
          <div className="res__footer-links_div">
            <h4>Contact</h4>
            <a href="/contact">
              <p>Contact</p>
            </a>
            <a href="/faqs">
              <p>FAQs</p>
            </a>
            <a href="/blog">
              <p>Grow Blog</p>
            </a>
          </div>
          <div className="res__footer-links_div" style={{textAlign: "center"}}>
            <h4>Coming soon on</h4>
            <div className="socialmedia">
              <FaXTwitter style={{fontSize:"2rem", margin:"2px"}}/>
              <FaFacebook style={{fontSize:"2rem", margin:"2px"}}/>
              <FaPinterest style={{fontSize:"2rem", margin:"2px"}}/>
              <FaInstagram style={{fontSize:"2rem", margin:"2px"}}/>
            </div>
          </div>
        </div>

      <hr />

      <div className="res__footer-below">
        <div className="res__footer-copyright">
          <p>
            @{new Date().getFullYear()} Eljsteer. All rights reserved.
          </p>
        </div>
        <div className="res__footer-below-links">
          <a href="/terms"><div><p>Terms & Conditions</p></div></a>
          <a href="/privacy"><div><p>Privacy</p></div></a>
          <a href="/security"><div><p>Security</p></div></a>
        </div>
      </div>
      </div>
    </div>
  )
}