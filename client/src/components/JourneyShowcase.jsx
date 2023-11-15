import PropTypes from 'prop-types';
import styled from '@mui/material/styles/styled';
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
      chapterDescr: PropTypes.string,
    };
    return (
      <Grid item="true"  className="journeyContainer" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", justifyContent: "end"}}>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
        <Item sx={{display:"flex", maxHeight:"500px", opacity:"0.70"}}>
            <p style={{display:"flex", alignItems:"center", color:"#000" }}>{props.chapterDescr}</p>
        </Item>
      </Grid>
    );
  }

  const RightSideJourney = (props) => {
    RightSideJourney.propTypes = {
      chapterDescr: PropTypes.string,
    };
    return (
      <Grid item="true" className="journeyContainer" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", justifyContent: "end"}}>
        <Item sx={{display:"flex", maxHeight:"500px", opacity:"0.70"}} >
          <p style={{display:"flex", alignItems:"center", color: "#000"}}>{props.chapterDescr}</p>
        </Item>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
      </Grid>
    );
  }

  const MobileJourney = (props) => {
    MobileJourney.propTypes = {
      chapterDescr: PropTypes.func,
    };
    return (
      <Grid item="true" className="journeyContainer" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", flexDirection:"column"}}>
        <Item sx={{display:"flex", maxHeight:"500px"}} >
          <p style={{display:"flex", alignItems:"center"}}>{props.chapterDescr}</p>
        </Item>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
      </Grid>
    );
  }

  const JourneyShowcaseItem = (chapter) => {
    JourneyShowcaseItem.propTypes = {
      chapterId: PropTypes.func,
    };
    if (screen.width <= 800) {
      <MobileJourney chapterDescr={chapter.chapterDescr}/>
    } else {
      if(chapter.chapterId % 2 !== 0) {
        return (
          <LeftSideJourney chapterDescr={chapter.chapterDescr}/>
        )
      } else {
        return (
          <RightSideJourney chapterDescr={chapter.chapterDescr}/>
        );
      }
    }
  }

  return (
    <Box sx={{background: "#C3E1EA", display: "flex", justifyContent:"center"}}>
      <Container className="journeyContainer" sx={{ flexGrow: 1, margin:0, minWidth:"100%"}}>
        <Grid   
          container="true"
          spacing={4}
          sx={{
            display:"flex",
            minWidth: "100%"
          }}
        >
          {numChapters.map((chapter) => {
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
                chapterDescr={chapter.chapterDescr}
              />
            </Grid>)
          })}
        </Grid>
      </Container>
    </Box>
  );
}