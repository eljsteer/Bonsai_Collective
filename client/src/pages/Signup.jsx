import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  // Container,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {validateEmail } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import Auth from "../utils/authClient";

// --- MaterialUi Custom Theme element --->>
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#32392D",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));


// ------------------------------------------------------------------------------


////-------------------------////
////------ Signup page ------////
////-------------------------////
const Signup = () => {
  const [userFormData, setUserFormData] = useState({ firstName:"", lastName:"", email: "", password: "", showPassword: false});
  const [firstInputError, setFirstInputError] = useState(false);
  const [lastInputError, setLastInputError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [firstHelperText, setFirstHelperText] = useState(false);
  const [lastHelperText, setLastHelperText] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(false);
  const [createUser ] = useMutation(CREATE_USER);

//// ------ Functions to handle inputs to update state with data for pushing to Database ------>> 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

//// ------ Function to handle show password upon entering------>> 
  const handleClickShowPassword = () => {
    setUserFormData({
      ...userFormData,
      showPassword: !userFormData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

//// ------ Function to handle change of focus from inputs to alert user to errors ------>> 
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
        setPasswordInputError(true);
        setPasswordHelperText("A valid Password is required");
      } else if (value.length < 5) {
        setPasswordInputError(true);
        setPasswordHelperText("Password must be at least 5 characters");
      } else if (value.length > 30) {
        setPasswordInputError(true);
        setPasswordHelperText("Password must be between 5 - 30 characters ");
      } 
    } 
  }

//// ------ Function to handle form submission to save new user data in DB ------>>
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });
      Auth.signup(data.createUser.token);
    } catch (err) {
      console.error('Error creating user:', err.message);
      if (err.graphQLErrors) {
        console.error('GraphQL Errors:', err.graphQLErrors);
      }
      if (err.networkError) {
        console.error('Network Error:', err.networkError);
      }
    }    

    setUserFormData({
      firstName: "",
      lastName: "",
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
            "& .MuiTextField-root": { m: 1 },
            flexGrow: 1,
            display: "flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
          }}
          noValidate
          onSubmit={handleFormSubmit}
        > 
          <Card sx={{ backgroundColor: "#32392D", }}>
            <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column", margin:"20px"}}>
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
                  error={firstInputError}
                  helpertext={firstHelperText ? firstHelperText : undefined}
                  required
                />
                <p></p>
              <InputLabel sx={{color:"white"}} htmlFor="outlined-error-helper-text-last">Last Name</InputLabel>
                <OutlinedInput
                  id="outlined-error-helper-text-last"
                  sx={{display: "flex", justifyContent:"center", backgroundColor:"white"}}
                  type="text"
                  name="lastName"
                  placeholder="Please enter Last Name"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={userFormData.lastName}
                  error={lastInputError}
                  helpertext={lastHelperText ? lastHelperText : undefined}
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
              <InputLabel sx={{color:"white"}} htmlFor="outlined-error-helper-text-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-error-helper-text-password"
                  sx={{display: "flex", justifyContent:"center", backgroundColor:"white"}}
                  type={userFormData.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Please enter a Password"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={userFormData.password}
                  error={passwordInputError}
                  helpertext={passwordHelperText ? passwordHelperText : undefined}
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
                    onSubmit={handleFormSubmit}
                    >
                    Sign Up
                  </Button>
                  <Divider sx={{padding:"0px, 10px", margin:"20px"}}/>
                  <Typography sx={{ margin:"20px"}}>OR</Typography>
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
      </Box>
    </Box>
  );
};

export default Signup;
