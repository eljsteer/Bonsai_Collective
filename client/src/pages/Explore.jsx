import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { QUERY_BONSAI } from "../utils/queries";
import { UPDATE_BONSAI_IMAGE_URLS } from "../utils/mutations";
import { checkSeedBonsaiImages, fetchBonsaiImages, updateBonsaiImagesInDB } from "../utils/imgLoaders";
import BonsaiItem from "../components/BonsaiItem";
import LoadingBackdrop from "../components/LoadingBackdrop";

//// ------ Explore page displaying bonsai's for sale ------>>
//// ------------------------------------------------------->>
export default function Explore() {
  const [exploreBonsai, setExploreBonsai] = useState([]);
  const [emptyBonsaiURL, setEmptyBonsaiURL] = useState(false);
  const [bonsaiImgURLData, setBonsaiImgURLData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateBonsaiImageUrl] = useMutation(UPDATE_BONSAI_IMAGE_URLS);
  
  // Fetch bonsai on initial page load
  useEffect(() => {
    if (data && data.allBonsai) {
      const exploreBonsaiData = data.allBonsai;  // Correct capitalization
      setExploreBonsai(exploreBonsaiData);
      setLoading(false);

      // Check if there are null productImgUrls
      const hasNullBonsaiImgURL = checkSeedBonsaiImages(exploreBonsaiData);
      setEmptyBonsaiURL(hasNullBonsaiImgURL);
    }
  }, [data]);

  // Fetch Unsplash images and update state if needed
  useEffect(() => {
    async function fetchBonsaiImagesURL() {
      if (emptyBonsaiURL && exploreBonsai.length > 0) {
        try {
          const bonsaiImgURLDataArray = await fetchBonsaiImages(exploreBonsai);
          setBonsaiImgURLData(bonsaiImgURLDataArray);
        } catch (error) {
          console.error("Failed to fetch bonsai images:", error);
        }
      }
    }

    fetchBonsaiImagesURL();
  }, [emptyBonsaiURL, exploreBonsai]);

  // Update product image URLs in the database
  useEffect(() => {
    if (bonsaiImgURLData.length > 0) {
      setLoading(true); // Set loading to true before updating DB
      updateBonsaiImagesInDB(updateBonsaiImageUrl, bonsaiImgURLData).then(() => {
        setLoading(false); // Set loading to false after DB update is complete
      });
    }
  }, [bonsaiImgURLData, updateBonsaiImageUrl]);

  if (loading) {
    return <LoadingBackdrop loadingText={"Spinning up server and growing bonsai..."}/>;
  }

  if(error) {
    if (error) return `Error! ${error.message}`;
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
          {data?.allBonsai?.map((bonsai) => (
            <Box 
                key={bonsai._id} 
                sx={{ margin:"10px", maxwidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/bonsai/${bonsai._id}`}
                underline="none"
              >
                <BonsaiItem bonsai={bonsai}/>
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