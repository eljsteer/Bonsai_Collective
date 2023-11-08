import PropTypes from 'prop-types';

import {
  Box,
  Fab,
  Fade,
  useScrollTrigger,
  } from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import "../styles/Header.css"

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

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
    <Fade in={trigger} unmountOnExit>
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