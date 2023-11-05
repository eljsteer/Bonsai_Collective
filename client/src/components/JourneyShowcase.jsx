import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import JourneysData from "../utils/journeysData.json"
import "../styles/JourneysHome.css"

const JourneyImageURL = "https://source.unsplash.com/random/500x500/?nature,plants,trees";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function JourneyShowcase() {

  const numRandomBonzaiChapters = () => {
    const numBonzaiDB = JourneysData.length
    const randomInt = Math.floor(Math.random() * numBonzaiDB);
    const chapters = JourneysData[randomInt].chapers;
    return chapters;
  }

  let numChapters  = numRandomBonzaiChapters();

  const LeftSideJourney = (props) => {
    LeftSideJourney.propTypes = {
      journeyDescr: PropTypes.junction,
    };
    return (
      <Grid item="true"  className="journeyContainer" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", justifyContent: "end"}}>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
        <Item sx={{display:"flex", maxHeight:"500px"}}>
            <p style={{display:"flex", alignItems:"center"}}>{props.journeyDescr}</p>
        </Item>
      </Grid>
    );
  }

  const RightSideJourney = (props) => {
    RightSideJourney.propTypes = {
      journeyDescr: PropTypes.function,
    };
    return (
      <Grid item="true" className="journeyContainer" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", justifyContent: "end"}}>
        <Item sx={{display:"flex", maxHeight:"500px"}} >
          <p style={{display:"flex", alignItems:"center"}}>{props.journeyDescr}</p>
        </Item>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
      </Grid>
    );
  }

  const MobileJourney = (props) => {
    MobileJourney.propTypes = {
      journeyDescr: PropTypes.function,
    };
    return (
      <Grid item="true" className="journeyContainer" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", flexDirection:"column"}}>
        <Item sx={{display:"flex", maxHeight:"500px"}} >
          <p style={{display:"flex", alignItems:"center"}}>{props.journeyDescr}</p>
        </Item>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
      </Grid>
    );
  }

  const JourneyShowcaseItem = (chapter) => {
    JourneyShowcaseItem.propTypes = {
      chapterId: PropTypes.function,
    };
    if (screen.width <= 800) {
      <MobileJourney journeyDescr={chapter.journeyDescr}/>
    } else {
      if(chapter.chapterId % 2 !== 0) {
        return (
          <LeftSideJourney journeyDescr={chapter.journeyDescr}/>
        )
      } else {
        return (
          <RightSideJourney journeyDescr={chapter.journeyDescr}/>
        );
      }
    }
  }

  return (
    <Box sx={{background: "#C3E1EA", display: "flex", justifyContent:"center"}}>
      <Container className="journeyContainer" sx={{ flexGrow: 1, margin:0}}>
        <Grid   
          container="true"
          spacing={4}
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          {numChapters.map((chapter) => {
            return (
              <Grid 
                key={chapter.chapterId}
                style={{
                  display:"flex",
                  minWidth: "100vw"
                }}
                className={chapter.chapterId % 2 !== 0 ? "leftSide" : "rightSide"}
              >
              <JourneyShowcaseItem 
                chapterId = {chapter.chapterId} 
                journeyDescr={chapter.journeyDescr}
              />
            </Grid>)
          })}
        </Grid>
      </Container>
    </Box>
  );
}