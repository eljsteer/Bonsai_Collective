// import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import JourneyShowcaseItem from './JourneyShowcaseItem';



export default function JourneyShowcase() {
  return (
    <Box sx= {{background: "#3B8EA5"}}>
      <Box sx={{ flexGrow: 1, }}>
        <Grid   
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >
          <Grid>
            <JourneyShowcaseItem />
          </Grid>
          <Grid>
            <JourneyShowcaseItem />
          </Grid>
          <Grid>
            <JourneyShowcaseItem />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}