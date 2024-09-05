import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "swiper/element/bundle";
import { Box } from "@mui/material";
// import featuredData from "../utils/jsonData/featuredData.json";
import FeaturedItem from "./FeaturedItem";
import ButtonStyled from "./MainApp/ButtonStyled";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import "./styles/featured.css"


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
    });

    swiperEl.initialize();

    swiperRef.current.initialize();

  }, []);

  const queryImg = "Gardening"

    //// ------ Database Product queries ------>>
    const {error, data} = useQuery(QUERY_PRODUCTS, {
      refetchQueries: [
        {query: QUERY_PRODUCTS}
      ]
    });
  
  //// ------ Assign Products data array to constant ------>>
    const featuredProducts = data?.allProducts || [];
    console.log(featuredProducts)
  
    if(error) {
      if (error) return `Error! ${error.message}`;
    }  

  return (
    <Box id="featuredContainer">
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <swiper-container 
        class="mySwiper"
        ref={swiperRef}
        init="false"
        grabCursor={true}
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-navigation-size": "30px",
          "--swiper-navigation-offset": "20px",
          padding: "50px",
        }}
      >
        {
          featuredProducts.map( item => <FeaturedItem key={item._id} item={item} queryImg={queryImg}/> )
        }
      </swiper-container>
      <ButtonStyled 
          text="View More" 
          borderColor="black"
          hoverColor="white"
          color="black"
          onClick={handleNavigate}
        />
    </Box>
  );
}

export default Featured;