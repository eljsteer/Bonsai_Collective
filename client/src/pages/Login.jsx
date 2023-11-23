import { useState } from "react";
import { Link } from 'react-router-dom';

import { Alert, Divider } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
// import { Container } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Typography } from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import "../styles/Login.css"

import {validateEmail } from "../utils/helpers";
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';
// import Auth from "../utils/auth";

// Page Material UI Theme
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#32392D",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));


//// >>------------------------>> ////
////      Login Page Code
//// >>------------------------>> ////

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "", showPassword: false});
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(false);
  // const [ loginUser ] = useMutation(LOGIN_USER);


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if( name === "password") {
      if(!value) {
        setPasswordError(true);
        setPasswordHelperText("A Valid Password is required");
      } else if (value) {
        setPasswordError(false);
        setPasswordHelperText(false);
      }
    } 
    setUserFormData({ 
      ...userFormData, 
      [name]: value 
    });
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
    if (name === "email") {
      if(!isValid) {
        setEmailError(true);
        setEmailHelperText("A Valid Email is required");
      } else if (isValid) {
        setEmailError(false);
        setEmailHelperText(false);
      }
    } else if( name === "password") {
      if(!value) {
        setPasswordError(true);
        setPasswordHelperText("A Valid Password is required");
      } else if (value) {
        setPasswordError(false);
        setPasswordHelperText(false);
      }
    } 
  }

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //       try {
  //         const { data } = await loginUser({ 
  //           variables: { ...userFormData } 
  //         });
  //         Auth.login(data.login.token);
  //       } catch (err) {
  //         console.error(err);
  //         setShowAlert(true);
  //       }

  //   setUserFormData({
  //     email: ",
  //     password: ",
  //   });
  // };

// JSX Page Returned
  return (
    <Box id="coverImageContainer" sx={{ display: "flex", position:"relative" }}>
      <img src="https://images.unsplash.com/photo-1686652655595-aeb97ff65577?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80" alt="Cover image" className="image__CoverImg" />
      <Box className="coverImageOverlay">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "auto" },
            flexGrow: 1,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
          }}
          noValidate
          // onSubmit={handleFormSubmit}
          autoComplete="off"
        > 
          <Card sx={{ maxWidth: 800, backgroundColor: "#32392D" }}>
            <CardContent sx={{display: "flex", justifyContent: "center", flexDirection: "column", margin:"20px"}}>
              <InputLabel sx={{color:"white"}} htmlFor="outlined-adornment-amount">Email</InputLabel>
                <OutlinedInput
                  id="outlined-error-helper-text"
                  type="email"
                  name="email"
                  placeholder="Please enter your email"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={userFormData.email}
                  error={emailError}
                  helperText={emailHelperText}
                  sx={{backgroundColor:"white", marginTop:"3px"}}
                  required
                />
                <br/>
              <InputLabel sx={{color:"white"}} htmlFor="outlined-adornment-amount">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-error-helper-text"
                  type={userFormData.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Please enter a Password"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={userFormData.password}
                  error={passwordError}
                  helperText={passwordHelperText}
                  sx={{backgroundColor:"white", marginTop:"3px"}}
                  required
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
                />
            </CardContent>
            {showAlert && 
            <Alert severity="error" onClose={() => {setShowAlert(false)}}>
              Incorrect details, please try again!
            </Alert>}
            <Box sx={{ width: "100%" }}>
              <Box spacing={2}>
                <Item>
                  <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type="submit"
                    variant="contained"
                    sx={{ 
                      "& .MuiButton-root": { backgroundColor:"#515B3A" },
                      backgroundColor:"#515B3A",
                      width: "50%" }}
                  // onSubmit={handleFormSubmit}
                  >
                    Log In
                  </Button>
                  <br/>
                  <br/>
                  <Divider/>
                  <br/>
                  <Typography>OR</Typography>
                  <br/>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                    <Typography>Don&apos;t Have an Account?</Typography>
                    <Typography>&nbsp;&nbsp;|&nbsp;&nbsp;</Typography>
                    <Link style={{cursor:"pointer", color:"white"}} to="/signup">Sign Up</Link>
                  </div>
                  <br/>
                </Item>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>  
    </Box>
  );
};

export default Login;