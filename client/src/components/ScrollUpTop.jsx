import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { Fab } from '@mui/material';
import { Fade } from '@mui/material';
import { useScrollTrigger } from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import "../styles/Header.css"

//// --- Scroll to Top Arrow JSX function --- //// 
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

//// --- Event handler for Scroll up Click JSX function --- //// 
  const handleScrollUpClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleScrollUpClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 2 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};

//// --- Scroll to Top Arrow JSX function --- //// 
function ScropUpTop(scrollUpProps) {
  return (
    <>
      <ScrollTop {...scrollUpProps}>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  ) 
}

export default ScropUpTop;