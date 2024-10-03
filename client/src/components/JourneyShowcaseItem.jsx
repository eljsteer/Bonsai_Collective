import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

//------ MaterialUi custom styling for Item element ------>>
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

  // ------ Leftside section JSX component ------>>
  // ------ Function displays an image and description with left hand styling. ------>>
  const LeftSideJourney = ({ bonsai, bonsaiImgUrl }) => {
    LeftSideJourney.propTypes = {
      chapterDescription: PropTypes.string,
    };
    return (
      <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", justifyContent: "end"}}>
        <picture style={{padding:0}}>
          <img srcSet={bonsaiImgUrl} className="journeyImg"/>
        </picture>
        <div style={{display:"flex", maxHeight:"500px"}}>
            <p style={{display:"flex", alignItems:"center", textAlign:"center", lineHeight:"2.5rem", color:"#000" }}>{bonsai.chapterDescription}</p>
        </div>
      </Grid>
    );
  }

  // ------ Rightside section JSX component ------>>
  // ------ Function displays an image and description with right hand styling. ------>>
  const RightSideJourney = (bonsai) => {
    RightSideJourney.propTypes = {
      chapterDescription: PropTypes.string,
    };
    return (
      <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", justifyContent: "end"}}>
        <div style={{display:"flex", maxHeight:"500px"}} >
          <p style={{display:"flex", alignItems:"center", textAlign:"center", lineHeight:"2.5rem", color: "#000"}}>{bonsai.chapterDescription}</p>
        </div>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
      </Grid>
    );
  }

  // ------ Mobile/Smallscreen section JSX function ------>>
  // ------ Function displays an image and description with styling to change when in small displays. ------>> 
  const MobileJourney = (bonsai) => {
    MobileJourney.propTypes = {
      chapterDescription: PropTypes.func,
    };
    return (
      <Grid item="true" className="mobileGrid" xs={12} md={10} lg={8} padding={4} sx={{display:"flex", flexDirection:"column"}}>
        <Item sx={{display:"flex", maxHeight:"500px"}} >
          <p style={{display:"flex", alignItems:"center"}}>{bonsai.chapterDescription}</p>
        </Item>
        <picture style={{padding:0}}>
          <img srcSet={JourneyImageURL} className="journeyImg"/>
        </picture>
      </Grid>
    );
  }

// ------- Conditional function to display Left, Right or Mobile JSX ------>> 
const JourneyShowcaseItem = (chapter) => {
  JourneyShowcaseItem.propTypes = {
    chapterId: PropTypes.func,
  };
  if (screen.width <= 800) {
    <MobileJourney chapterDescription={chapter.chapterDescription}/>
  } else {
    if(chapter.chapterId % 2 !== 0) {
      return (
        <LeftSideJourney chapterDescription={chapter.chapterDescription}/>
      )
    } else {
      return (
        <RightSideJourney chapterDescription={chapter.chapterDescription}/>
      );
    }
  }
}

export default JourneyShowcaseItem;