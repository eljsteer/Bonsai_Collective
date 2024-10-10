import { getRandomPhoto } from "./apiUnsplash";

// 1. Check for null productImgUrl and return true if any exist
export function checkSeedProductImages(items) {
  return items.some(item => item.productImgUrl === null)
} 

// 2. Fetch Unsplash images and map them to products with null URLs
export async function fetchProductImages(shopProducts, queryImg="Gardening Tools") {
  try {
    const fetchedPhotos = await getRandomPhoto(queryImg);
    console.log("Fetched Photos:", fetchedPhotos);
    const photoUrls = fetchedPhotos?.results?.length > 0 
    ? fetchedPhotos.results.map(photo => photo.urls.regular)
    : [];

    // Map Unsplash images to products with null URLs
    const productImgURLDataArray = shopProducts.map((product, index) => ({
      _id: product._id,
      productImgUrl: product.productImgUrl || photoUrls[index] || ""
    }));

    return productImgURLDataArray;
  } catch (error) {
    console.error("Failed to fetch Unsplash photos:", error);
    throw error; // Re-throw the error to handle it in the main component
  }
}

// 3. Update product image URLs using a mutation
export async function updateProductImagesInDB(updateProductImageUrl, productImgURLData) {
  const hasNullUrls = productImgURLData.some(item => !item.productImgUrl);

  
  if (!hasNullUrls) {
    console.log("Null URLs found, updating product images...");
    try {
      console.log("Sending variables for mutation:", {
        updateProductImgUrlData: productImgURLData
      });
      const response = await updateProductImageUrl({
        variables: {
          updateProductImgUrlData: productImgURLData
        }
      });
      console.log("Product image URLs updated successfully:", response);
    } catch (error) {
      console.error("Failed to update product image URLs:", error);
    }
  } else {
    console.log("No null URLs found, not updating Database");
  }
}


//-----------------------------------------------------------------------------------------------------


// 1. Check for null productImgUrl and return true if any exist
export function checkSeedBonsaiImages(items) {
  return items.some(item => item.bonsaiImgUrl === null)
} 

// 2. Fetch Unsplash images and map them to products with null URLs
export async function fetchBonsaiImages(exploreBonsai, queryImg="Bonsai") {
  try {
    // Fetch only as many images as there are missing bonsai images
    const missingImageCount = exploreBonsai.filter(bonsai => !bonsai.bonsaiImgUrl).length;
    const fetchedPhotos = await getRandomPhoto(queryImg, missingImageCount);
    const photoUrls = fetchedPhotos.results.map(photo => photo.urls.regular);

    const bonsaiImgURLDataArray = exploreBonsai.map((bonsai, index) => ({
      _id: bonsai._id,
      bonsaiImgUrl: bonsai.bonsaiImgUrl || photoUrls[index] || "" // Ensure fallback if no URL exists
    }));

    return bonsaiImgURLDataArray;
  } catch (error) {
    console.error("Failed to fetch Unsplash photos:", error);
    throw error;
  }
}


// 3. Update product image URLs using a mutation
export async function updateBonsaiImagesInDB(updateBonsaiImageUrl, bonsaiImgURLData) {
  const hasNullUrls = bonsaiImgURLData.some(item => !item.bonsaiImgUrl);
  
  if (!hasNullUrls) {
    try {
      const response = await updateBonsaiImageUrl({
        variables: {
          updateBonsaiImgUrlData: bonsaiImgURLData
        }
      });
      console.log("Response from DB update:", response);
    } catch (error) {
      console.error("Failed to update bonsai image URLs:", error);
    }
  }
}
