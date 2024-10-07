import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import JourneyShowcaseItem from "./JourneyShowcaseItem";
import { useQuery } from "@apollo/client";
import { QUERY_BONSAI } from "../utils/queries";


import { Typography } from "@mui/material";

import "./styles/journeyshowcase.css";

export default function JourneyShowcase() {
  const [randomBonsaiNum, setRandomBonsaiNum] = useState(null)
  const [loading, setLoading] = useState(true);

  const { data, error } = useQuery(QUERY_BONSAI, {
    onCompleted: (data) => {
      console.log("Query completed:", data.allBonsai[1].chapters);
      setLoading(false)
      randomBonsai()
    },
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  function randomBonsai() {
    let randomNum = Math.floor(Math.random() * data.allBonsai.length);
    setRandomBonsaiNum(randomNum)
  }

  if (error) return `Error! ${error.message}`;

  return (
    <Box id="journeyWrapper">
      <Container className="journeyContainer" sx={{ flexGrow: 1, margin: 0, minWidth: "100%" }}>
        <Grid container spacing={4} sx={{ display: "flex", minWidth: "100%" }}>
          {loading ? (
            <Typography>Loading</Typography>
          ) : (
            // Ensure data exists and handle cases where data is undefined or empty
              data.allBonsai[randomBonsaiNum].chapters.map((chapter) => (
                <Grid
                  key={chapter.chapterId}
                  style={{ display: "flex" }}
                  className={chapter.chapterId % 2 !== 0 ? "leftSide" : "rightSide"}
                >
                  <JourneyShowcaseItem chapter={chapter} />
                </Grid>
              ))
            )
          }
        </Grid>
      </Container>
    </Box>
  );
}
