// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const JourneyImageURL = "https://source.unsplash.com/random/300x300/?nature,plants,trees";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function JourneyShowcaseItem() {
  return (
    <Box container sx={{ flexGrow: 1 }}>
      <Grid  sx={{display:"flex", flexDirection:"row"}}>
        <Grid item xs={6} md={8}>
          <Item>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui et laboriosam earum perferendis alias minima recusandae quo cum. Deserunt blanditiis eveniet fugiat optio explicabo perspiciatis vel voluptatem incidunt? Quis, excepturi.</p>
          </Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <img  src={JourneyImageURL} />
        </Grid>
      </Grid>
    </Box>
  );
}