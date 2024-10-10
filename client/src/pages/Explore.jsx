import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BONSAI } from "../utils/queries";
import { UPDATE_BONSAI_IMAGE_URLS } from "../utils/mutations";
import { checkSeedBonsaiImages, fetchBonsaiImages, updateBonsaiImagesInDB } from "../utils/imgLoaders";
import BonsaiItem from "../components/BonsaiItem";
import LoadingBackdrop from "../components/LoadingBackdrop";

// ------ Explore page displaying bonsai's for sale ------>
export default function Explore() {
  const [exploreBonsai, setExploreBonsai] = useState([]);
  const [bonsaiImgURLData, setBonsaiImgURLData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateBonsaiImageUrl] = useMutation(UPDATE_BONSAI_IMAGE_URLS);

  const { data, error, refetch } = useQuery(QUERY_BONSAI, {
    onCompleted: (data) => {
      console.log('Query completed:', data);
    },
    onError: (error) => {
      console.error('Query error:', error);
    },
  });

  // Fetch bonsai data on initial load and check for missing images
  useEffect(() => {
    if (data && data.allBonsai) {
      const exploreBonsaiData = data.allBonsai;
      setExploreBonsai(exploreBonsaiData);
      setLoading(false);

      const hasNullBonsaiImgURL = checkSeedBonsaiImages(exploreBonsaiData);
      // Fetch images only if there are missing bonsai URLs
      if (hasNullBonsaiImgURL) {
        fetchBonsaiImagesURL(exploreBonsaiData);
      }
    }
  }, [data]);

  // Function to fetch bonsai images
  const fetchBonsaiImagesURL = async (exploreBonsai) => {
    if (exploreBonsai.length > 0) {
      try {
        const bonsaiImgURLDataArray = await fetchBonsaiImages(exploreBonsai);
        setBonsaiImgURLData(bonsaiImgURLDataArray);
      } catch (error) {
        console.error("Failed to fetch bonsai images:", error);
      }
    }
  };

  // Update product image URLs in the database
  useEffect(() => {
    if (bonsaiImgURLData.length > 0) {
      console.log("Bonsai image URL data to be sent to DB:", bonsaiImgURLData);
      setLoading(true); // Set loading to true before updating DB
      updateBonsaiImagesInDB(updateBonsaiImageUrl, bonsaiImgURLData).then(() => {
        console.log(bonsaiImgURLData);
        refetch();  // Fetch the updated data
        setLoading(false); // Set loading to false after DB update is complete
      });
    }
  }, [bonsaiImgURLData, updateBonsaiImageUrl, refetch]);

  if (loading) {
    return <LoadingBackdrop loadingText={"Spinning up server and growing bonsai..."} />;
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <Typography variant="h3" sx={{ margin: 5 }}>BONSAI</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", alignItems: "top" }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {exploreBonsai.map((bonsai) => (
            <Box
              key={bonsai._id}
              sx={{ margin: "10px", maxWidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/bonsai/${bonsai._id}`}
                underline="none"
              >
                <BonsaiItem bonsai={bonsai} />
              </Link>
            </Box>
          ))}
        </Grid>
      </Box>
      <br />
      <br />
    </Box>
  );
}
