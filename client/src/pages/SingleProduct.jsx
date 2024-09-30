import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { CardMedia } from "@mui/material";

////-------------------------------------------------------------------------------------


////--------------------------------------////
////------ Single Product Info page ------////
////--------------------------------------////
export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

////------ Log the value of id to the console for debugging ------>>
  console.log("Product ID:", id,);

  const { loading, data, error } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: id },
  });

////------ Check if id is valid ObjectId before making the query ------>>
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (!isValidObjectId) {
    return <h2>Invalid Product ID</h2>;
  }

  if (loading) {
    return <h2>Product is getting Built...</h2>;
  }

  if (error) {
    return <h2>Error! {error.message}</h2>;
  }

  const singleProduct = data?.singleProduct || {};

  return (
    <Container sx={{height: "auto"}}>
      <Card sx={{ maxwidth: 1250, backgroundColor: "var(--ComponentGBColor)" }}>
        <CardContent sx={{display:"flex", flexDirection:"row", padding:"16px 0px"}}>
            <CardMedia
              component="img"
              height="500px"
              sx={{ padding:"0px 0px 0px 16px"}}
              image={singleProduct.productImgUrl}
              alt="Bonsai Growing Products"
            >
            </CardMedia>
            <Box sx={{maxWidth:"500px", textAlign: "center",padding:" 0px 20px"}}>
                <Typography gutterBottom variant="h5" component="div" sx={{textAlign: "center"}}>
                    {singleProduct.productName} <br />                        
                </Typography>
                <br/>
                <Typography sx={{textAlign: "center"}} variant="body1">
                    {singleProduct.productDescription} <br />
                </Typography>
                <br/>
                <Typography gutterBottom variant="body1" component="div" sx={{textAlign: "center"}}>
                    Price: ${singleProduct.price} <br />
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