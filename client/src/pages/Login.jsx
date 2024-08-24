import { useState } from "react";
import { Link } from "react-router-dom";
// ------ MaterialUi Imports ------>>
import { Alert, Divider } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// ------ CSS Stylesheet ------>>
import "../styles/Login.css"

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/authClient";
import {validateEmail } from "../utils/helpers";

//--- MaterialUi Custom element with Styling --->>
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#32392D",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));


//// ------ Login page ------>>
//// ------------------------>>
const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "", showPassword: false});
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(false);
  const [open, setOpen] = useState(false);
  const [ loginUser ] = useMutation(LOGIN_USER);

  // --- Function to handle user text input --->> 
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

  // --- Function to show password when user is inputting --->>
  const handleClickShowPassword = () => {
    setUserFormData({
      ...userFormData,
      showPassword: !userFormData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // --- Function to handle when user has moved focus away from form input elements --->>
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
  
  // --- Function to handle when user clicks form submit button --->>
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    const action = (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
    );

    try {
      const { data } = await loginUser({ 
        variables: { ...userFormData } 
      });
      Auth.login(data.login.token);
      setOpen(true);
      return (
        <div>
          <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Logged In!!"
            severity="success"
            action={action}
          />
        </div>
      );

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <Box id="coverImageContainer" sx={{ position:"relative", display: "flex", flexDirection:"column", }}>
      <Box id="image__CoverImg" />
      <Box className="coverImageOverlay">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "auto" },
            flexGrow: 1,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent: "center"
          }}
          noValidate
          onSubmit={handleFormSubmit}
          autoComplete="off"
        > 
          <Card sx={{ backgroundColor: "#32392D" }}>
            <CardContent sx={{display: "flex", justifyContent: "center", flexDirection: "column", margin:"20px"}}>
              <InputLabel sx={{color:"white"}} htmlFor="outlined-error-helper-text">Email</InputLabel>
                <OutlinedInput
                  id="outlined-error-helper-text"
                  type="email"
                  name="email"
                  placeholder="Please enter your email"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={userFormData.email}
                  error={emailError}
                  helpertext={emailHelperText ? emailHelperText : undefined}
                  sx={{backgroundColor:"white", marginTop:"3px"}}
                  autoComplete="email"
                  required
                />
                <br/>
              <InputLabel sx={{color:"white"}} htmlFor="outlined-adornment-password-error-helper-text">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-error-helper-text"
                  type={userFormData.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Please enter a Password"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={userFormData.password}
                  error={passwordError}
                  helpertext={passwordHelperText ? passwordHelperText : undefined}
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
                    onSubmit={handleFormSubmit}
                  >
                    Log In
                  </Button>
                  <Divider sx={{padding:"0px, 10px", margin:"20px"}}/>
                  <Typography sx={{ margin:"20px"}}>OR</Typography>
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