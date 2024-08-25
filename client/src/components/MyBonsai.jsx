import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import BonsaiItem from "./BonsaiItem";


////---------------------------------------------------------------------------


////-----------------------------------////
////------ Logged in users Bonsai------////
////-----------------------------------////
export default function MyBonsai() {

  const {loading, data} = useQuery(QUERY_ME);
  
  if (loading) {
    return <div>Bonsai is growing...</div>;
  }
  
  const userData = data?.me.userBonsai || [];
  const allUserBonsai = data?.me.userBonsai || [];

  console.log(userData)
  console.log(data)
  console.log(allUserBonsai)

  return (
    <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
      {allUserBonsai.map((bonsai, i) => (
        <Box key={i} sx={{ margin:"10px", maxwidth: 500 }} xs={12} sm={12} md={10}>
          <Link
            to={`/bonsai/${bonsai._id}`}
            underline="none"
          >
            <BonsaiItem 
              key={i}
              title={bonsai.title}                
              price={bonsai.price}
              description={bonsai.description}
              imageBonsai={bonsai.imageBonsai}
        
            />
          </Link>            
        </Box>
      ))}   
    </Box>
  )
}