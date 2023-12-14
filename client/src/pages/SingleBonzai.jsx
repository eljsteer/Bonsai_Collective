
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
// import { REMOVE_BONZAI } from '../utils/mutations';
import { QUERY_SINGLE_BONZAI } from '../utils/queries';
import { CardMedia } from '@mui/material';

// >>------------------>>
// Individual Product Specific Page Code
// >>------------------>>

// Page Theme Material UI
// let theme = createTheme();
// theme = responsiveFontSizes(theme);

export default function SingleBonzai() {
  const { id } = useParams();

  // Log the value of id to the console for debugging
  console.log('Bonzai ID:', id,);

  const { loading, data, error } = useQuery(QUERY_SINGLE_BONZAI, {
    variables: { bonzaiId: id },
  });

  // Check if id is valid ObjectId before making the query
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (!isValidObjectId) {
    return <h2>Invalid Bonzai ID</h2>;
  }

  if (loading) {
    return <h2>Bonzai is being Prepped for Display...</h2>;
  }

  if (error) {
    return <h2>Error! {error.message}</h2>;
  }

  const singleBonzai = data?.singleBonzai || {};

    // const stripeDonate =  (donationIndex) => {
    //     console.log(donationIndex)
    //     fetch('/donation', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             items: [
    //                 { id: donationIndex, quantity: 1}
    //             ]
    //         })
    //     }).then(res => {
    //         if (res.ok) return res.json()
    //         return res.json().then(json => Promise.reject(json))
    //     }).then(({ url }) => {
    //         console.log(url)
    //         window.location = url;
    //     }).catch(e => {
    //         console.error(e.error)
    //     })
    // };

// JSX Page Returned

  return (
        <Container sx={{backgroundColor: "var(--ComponentGBColor)", height: 'auto', padding: 2}}>
            <Card sx={{ maxwidth: 1250, backgroundColor: "var(--ComponentGBColor)" }}>
                <CardContent sx={{display:"flex", flexDirection:"row"}}>
                    <CardMedia
                      component="img"
                      height="500px"
                      image={singleBonzai.imageBonzai}
                      alt="Bonzai Main Image"
                    >
                    </CardMedia>
                    <Box sx={{maxWidth:"500px"}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                            {singleBonzai.title} <br />                        
                        </Typography>
                        <br/>
                        <Typography sx={{textAlign: 'center'}} variant="body1">
                            {singleBonzai.description} <br />
                        </Typography>
                        <br/>
                        <Typography gutterBottom variant="body1" component="div" sx={{textAlign: 'center'}}>
                            Price: ${singleBonzai.price} <br />
                        </Typography>
                    </Box>
                </CardContent>
                <br/>
                {/* Conditional Rendering for whether User is logged in */}
                <CardContent>
                  <Link to='/explore'>
                    <Button 
                      variant="contained"
                      // onClick={handleVoteUpdate}
                    >
                      <ChevronLeftIcon/> Go Back
                    </Button>
                  </Link> 
                </CardContent>
            </Card>
        </Container>
    )
}