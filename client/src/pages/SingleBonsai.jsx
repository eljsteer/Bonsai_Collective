import { useNavigate, useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_BONSAI } from '../utils/queries';
import { CardMedia } from '@mui/material';
import LoadingBackdrop from '../components/LoadingBackdrop';


////-------------------------------------------------------------------------------------


////-------------------------------------////
////------ Single Bonsai Info page ------////
////-------------------------------------////
export default function SingleBonsai() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  let bonsaiPrice = singleBonsai.bonsaiPrice
  let currencyFormat = new Intl.NumberFormat("en-Au");
  let priceFormatted = currencyFormat.format(bonsaiPrice);

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
          <Box sx={{maxWidth:"500px", textAlign: "center", padding: "15px"}}>
              <Typography gutterBottom variant="h5" component="div">
                {singleBonsai.title}                      
              </Typography>
              <br/>
              <Typography sx={{}} variant="body1">
                {singleBonsai.description}
              </Typography>
              <br/>
              <Typography gutterBottom variant="body1" component="div">
                Price: ${priceFormatted}
              </Typography>
              <br/>
              <Typography>
                Auction Feature Coming Soon...
              </Typography>
          </Box>
          
        </CardContent>
        <br/>
        <CardContent>
        <Button 
              variant="contained"
              color="success"
              onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon/> 
              Go Back
            </Button>
        </CardContent>
      </Card>
    </Container>
  )
}