import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  InputAdornment,
  Input,
  InputBase,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  FilledInput,
} from "@mui/material";

import { TbPlant } from "react-icons/tb";
import { BiImageAdd } from "react-icons/bi";
import EditIcon from '@mui/icons-material/Edit';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import {validateEmail } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/authClient";

// >>------------------>>
// Signup Page Code
// >>------------------>>

// Page Theme Material UI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#32392D",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

const NavButton = styled(Button)({
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  backgroundColor: '#fff',
  borderColor: '#ADFABB',
  fontFamily: [
    'Montserrat,sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ProfileAccount = () => {
  const [userFormData, setUserFormData] = useState({ firstName:"", lastName:"", email: "", password: "", showPassword: false});
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

  const handleBlur = (event) => {
    const { name, value } = event.target;
  const isValid = validateEmail(event.target.value);

  if (name === "email") {
    if(!isValid) {
      setEmailError(true);
      setEmailHelperText("A valid Email is required");
    } else if (isValid) {
      setEmailError(false);
      setEmailHelperText(false);
    }
  } 
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleEditDetail = (event) => {
    setEditDetail(true)
  };

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

// JSX Page Returned
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
            <Typography variant="h4" sx={{margin:"10px", color: "white", fontFamily:"Montserrat,sans-serif"}}>Welcome {welcomeName}</Typography>
            <CardActions sx={{display:"flex", justifyContent:"center"}}>
              <ButtonGroup variant="outlined">
                <Button startIcon={<TbPlant />} sx={{ color:"white", margin:"3px" }}>
                  <Link to="/profile/myBonzai" style={{ color:"white", textDecoration:"none" }}>
                    My Bonzai
                  </Link>
                </Button>
                <Button startIcon={<BiImageAdd />} sx={{ color:"white", margin:"3px" }}>
                  <Link to="/profile/addBonzai" style={{ color:"white", textDecoration:"none"}}>
                    Add Bonzai
                  </Link>
                </Button>
              </ButtonGroup>
            </CardActions>
            <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column", margin:"20px"}}>
              <Typography sx={{display:"flex", alignItems:"center", color:"white", fontFamily:"Montserrat,sans-serif"}}>
                First Name:
                <InputBase
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.firstName}
                  variant="filled"
                  sx={{color:"white", fontFamily:"Montserrat,sans-serif", margin:"0px 10px"}}
                  size="small"
                />
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </Typography>
              <Typography sx={{display:"flex", alignItems:"center", color:"white",fontFamily:"Montserrat,sans-serif" }}>
                Last Name:
                <InputBase
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.lastName}
                  variant="filled"
                  sx={{color:"white", fontFamily:"Montserrat,sans-serif", margin:"0px 10px"}}
                  size="small"
                />
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </Typography>
              <Typography sx={{display:"flex", alignItems:"center", color:"white", fontFamily:"Montserrat,sans-serif"}}>
                Email:
                <InputBase
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.email}
                  variant="filled"
                  sx={{color:"white", fontFamily:"Montserrat,sans-serif", margin:"0px 10px"}}
                  fullWidth
                  size="small"
                />
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </Typography>
              <Typography sx={{display:"flex", alignItems:"center", color:"white", fontFamily:"Montserrat,sans-serif"}}>
                Bio:
                <InputBase
                  hiddenLabel
                  id="filled-hidden-label-small"
                  value={userData.bio}
                  variant="filled"
                  sx={{color:"white", fontFamily:"Montserrat,sans-serif", margin:"0px 10px"}}
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
                    disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.bio) || emailError === true}
                    type="submit"
                    variant="contained"
                    sx={{ width: "50%" }}
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