import PropTypes from "prop-types";

import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

export default function Shop() {
  const {error, loading, data} = useQuery(QUERY_PRODUCTS, {
    refetchQueries: [
      {query: QUERY_PRODUCTS}
    ]
  });

  const allProducts = data?.allProducts || [];

  console.log(allProducts)

  if (loading) {
    return <h2>Bonzai is starting...</h2>;
  }

  if(error) {
    if (error) return `Error! ${error.message}`;
  }

function ProductCard(props) {

  ProductCard.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageBonzai: PropTypes.src,
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link 
            to={`/product/${props._id}`}
            style={{textDecoration:"none"}}
          >
            View
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

  return (
    <div>
      {allProducts.map((product, i) => (
        <ProductCard 
          key={i}
          name={product.name}
          description={product.description}
        />
      ))}
    </div>
  );
}
