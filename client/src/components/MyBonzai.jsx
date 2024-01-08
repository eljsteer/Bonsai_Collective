import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import BonzaiItem from "./BonzaiItem";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

export default function UserBonzais() {

  const {loading, data} = useQuery(QUERY_ME);
  
  if (loading) {
    return <div>Fire is starting...</div>;
  }
  
  const userData = data?.me.userBonzai || [];
  const allUserBonzai = data?.me.userBonzai || [];

  console.log(userData)
  console.log(data)
  console.log(allUserBonzai)

  return (
    <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
      {allUserBonzai.map((bonzai, i) => (
        <Box key={i} sx={{ margin:"10px", maxwidth: 500 }} xs={12} sm={12} md={10}>
          <Link
            to={`/bonzai/${bonzai._id}`}
            underline="none"
          >
            <BonzaiItem 
              key={i}
              title={bonzai.title}                
              price={bonzai.price}
              description={bonzai.description}
              imageBonzai={bonzai.imageBonzai}
        
            />
          </Link>            
        </Box>
      ))}   
    </Box>
  )
}