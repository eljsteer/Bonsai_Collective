import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {validateEmail } from "../utils/helpers";
// import { useMutation } from "@apollo/client";
// import { CREATE_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

// >>------------------>>
// Signup Page Code
// >>------------------>>

// Page Theme Material UI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#32392D",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "white",
}));

const Signup = () => {
  const [userFormData, setUserFormData] = useState({ firstName:"", lastName:"", email: "", password: "" });
  
  const [firstInputError, setFirstInputError] = useState(false);
  const [lastInputError, setLastInputError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passInputError, setPassInputError] = useState(false);

  const [firstHelperText, setFirstHelperText] = useState(false);
  const [lastHelperText, setLastHelperText] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [passHelperText, setPassHelperText] = useState(false);

  // const [createUser ] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setUserFormData({
      ...userFormData,
      showPassword: !userFormData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const isValid = validateEmail(event.target.value);
    if (name === "firstName") {
      if(!value) {
        setFirstInputError(true);
        setFirstHelperText("Please enter your First Name");
      } else if (value) {
        setFirstInputError(false);
        setFirstHelperText(false);
      }
    } else if (name === "lastName") {
      if(!value) {
        setLastInputError(true);
        setLastHelperText("Please enter your Last Name");
      } else if (value) {
        setLastInputError(false);
        setLastHelperText(false);
      }
    } else if (name === "email") {
      if(!isValid) {
        setEmailError(true);
        setEmailHelperText("A valid Email is required");
      } else if (isValid) {
        setEmailError(false);
        setEmailHelperText(false);
      }
    } else if( name === "password") {
      if(!value) {
        setPassInputError(true);
        setPassHelperText("A valid Password is required");
      } else if (value.length < 5) {
        setPassInputError(true);
        setPassHelperText("Password must be at least 5 characters");
      } else if (value.length > 30) {
        setPassInputError(true);
        setPassHelperText("Password must be between 5 - 30 characters ");
      } 
    } 
  }

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //   }
  //   try {
  //     const { data } = await createUser({
  //       variables: { ...userFormData },
  //     });
  //     Auth.signup(data.createUser.token);
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   setUserFormData({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  //   });
  // };

// JSX Page Returned
  return (
    <Container style={{ zIndex: -10}} className="coverImage" sx={{height: "100svh", display:"flex", alignItems:"center", justifyContent:"center"}} maxwidth="sm" alignItems="center">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "auto" },
          flexGrow: 1,
          display: "flex",
          flexDirection:"column",
          justifyContent: "center"
        }}
        noValidate
        // onSubmit={handleFormSubmit}
        autoComplete="off"
      > 
        <Card sx={{ maxWidth: 700, backgroundColor: "#32392D" }}>
          <CardContent sx={{display: "flex", justifyContent: "center", flexDirection: "column", margin:"20px"}}>
            <InputLabel sx={{color:"white"}} htmlFor="outlined-adornment-amount">First Name</InputLabel>
              <OutlinedInput
                id="outlined-error-helper-text"
                sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
                type="text"
                name="firstName"
                placeholder="Please enter First Name"
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={userFormData.firstName}
                error={firstInputError}
                helperText={firstHelperText}
                required
              />
              <p></p>
            <InputLabel sx={{color:"white"}} htmlFor="outlined-adornment-amount">Last Name</InputLabel>
              <OutlinedInput
                id="outlined-error-helper-text"
                sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
                type="text"
                name="lastName"
                placeholder="Please enter Last Name"
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={userFormData.lastName}
                error={lastInputError}
                helperText={lastHelperText}
                required
              />
              <p></p>
            <InputLabel sx={{color:"white"}} htmlFor="outlined-adornment-amount">Email</InputLabel>
              <OutlinedInput
                id="outlined-error-helper-text"
                sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
                type="email"
                name="email"
                placeholder="Please enter your email"
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={userFormData.email}
                error={emailError}
                helperText={emailHelperText}
                required
              />
              <p></p>
            <InputLabel sx={{color:"white"}} htmlFor="outlined-adornment-amount">Password</InputLabel>
              <OutlinedInput
                id="outlined-error-helper-text"
                sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
                type={userFormData.showPassword ? "text" : "password"}
                name="password"
                placeholder="Please enter a Password"
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={userFormData.password}
                error={passInputError}
                helperText={passHelperText}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                    {userFormData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
          </CardContent>
          <Box sx={{ width: "100%" }}>
            <Box spacing={2}>
              <Item>
                <Button
                  disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password) || emailError === true}
                  type="submit"
                  variant="contained"
                  sx={{ width: "50%" }}
                  // onSubmit={handleFormSubmit}
                  >
                  Sign Up
                </Button>
                <Divider sx={{padding:"0px, 10px"}}/>
                <Typography>OR</Typography>
                <br/>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                  <Typography style={{color:"white"}}>Already have an Account?</Typography>
                  <Typography>&nbsp;&nbsp;|&nbsp;&nbsp;</Typography>
                  <Link style={{cursor:"pointer", color:"white"}} to="/login">Login</Link>
                </div>
                <br/>
              </Item>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Signup;
