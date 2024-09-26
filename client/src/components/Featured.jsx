import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from "@mui/material";
import FeaturedItem from "./FeaturedItem";
import ButtonStyled from "./MainApp/ButtonStyled";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { UPDATE_PRODUCT_IMAGE_URLS } from "../utils/mutations";
import 'swiper/css';
import "./styles/featured.css";
import { getRandomPhoto } from "../utils/apiUnsplash";

export default function Featured() {
  const navigate = useNavigate();
  const [shopProducts, setShopProducts] = useState([]);
  const [emptyProductURL, setEmptyProductURL] = useState(false);
  const [productImgURLData, setProductImgURLData] = useState([]);
  const { error, data } = useQuery(QUERY_PRODUCTS);
  const [updateProductImageUrl] = useMutation(UPDATE_PRODUCT_IMAGE_URLS);

  const handleNavigate = () => {
    navigate("/products");
  };

  // 1. Fetch products on initial page load
  useEffect(() => {
    if (data && data.allProducts) {
      const shopProductsData = data.allProducts;
      setShopProducts(shopProductsData);
      checkSeedProductImages(shopProductsData);  // Check if there are null URLs
    }
  }, [data]);

  // 2. Check for null productImgUrl and set the "emptyProductURL" state
  function checkSeedProductImages(items) {
    const hasNullProductImgURL = items.some(item => item.productImgUrl === null);
    setEmptyProductURL(hasNullProductImgURL);
  }

  // 3. Fetch Unsplash images and update productImgURLData if there are null URLs
  useEffect(() => {
    async function fetchProductImages() {
      if (emptyProductURL && shopProducts.length > 0) {
        const queryImg = "Gardening Tools"; // Example query for Unsplash
        try {
          const fetchedPhotos = await getRandomPhoto(queryImg);
          const photoUrls = fetchedPhotos.results.map(photo => photo.urls.regular);

          // 1. Create a new array "productImgURLData"
          const productImgURLDataArray = shopProducts.map((product, index) => ({
            _id: product._id,
            productImgUrl: product.productImgUrl || photoUrls[index] || ""  // Map the URL to the product, ensure fallback if no URL exists
          }));

          // 2. Set the new array to state
          setProductImgURLData(productImgURLDataArray);
        } catch (error) {
          console.error("Failed to fetch Unsplash photos:", error);
        }
      }
    }

    fetchProductImages();
  }, [emptyProductURL, shopProducts]);

  // 4. Run mutation to update product image URLs in the database once productImgURLData is populated
  useEffect(() => {
    if (productImgURLData.length > 0) {
      // Check if there are any null URLs before updating
      const hasNullUrls = productImgURLData.some(item => !item.productImgUrl);

      if (!hasNullUrls) {
        updateProductImageUrl({
          variables: {
            updateProductImgUrlData: productImgURLData
          }
        })
        .then(() => {
          console.log("Product image URLs updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update product image URLs:", error);
        });
      }
    }
  }, [productImgURLData, updateProductImageUrl]);

  if (error) return `Error! ${error.message}`;

  return (
    <Box id="featuredContainer">
      {shopProducts.length > 0 && (
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
        >
          {shopProducts.map((item) => (
            <SwiperSlide key={item._id}>
              <FeaturedItem item={item} productImgUrl={item.productImgUrl} />
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
