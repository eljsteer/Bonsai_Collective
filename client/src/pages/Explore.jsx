import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BONSAI } from "../utils/queries";
import { UPDATE_BONSAI_IMAGE_URLS } from "../utils/mutations";
import { getRandomPhoto } from "../utils/apiUnsplash";
import BonsaiItem from "../components/BonsaiItem";
import LoadingBackdrop from "../components/LoadingBackdrop";

//// ------ Explore page displaying bonsai's for sale ------>>
//// ------------------------------------------------------->>
export default function Explore() {
  //--- MongoDB query to return all Bonsai --->>
  const {loading, data} = useQuery(QUERY_BONSAI, {
    refetchQueries: [
      {query: QUERY_BONSAI}
  ]
  });
  const [updateBonsaiImageUrl] = useMutation(UPDATE_BONSAI_IMAGE_URLS)

  const queryImg = "Bonsai";
  const [bonsaiExplore, setBonsaiExplore] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!data || !data.allBonsai) return;
      try {
        const fetchedPhotos = await getRandomPhoto(queryImg);

        const allBonsai = data?.allBonsai || [];
        if (allBonsai.length && fetchedPhotos.results.length) {
          const combined = allBonsai.map((bonsai, index) => ({
            ...bonsai,
            bonsaiImgUrl: fetchedPhotos.results[index]?.urls?.regular || "", 
          }));
          setBonsaiExplore(combined);
        }

        const BonsaiImgUrlData = [...bonsaiExplore._id, ...bonsaiExplore.bonsaiImgUrl]
        updateBonsaiImageUrl({
          variables: {
            updateBonsaiImgUrlData: BonsaiImgUrlData
          }
        })
      } catch (error) {
        console.error("Failed to fetch photo:", error);
      }
    }
    fetchData();
  }, [data]);
  
  if (loading) {
    return <LoadingBackdrop loadingText={"Spinning up server and growing bonsai..."}/>;
  }

  return (
    <Box>
      <Box sx={{ display:"flex", justifyContent:"center", margin: 2 }}>
          <Typography variant="h3" sx={{margin: 5 }}>BONSAI</Typography>
      </Box>
      <Box sx={{flexGrow: 1,  padding: 2 }}>
        <Grid 
          container 
          sx={{display: "flex", justifyContent:"center", alignItems:"top"}} 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          >
          {bonsaiExplore.map((bonsai, i) => (
            <Box key={i} sx={{ margin:"10px", maxwidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/bonsai/${bonsai._id}`}
                underline="none"
              >
                {/* Bonsai component import */}
                <BonsaiItem
                  bonsai={bonsai}
                  imageUrl={bonsai.bonsaiImgUrl}
                />
              </Link>            
            </Box>
          ))}        
        </Grid>
      </Box>
      <br/>
      <br/>
    </Box>    
  );
}