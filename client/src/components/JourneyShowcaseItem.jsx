import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

//------ MaterialUi custom styling for Item element ------>>
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// ------ Leftside section JSX component ----->>
const LeftSideJourney = ({ chapter, loading }) => {
  if ( loading || !chapter) {
    return(
      <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", justifyContent: "end" }}>
      <Box style={{ padding: 0 }}>
        <Skeleton
          sx={{ backgroundColor: "#696969", maxWidth: "400px", maxHeight: "600px" }}
          variant="rounded"
        />
      </Box>
      <Box style={{ display: "flex", maxHeight: "500px" }}>
        <p style={{ display: "flex", alignItems: "center", textAlign: "center", lineHeight: "2.5rem", color: "#000" }}>
          Vestibulum imperdiet, lacus efficitur dapibus facilisis, quam justo efficitur sem, eget tincidunt lectus magna sit amet odio. Morbi tristique, ante a ultrices facilisis, mi orci viverra ipsum, vitae dapibus nibh ex non ipsum.
        </p>
      </Box>
    </Grid>
    )
  }

  return (
    <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
      <Grid item="true" >
        <img 
          className="journeyImg" 
          src={chapter.chapterIMG[0]} 
          style={{ maxWidth:"100%", maxHeight: "520px", objectFit: "cover" }}
          alt="Chapter image"
        />
      </Grid> 
      <Grid item="true" style={{ display: "flex", maxWidth: "50%" }}>
        <p style={{ display: "flex", alignItems: "center", textAlign: "center", lineHeight: "2.5rem", color: "#000" }}>
          {chapter.chapterDescription}
        </p>
      </Grid>
    </Grid>
  );
};

// ------ Rightside section JSX component ----->>
const RightSideJourney = ({ chapter, loading }) => {
  if ( loading || !chapter) {
    return(
      <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
      <Grid style={{ display: "flex", maxHeight: "500px" }}>
        <p style={{ display: "flex", alignItems: "center", textAlign: "center", lineHeight: "2.5rem", color: "#000" }}>
          Vestibulum imperdiet, lacus efficitur dapibus facilisis, quam justo efficitur sem, eget tincidunt lectus magna sit amet odio. Morbi tristique, ante a ultrices facilisis, mi orci viverra ipsum, vitae dapibus nibh ex non ipsum.
        </p>
      </Grid>
      <Grid item="true" style={{ padding: 0 }}>
        <Skeleton
          sx={{ backgroundColor: "#696969", maxWidth: "400px", maxHeight: "520px" }}
          variant="rounded"
        />
      </Grid>
    </Grid>
    )
  }

  return (
    <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
      <Grid item="true" style={{ display: "flex", maxWidth: "50%" }}>
        <p style={{ display: "flex", alignItems: "center", textAlign: "center", lineHeight: "2.5rem", color: "#000" }}>
          {chapter.chapterDescription}
        </p>
      </Grid>
      <Grid item="true" >
        <img 
          className="journeyImg" 
          src={chapter.chapterIMG[0]} 
          style={{ maxWidth:"100%", maxHeight: "520px", objectFit: "cover" }}
          alt="Chapter image"
        />
      </Grid> 
    </Grid>
  );
};

// ------ Mobile/Smallscreen section JSX function ----->>
const MobileJourney = ({ chapter }) => {
  return (
    <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Grid style={{ padding: 0, display: "flex", justifyContent: "center" }}>
        <img           
          className="journeyImg" 
          src={chapter.chapterIMG[0]} 
          style={{ maxWidth: "400px", maxHeight: "600px", objectFit: "cover" }}
          alt="Chapter image" 
        />
      </Grid>
      <Item sx={{ display: "flex", maxHeight: "500px" }}>
        <p style={{ display: "flex", alignItems: "center" }}>{chapter.chapterDescription}</p>
      </Item>
    </Grid>
  );
};

// ------- Conditional function to display Left, Right, or Mobile JSX ------>>
const JourneyShowcaseItem = ({ chapter, loading }) => {
  const isMobile = screen.width <= 800;

  if (!chapter) {
    return <p>No chapter data available.</p>;
  }

  if (isMobile) {
    return <MobileJourney chapter={chapter} />;
  } else {
    if (chapter.chapterId % 2 !== 0) {
      return <LeftSideJourney chapter={chapter} loading={loading} />;
    } else {
      return <RightSideJourney chapter={chapter} loading={loading} />;
    }
  }
};

// Define PropTypes for each component
JourneyShowcaseItem.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

LeftSideJourney.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

RightSideJourney.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

MobileJourney.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default JourneyShowcaseItem;
