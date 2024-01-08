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
  InputBase,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  FilledInput,
} from "@mui/material";

import { TbPlant } from "react-icons/tb";
import { BiImageAdd } from "react-icons/bi";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
    '-apple-system',
    'BlinkMacSystemFont',
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
      <Card sx={{ backgroundColor: "#32392D" }}>
          <Typography variant="h3">Welcome {welcomeName}</Typography>
          <Divider/>
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", margin:"20px"}}>
            <CardActions>
              <NavButton color="success" startIcon={<TbPlant />}>
                <Link to="/profile/myBonzai" style={{textDecoration:"none"}}>
                  My Bonzai
                </Link>
              </NavButton>
              <NavButton color="success" startIcon={<BiImageAdd />}>
                <Link to="/profile/addBonzai" style={{textDecoration:"none"}}>
                  Add Bonzai
                </Link>
              </NavButton>
            </CardActions>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
              flexGrow: 1,
              display: "flex",
              flexDirection:"column",
              justifyContent:"center",
              alignItems:"center",
            }}
            noValidate
          > 
            { editDetail === true 
              ? 
              <>
                <InputLabel sx={{color:"white"}} htmlFor="outlined-error-helper-text-first">First Name</InputLabel>
                  <OutlinedInput
                    id="outlined-error-helper-text-first"
                    sx={{ display: "flex", justifyContent:"center", backgroundColor:"white"}}
                    type="text"
                    name="firstName"
                    placeholder="Please enter First Name"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.firstName}
                    // error={firstInputError}
                    // helpertext={firstHelperText ? firstHelperText : undefined}
                    required
                  />
              </>
              :
              <Typography></Typography>
            }
            <InputLabel sx={{color:"white"}} htmlFor="outlined-error-helper-text-last">Last Name</InputLabel>
              <OutlinedInput
                id="outlined-error-helper-text-last"
                sx={{display: "flex", justifyContent:"center", backgroundColor:"white"}}
                type="text"
                name="lastName"
                placeholder="Please enter Last Name"
                onChange={handleInputChange}
                // onBlur={handleBlur}
                value={userFormData.lastName}
                // error={lastInputError}
                // helpertext={lastHelperText ? lastHelperText : undefined}
                required
              />
              <p></p>
            <InputLabel sx={{color:"white"}} htmlFor="outlined-error-helper-text-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-error-helper-text-email"
                sx={{display: "flex", justifyContent:"center", backgroundColor:"white"}}
                type="email"
                name="email"
                placeholder="Please enter your email"
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={userFormData.email}
                error={emailError}
                helpertext={emailHelperText ? emailHelperText : undefined}
                autoComplete="email"
                required
              />
              <p></p>
          </Box>
            <Button
              disabled={emailError === true}
              type="submit"
              color="success"
              variant="contained"
              sx={{ justifyContent:"center"}}
              // onSubmit={handleFormSubmit}
              >
              Back
            </Button>
      </Card>
    </div>
    </div>
  </>
  );
};

export default ProfileAccount;