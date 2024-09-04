import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function ButtonStyled({ text, borderColor, hoverColor, color, fontSize, onClick }) {

  const StyledButton = styled(Button)(({ theme }) => ({
    color: color || theme.palette.text.primary, // Use color prop or fallback to theme color
    border: `1px solid ${borderColor || theme.palette.divider}`, // Use borderColor prop or fallback
    padding: "10px 20px",
    borderRadius: 0,
    backgroundColor: "transparent",
    fontSize: fontSize || "16px", // Use fontSize prop or default
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Monserrat"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      borderColor: borderColor || theme.palette.primary.main,
      color: hoverColor || theme.palette.primary.main,
      backgroundColor: "#282d24b5",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      borderColor: "#627a4d",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(92,132,60,.5)",
    },
  }));

  return (
    <StyledButton 
      variant="outlined" 
      className="styledButton"
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
}

ButtonStyled.propTypes = {
  text: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  hoverColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonStyled.defaultProps = {
  borderColor: "black",
  hoverColor: "black",
  color: "black",
  fontSize: "16px",
};
