const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

//// ---------------------------------------------------------------------------------////
//// ------ Function to return random Unsplash photo based on random query prop ------////
//// ---------------------------------------------------------------------------------////
export const getRandomPhoto = async (queryImg, perPage = 30) => {
  try {
    const response = await fetch(`${UNSPLASH_BASE_URL}/search/photos?orientation=portrait&query=${queryImg}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      mode: "cors"
    });

    if (!response.ok) {
      throw new Error("Network response not OK")
    }

    const data = await response.json()

    console.log(data);
    return data;
    
  } catch (error) {
    console.log("Fetch Error: ", error);
    throw error
  }
}