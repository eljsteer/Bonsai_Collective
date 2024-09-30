import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import FeaturedItem from "./FeaturedItem";
import ButtonStyled from "./MainApp/ButtonStyled";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { UPDATE_PRODUCT_IMAGE_URLS } from "../utils/mutations";

import { checkSeedProductImages, fetchProductImages, updateProductImagesInDB } from "../utils/imgLoaders";

import 'swiper/css';
import "./styles/featured.css";

export default function Featured() {
  const navigate = useNavigate();
  const [shopProducts, setShopProducts] = useState([]);
  const [emptyProductURL, setEmptyProductURL] = useState(false);
  const [productImgURLData, setProductImgURLData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperBreakpoint, setSwiperBreakpoint] = useState(1); 
  const [updateProductImageUrl] = useMutation(UPDATE_PRODUCT_IMAGE_URLS);

  const handleNavigate = () => {
    navigate("/products");
  };

  const { data, error } = useQuery(QUERY_PRODUCTS, {
    onCompleted: (data) => {
      console.log('Query completed:', data);
    },
    onError: (error) => {
      console.error('Query error:', error);
    },
  });

  // Fetch products on initial page load
  useEffect(() => {
    if (data && data.allProducts) {
      const shopProductsData = data.allProducts;
      setShopProducts(shopProductsData);
      setLoading(false);

      // Check if there are null productImgUrls
      const hasNullProductImgURL = checkSeedProductImages(shopProductsData);
      setEmptyProductURL(hasNullProductImgURL);
    }
  }, [data]);

  // Fetch Unsplash images and update state if needed
  useEffect(() => {
    async function fetchProductImagesURL() {
      if (emptyProductURL && shopProducts.length > 0) {
        try {
          const productImgURLDataArray = await fetchProductImages(shopProducts);
          setProductImgURLData(productImgURLDataArray);
        } catch (error) {
          console.error("Failed to fetch product images:", error);
        }
      }
    }

    fetchProductImagesURL();
  }, [emptyProductURL, shopProducts]);

  // Update product image URLs in the database
  useEffect(() => {
    if (productImgURLData.length > 0) {
      setLoading(true); // Set loading to true before updating DB
      updateProductImagesInDB(updateProductImageUrl, productImgURLData).then(() => {
        setLoading(false); // Set loading to false after DB update is complete
      });
    }
  }, [productImgURLData, updateProductImageUrl]);

  if (error) return `Error! ${error.message}`;

    // Adjust the number of skeletons based on Swiper's active breakpoint
    const handleBreakpointChange = (swiper) => {
      setSwiperBreakpoint(swiper.params.slidesPerView);
    };

  return (
    <Box id="featuredContainer">
      {/* Render Swiper regardless of loading state */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
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
        onBreakpoint={handleBreakpointChange}
      >
        {/* Render either Skeletons or FeaturedItems */}
        {loading
          ? Array(swiperBreakpoint).fill(null).map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton
                  sx={{ backgroundColor: "#696969", aspectRatio: "366 / 550"}}
                  variant="rounded"
                  width={swiperBreakpoint > 1 ? "100%" : 399}
                  height={swiperBreakpoint > 1 ? "100%" : 399}
                />
              </SwiperSlide>
            ))
          : shopProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <FeaturedItem item={item} productImgUrl={item.productImgUrl} />
              </SwiperSlide>
            ))
        }
      </Swiper>
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