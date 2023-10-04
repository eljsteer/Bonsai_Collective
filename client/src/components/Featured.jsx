import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';

import "../styles/Featured.css"

const sliderImageURL = "https://source.unsplash.com/random"

export default function App() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    // Add event listener
    swiperRef.current.addEventListener('slidechange', (e) => {
      console.log(e.detail);
    });

    // Object with parameters
    const params = {
      // or pass it in on
      on: {
        slideChange(s) {
          console.log(s);
        },
      },
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    const swiperEl = document.querySelector('swiper-container')
    Object.assign(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      },
    });
    swiperEl.initialize();

    // initialize swiper
    swiperRef.current.initialize();
  }, []);

  return (
    <swiper-container class="mySwiper" init="false" ref={swiperRef}>
      <swiper-slide >
        <img src={sliderImageURL} style={{ width: 200, height: 200, }} />
      </swiper-slide>
      <swiper-slide >
        <img src={sliderImageURL} style={{ width: 200, height: 200, }} />
      </swiper-slide>
      <swiper-slide >
        <img src={sliderImageURL} style={{ width: 200, height: 200, }} />
      </swiper-slide>
    </swiper-container>
  );
}