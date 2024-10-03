import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { FaCartArrowDown } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import LoadingBackdrop from "../components/LoadingBackdrop";
import { CartContext } from "../utils/CartContext";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

////------------------------------------------------------------


////-----------------------////
////------ Shop page ------////
////-----------------------////
export default function Shop() {
//------- Custom MaterialUI styled "Input" element ------>>
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        
      },
    },
  }));

//// ------ Database Product queries ------>>
  const {error, loading, data} = useQuery(QUERY_PRODUCTS);

 //// ------ Shop Categories ----->>
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const categoriesArray = [];
  const sortByArray = ["Alphabetically, A-Z", "Alphabetically, Z-A", "Price, low-high", "Price, high-low" ];
  const { cartProducts, addProductToCart } = useContext(CartContext);

  console.log(cartProducts)

//// ------ Functions to add products to cart ------>> 
  const handleAddProductToCart = (productID) =>  {
    addProductToCart(productID);
  }

  if (data?.allProducts) {
    data.allProducts.forEach((product) => {
      if (!categoriesArray.includes(product.category)) {
        categoriesArray.push(product.category);
      }
    });
  }  

  if (loading) {
    return <LoadingBackdrop loadingText={"Spinning up server and filling shop shelves..."}/>;
  }
  if(error) {
    if (error) return `Error! ${error.message}`;
  }

//// ------ Functions to handle filtering and sorting of products ------>>
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };


  return (
    <Container>
      <Box sx={{ display:"flex", justifyContent:"center", margin: 2 }}>
        <Typography variant="h3" sx={{ margin: 5 }}>SHOP</Typography>
      </Box>
      <Box sx={{ display:"flex", borderTop:"2px Solid Black", borderBottom:"2px Solid Black"  }}>
        <FormControl sx={{ display:"flex", flexDirection:"row", alignItems:"center"}} variant="standard">
          <Typography sx={{ margin:"0px 20px" }}>FILTER BY:</Typography>
          <NativeSelect
            id="categorySelect"
            value={category}
            onChange={handleCategoryChange}
            input={<BootstrapInput />}
            label="All Products"
            sx={{border:"none"}}
          >
            <option aria-label="None" value="" />
            {categoriesArray.map((category, i ) => (
              <option key={i} value={category}>{category}</option>
              ))
            }
          </NativeSelect>
        </FormControl>
        <FormControl sx={{display:"flex", flexDirection:"row", alignItems:"center"}} variant="standard">
          <Typography sx={{ margin:"0px 20px" }}>SORT BY:</Typography>
          <NativeSelect
            id="sortBySelect"
            value={sortBy}
            onChange={handleSortByChange}
            input={<BootstrapInput />}
            size="large"
            label="Sort By"
            sx={{border:"none"}}
          >
            <option aria-label="None" value="" />
            {sortByArray.map((sortBy, i ) => (
              <option key={i} value={sortBy}>{sortBy}</option>
              ))
            }
          </NativeSelect>
        </FormControl>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row"}}>
        <Box sx={{flexGrow: 1,  padding: 5 }}>
          <Grid 
            container 
            sx={{display: "flex", justifyContent:"center", alignItems:"top"}} 
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data?.allProducts?.map((product) => (
              <Box key={product._id}>
                <Link
                  to={`/products/${product._id}`}
                  style={{ textDecoration: "none"}}
                >
                  <ProductCard product={product}/>
                </Link>
                <CardActions sx={{display:"flex", justifyContent:"center"}}>
                  <Button
                    size="medium"
                    color="success" 
                    variant="outlined"
                    style={{ margin: "10px"}}
                    onClick={() => handleAddProductToCart(product._id)}
                  >
                    <FaCartArrowDown style={{fontSize:"20px", marginRight:"5px"}} color="green"/>
                    Add to Cart
                  </Button>
                </CardActions>
              </Box>
              ))
            }
          </Grid>
        </Box>
      </Box>
    </Container> 
  );
}
