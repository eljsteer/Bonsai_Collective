import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Box } from "@mui/material";
import FeaturedItem from "./FeaturedItem";
import ButtonStyled from "./MainApp/ButtonStyled";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./styles/featured.css";
import { getRandomPhoto } from "../utils/apiUnsplash";

export default function Featured() {
  const queryImg = "Gardening";
  const navigate = useNavigate();
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const { error, data } = useQuery(QUERY_PRODUCTS);

  const handleNavigate = () => {
    navigate("/products");
  };

  useEffect(() => {
    async function fetchData() {
      if (!data || !data.allProducts) return;
      try {
        const fetchedPhotos = await getRandomPhoto(queryImg);

        const featuredProducts = data?.allProducts || [];
        if (featuredProducts.length && fetchedPhotos.results.length) {
          const combined = featuredProducts.map((product, index) => ({
            ...product,
            imageUrl: fetchedPhotos.results[index]?.urls?.regular || "", 
          }));
          setfeaturedProducts(combined);
        }
      } catch (error) {
        console.error("Failed to fetch photo:", error);
      }
    }
    fetchData();
  }, [data]);

  if (error) return `Error! ${error.message}`;

  // Conditional rendering to only show the Swiper once products are loaded
  return (
    <Box id="featuredContainer">
      {featuredProducts.length > 0 && (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints = {{
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="mySwiper"
        >
          {featuredProducts.map((item) => (
            <SwiperSlide key={item._id}>
              <FeaturedItem item={item} imageUrl={item.imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
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
