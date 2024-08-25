import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "swiper/element/bundle";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import featuredData from "../../utils/jsonData/featuredData.json";
import FeaturedItem from "./FeaturedItem";
import "./styles/Featured.css"


////--------------------------------------------------------////
////---------- Featured products swuiper function ----------////
////--------------------------------------------------------////
function Featured() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  }

  useEffect(() => {
    //------ Register to start Swiper web component ------>>
    register();

    //------ Add event listener ------>>
    swiperRef.current.addEventListener("slidechange", (e) => {
      console.log(e.detail);
    });

    //------ Swiper details parameters to apply on slide change ----->> 
    const swiperParams = {
      on: {
        slideChange(s) {
          console.log(s);
        },
      },
    };

    Object.assign(swiperRef.current, swiperParams);

    //------- Swiper element settings and breakpoints ------>>
    const swiperEl = document.querySelector("swiper-container")
    Object.assign(swiperEl, {
      spaceBetween: 40,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            background-color: #515b3a;
            padding: 8px 18px;
            border-radius: 100%;
          },
      `,
      ],
    });
    swiperEl.initialize();

    swiperRef.current.initialize();
  }, []);


  return (
    <Box id="featuredContainer">
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <swiper-container 
        class="mySwiper"
        ref={swiperRef}
        init="false"
        grabCursor={true}
        navigation = {{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-navigation-size": "30px",
          "--swiper-navigation-offset": "20px",
          padding: "50px",
        }}
      >
        {
            featuredData.map( item => <FeaturedItem key={item.id} item={item} /> )
        }
      </swiper-container>
      <Button id="viewMore" variant="outlined" onClick={handleNavigate}>
        View More
      </Button>
    </Box>
  );
}

export default Featured;