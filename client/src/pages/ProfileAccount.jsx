// import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  // ButtonGroup,
  Card,
  CardContent,
  CardActions,
  // Divider,
  IconButton,
  // InputAdornment,
  Input,
  // InputBase,
  // InputLabel,
  // OutlinedInput,
  // TextField,
  Typography,
  // FilledInput,
} from "@mui/material";

import { TbPlant } from "react-icons/tb";
import { BiImageAdd } from "react-icons/bi";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";


import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import {validateEmail } from "../utils/helpers";
// import { useMutation } from "@apollo/client";
// import Auth from "../utils/authClient";


// Page Theme Material UI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#32392D",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

const NavButton = styled(Button)({
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  backgroundColor: "#515b3a",
  borderColor: "#282D24",
  "&:hover": {
    backgroundColor: "#282D24",
    borderColor: "#515b3a",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#282D24",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ProfileAccount = () => {
  // const [userFormData, setUserFormData] = useState({ firstName:"", lastName:"", email: "", password: "", showPassword: false});
  // const [emailError, setEmailError] = useState(false);
  // const [emailHelperText, setEmailHelperText] = useState(false);
  // const [editDetail, setEditDetail] = useState(false);

  // const handleBlur = (event) => {
  //   const { name, value } = event.target;
  //   const isValid = validateEmail(event.target.value);

  //   if (name === "email") {
  //     if(!isValid) {
  //       setEmailError(true);
  //       setEmailHelperText("A valid Email is required");
  //     } else if (isValid) {
  //       setEmailError(false);
  //       setEmailHelperText(false);
  //     }
  //   } 
  // }
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value });
  // };

  // const handleEditDetail = (event) => {
  //   setEditDetail(true)
  // };

  const {loading, data, error} = useQuery(QUERY_ME);

  if(error) {
    console.log(error);
    return <div>Error loading data</div>;
  }
  
  if (loading) {
    return <div>Profile is Loading...</div>;
  }

  console.log(data)

  const userData = data?.me || [];

  const welcomeName = `${userData.firstName} ${userData.lastName}`

  return (
    <>
    <div className="image__CoverImg" style={{ position: "relative", height: "100svh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
    <div className="coverImageOverlay">
        <Box
          sx={{"& .MuiTextField-root": { m: 1 },flexGrow: 1, display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center",}}
          // onSubmit={handleFormSubmit}
          > 
          <Card 
            component="form"
            sx={{ backgroundColor: "#32392D", }}
            noValidate
            >
            <Typography variant="h4" sx={{ margin:"20px", color: "white", fontWeight:"600", textAlign:"center", textTransform:"uppercase" }}>WELCOME {welcomeName}</Typography>
            <CardActions sx={{display:"flex", justifyContent:"center"}}>
                <NavButton variant="outlined" startIcon={<TbPlant />} sx={{ color:"white", margin:"3px" }}>
                  <Link to="/profile/myBonsai" style={{ color:"white", textDecoration:"none" }}>
                    My Bonsai
                  </Link>
                </NavButton>
                <NavButton startIcon={<BiImageAdd />} sx={{ color:"white", margin:"3px" }}>
                  <Link to="/profile/addBonsai" style={{ color:"white", textDecoration:"none"}}>
                    Add Bonsai
                  </Link>
                </NavButton>
            </CardActions>
            <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column", margin:"20px" }}>
              <Typography sx={{ display:"flex", alignItems:"center", color:"white" }}>
                First Name:
                <Input
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.firstName}
                  variant="filled"
                  sx={{color:"white", margin:"0px 10px"}}
                  size="small"
                />
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </Typography>
              <Typography sx={{display:"flex", alignItems:"center", color:"white" }}>
                Last Name:
                <Input
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.lastName}
                  variant="filled"
                  sx={{color:"white", margin:"0px 10px"}}
                  size="small"
                />
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </Typography>
              <Typography sx={{display:"flex", alignItems:"center", color:"white" }}>
                Email:
                <Input
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.email}
                  variant="filled"
                  sx={{color:"white", margin:"0px 10px"}}
                  fullWidth
                  size="small"
                />
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </Typography>
              <Typography sx={{display:"flex", alignItems:"center", color:"white" }}>
                Bio:
                <Input
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.bio}
                  variant="filled"
                  sx={{color:"white", margin:"0px 10px"}}
                  fullWidth
                />
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </Typography>
            </CardContent>
            <Box sx={{ width: "100%" }}>
              <Box spacing={2}>
                <Item>
                  <Button
                    // disabled={!(emailError === true)}
                    type="submit"
                    variant="contained"
                    sx={{ width: "50%", backgroundColor:"#515b3a" }}
                    // onSubmit={handleFormSubmit}
                    >
                    Submit
                  </Button>
                </Item>
              </Box>
            </Box>
          </Card>
        </Box>
    </div>
    </div>
  </>
  );
};

export default ProfileAccount;