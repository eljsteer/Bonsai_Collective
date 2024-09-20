import PropTypes from "prop-types"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import "./styles/loadingbackdrop.css"

export default function LoadingBackdrop({loadingText}) {
  return (
    <Backdrop
      className="backdrop"
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    >
      <Typography className="loadingText" variant="h4">{loadingText}</Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

LoadingBackdrop.propTypes = {
  loadingText: PropTypes.string,
};