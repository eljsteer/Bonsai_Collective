import { useState } from 'react';
// import { PropTypes } from '@mui/material';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import JourneysData from "../utils/journeysData.json"
import "../styles/JourneysHome.css"

const JourneyImageURL = "https://source.unsplash.com/random/300x300/?nature,plants,trees";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function JourneyShowcase() {

  const [side, setSide] = useState("leftSide")

  const numRandomBonzaiChapters = () => {
    const numBonzaiDB = JourneysData.length
    const randomInt = Math.floor(Math.random() * numBonzaiDB);
    const chapters = JourneysData[randomInt].chapers;
    return chapters;
  }

  let numChapters  = numRandomBonzaiChapters();
  
  const LeftSideJourney = () => {
    return (
      <Box container="true" sx={{ flexGrow: 1 }}>
        <Grid  sx={{display:"flex", alignItems: "center", flexDirection:"row"}}>
          <Grid item="true" xs={6} md={8}>
            <img  src={JourneyImageURL} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>
              <p>{numChapters.text}</p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    );
    
  }

  const RightSideJourney = () => {
    return (
      <Box container="true" sx={{ flexGrow: 1 }}>
        <Grid  sx={{display:"flex", alignItems: "center", flexDirection:"row"}}>
          <Grid item xs={6} md={8}>
            <Item>
              <p>{numChapters.text}</p>
            </Item>
          </Grid>
          <Grid item="true" xs={6} md={8}>
            <img  src={JourneyImageURL} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  function JourneyShowcaseItem () {
    if(side === "leftSide") {
      setSide("rightSide")
      return (
        <LeftSideJourney />
      )
    } else if (side === "rightSide") {
      setSide("leftSide")
      return (
        <RightSideJourney/>
      );
    }
  }

  return (
    <Box sx= {{background: "#C3E1EA"}}>
      <Container sx={{ flexGrow: 1, }}>
        <Grid   
          container="true"
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {numChapters.map((chapters) => {
            <Grid key={chapters.chapterId}>
              <JourneyShowcaseItem/>
            </Grid>
          })}
        </Grid>
      </Container>
    </Box>
  );
}