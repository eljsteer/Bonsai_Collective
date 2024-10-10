import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_BONSAI } from '../utils/queries';
import { CardMedia } from '@mui/material';
import LoadingBackdrop from '../components/LoadingBackdrop';


////-------------------------------------------------------------------------------------


////-------------------------------------////
////------ Single Bonsai Info page ------////
////-------------------------------------////
export default function SingleBonsai() {
  const { id } = useParams();

////------ Log the value of id to the console for debugging ------>>
  console.log('Bonsai ID:', id,);

  const { loading, data, error } = useQuery(QUERY_SINGLE_BONSAI, {
    variables: { bonsaiId: id },
  });

////------ Check if id is valid ObjectId before making the query ------>>
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (!isValidObjectId) {
    return <h2>Invalid Bonsai ID</h2>;
  }
  if (loading) {
    return <LoadingBackdrop loadingText={"Growing Bonsai..."}/>;
  }
  if (error) {
    return <h2>Error! {error.message}</h2>;
  }

  const singleBonsai = data?.singleBonsai || {};

  return (
    <Container sx={{backgroundColor: "var(--ComponentGBColor)", height: 'auto', padding: 2}}>
      <Card sx={{ maxwidth: 1250, backgroundColor: "var(--ComponentGBColor)" }}>
        <CardContent sx={{display:"flex", flexDirection:"row"}}>
          <CardMedia
            component="img"
            height="500px"
            image={singleBonsai.imageBonsai[0] || singleBonsai.bonsaiImgUrl}
            alt="Bonsai Main Image"
          >
          </CardMedia>
          <Box sx={{maxWidth:"500px"}}>
              <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                {singleBonsai.title} <br />                        
              </Typography>
              <br/>
              <Typography sx={{textAlign: 'center'}} variant="body1">
                {singleBonsai.description} <br />
              </Typography>
              <br/>
              <Typography gutterBottom variant="body1" component="div" sx={{textAlign: 'center'}}>
                Price: ${singleBonsai.price} <br />
              </Typography>
          </Box>
        </CardContent>
        <br/>
        <CardContent>
          <Link to='/bonsai'>
            <Button 
              variant="contained"
            >
              <ChevronLeftIcon/>
              Go Back
            </Button>
          </Link> 
        </CardContent>
      </Card>
    </Container>
  )
}