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

// ------ Leftside section JSX component ----->>
const LeftSideJourney = ({ chapter }) => {
  return (
    <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", justifyContent: "end" }}>
      <picture style={{ padding: 0 }}>
        <img src={chapter.chapterIMG[0]} className="journeyImg" alt="Chapter image" />
      </picture>
      <div style={{ display: "flex", maxHeight: "500px" }}>
        <p style={{ display: "flex", alignItems: "center", textAlign: "center", lineHeight: "2.5rem", color: "#000" }}>
          {chapter.chapterDescription}
        </p>
      </div>
    </Grid>
  );
};

// ------ Rightside section JSX component ----->>
const RightSideJourney = ({ chapter }) => {
  return (
    <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", justifyContent: "end" }}>
      <div style={{ display: "flex", maxHeight: "500px" }}>
        <p style={{ display: "flex", alignItems: "center", textAlign: "center", lineHeight: "2.5rem", color: "#000" }}>
          {chapter.chapterDescription}
        </p>
      </div>
      <picture style={{ padding: 0 }}>
        <img src={chapter.chapterIMG[0]} className="journeyImg" alt="Chapter image" />
      </picture>
    </Grid>
  );
};

// ------ Mobile/Smallscreen section JSX function ----->>
const MobileJourney = ({ chapter }) => {
  return (
    <Grid item="true" xs={12} md={10} lg={8} padding={4} sx={{ display: "flex", flexDirection: "column" }}>
      <Item sx={{ display: "flex", maxHeight: "500px" }}>
        <p style={{ display: "flex", alignItems: "center" }}>{chapter.chapterDescription}</p>
      </Item>
      <picture style={{ padding: 0 }}>
        <img src={chapter.chapterIMG[0]} className="journeyImg" alt="Chapter image" />
      </picture>
    </Grid>
  );
};

// ------- Conditional function to display Left, Right, or Mobile JSX ------>>
const JourneyShowcaseItem = ({ chapter }) => {
  const isMobile = screen.width <= 800;

  if (!chapter) {
    return <p>No chapter data available.</p>;
  }

  if (isMobile) {
    return <MobileJourney chapter={chapter} />;
  } else {
    if (chapter.chapterId % 2 !== 0) {
      return <LeftSideJourney chapter={chapter} />;
    } else {
      return <RightSideJourney chapter={chapter} />;
    }
  }
};

// ---- Define PropTypes for each component ---->>
JourneyShowcaseItem.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

LeftSideJourney.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

RightSideJourney.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

MobileJourney.propTypes = {
  chapter: PropTypes.shape({
    chapterId: PropTypes.number.isRequired,
    chapterDescription: PropTypes.string.isRequired,
    chapterIMG: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default JourneyShowcaseItem;
