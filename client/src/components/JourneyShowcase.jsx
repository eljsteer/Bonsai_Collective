// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
// import JourneysData from "../utils/jsonData/journeysData.json"
import JourneyShowcaseItem from "./JourneyShowcaseItem"
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BONSAI } from "../utils/queries";
import { UPDATE_BONSAI_IMAGE_URLS } from "../utils/mutations";
import { checkSeedBonsaiImages, fetchBonsaiImages, updateBonsaiImagesInDB } from "../utils/imgLoaders";

import "./styles/journeyshowcase.css"
import { Typography } from "@mui/material";

////-----------------------------------------////
////------ Journey home page component ------////
////-----------------------------------------////
export default function JourneyShowcase() {

  const [exploreBonsai, setExploreBonsai] = useState([]);
  const [emptyBonsaiURL, setEmptyBonsaiURL] = useState(false);
  const [bonsaiImgURLData, setBonsaiImgURLData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateBonsaiImageUrl] = useMutation(UPDATE_BONSAI_IMAGE_URLS);

  const { data, error } = useQuery(QUERY_BONSAI, {
    onCompleted: (data) => {
      console.log('Query completed:', data);
    },
    onError: (error) => {
      console.error('Query error:', error);
    },
  });

    // Fetch bonsai on initial page load
    useEffect(() => {
      if (data && data.allbonsais) {
        const exploreBonsaiData = data.allBonsai;
        setExploreBonsai(exploreBonsaiData);
        setLoading(false);
  
        // Check if there are null productImgUrls
        const hasNullBonsaiImgURL = checkSeedBonsaiImages(exploreBonsaiData);
        setEmptyBonsaiURL(hasNullBonsaiImgURL);
      }
    }, [data]);

      // Fetch Unsplash images and update state if needed
  useEffect(() => {
    async function fetchBonsaiImagesURL() {
      if (emptyBonsaiURL && exploreBonsai.length > 0) {
        try {
          const bonsaiImgURLDataArray = await fetchBonsaiImages(exploreBonsai);
          setBonsaiImgURLData(bonsaiImgURLDataArray);
        } catch (error) {
          console.error("Failed to fetch bonsai images:", error);
        }
      }
    }

    fetchBonsaiImagesURL();
  }, [emptyBonsaiURL, exploreBonsai]);

  // Update product image URLs in the database
  useEffect(() => {
    if (bonsaiImgURLData.length > 0) {
      setLoading(true); // Set loading to true before updating DB
      updateBonsaiImagesInDB(updateBonsaiImageUrl, bonsaiImgURLData).then(() => {
        setLoading(false); // Set loading to false after DB update is complete
      });
    }
  }, [bonsaiImgURLData, updateBonsaiImageUrl]);

  if (error) return `Error! ${error.message}`;


  return (
    <Box id="journeyWrapper">
      <Container className="journeyContainer" sx={{ flexGrow: 1, margin:0, minWidth:"100%"}}>
        <Grid   
          container="true"
          spacing={4}
          sx={{
            display:"flex",
            minWidth: "100%"
          }}
        >
          {loading 
            ? 
          <Typography>Loading</Typography>
            :
              data?.allBonsai?.chapters.map((chapter) => {
                return (
                  <Grid 
                    key={chapter.chapterId}
                    style={{
                      display:"flex",
                    }}
                    className={chapter.chapterId % 2 !== 0 ? "leftSide" : "rightSide"}
                  >
                  <JourneyShowcaseItem 
                    chapterId = {chapter.chapterId} 
                    chapterDescription={chapter.chapterDescription}
                  />
                </Grid>)
              })
            }
        </Grid>
      </Container>
    </Box>
  );
}