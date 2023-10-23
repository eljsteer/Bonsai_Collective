import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';

import featuredData from "../utils/featuredData.json";
import FeaturedItem from "./FeaturedItem";

import "../styles/Featured.css"

import { Box, Button } from '@mui/material';

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
      spaceBetween: 40,
      loop: true,
      // pagination: {
      //   clickable: true,
      //   dynamicBullets: true,
      // },
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

    // initialize swiper
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
      <Button id="viewMore" variant="outlined">
        View More
      </Button>
    </Box>
  );
}

export default Featured;