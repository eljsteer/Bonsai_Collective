import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';

import featuredData from "../utils/featuredData.json";
import FeaturedItem from "./FeaturedItem";

import "../styles/Featured.css"

// import { Navigation } from "swiper";

import { Box } from '@mui/material';

function Featured() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    // Add event listener
    swiperRef.current.addEventListener('slidechange', (e) => {
      console.log(e.detail);
    });

    // Object with parameters
    const swiperParams = {
      // or pass it in on
      on: {
        slideChange(s) {
          console.log(s);
        },
      },
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, swiperParams);

    const swiperEl = document.querySelector('swiper-container')
    Object.assign(swiperEl, {
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },
    });
    swiperEl.initialize();

    // initialize swiper
    swiperRef.current.initialize();
  }, []);

  return (
    <Box className="featuredContainer">
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
          "--swiper-navigation-color": "black",
          "--swiper-navigation-size": "30px",
          "--swiper-navigation-sides-offset": "10px",
          padding: "20px"
        }}
      >
        {
            featuredData.map( item => <FeaturedItem key={item.id} item={item} /> )
        }
      </swiper-container>
    </Box>
  );
}

export default Featured;