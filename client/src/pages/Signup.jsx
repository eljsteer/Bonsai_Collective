import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

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
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
              label="First Name"
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
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
              label="Last Name"
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
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
              label="Email"
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
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center", backgroundColor:"white"}}
              label="Password"
              type="password"
              name="password"
              placeholder="Please enter a Password"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={userFormData.password}
              error={passInputError}
              helperText={passHelperText}
              required
            />
          </CardContent>
          <Box sx={{ width: '100%' }}>
            <Box spacing={2}>
              <Item>
                <Button
                  disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password) || emailError === true}
                  type="submit"
                  variant="contained"
                  sx={{ width: '50%' }}
                  // onSubmit={handleFormSubmit}
                  >
                  Sign Up
                </Button>
                <br/>
                <br/>
                <Divider/>
                <br/>
                <Typography>OR</Typography>
                <br/>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                  <Typography style={{color:"white"}}>Don't Have an Account?</Typography>
                  <Typography>&nbsp;&nbsp;|&nbsp;&nbsp;</Typography>
                  <Link to="/login">Login</Link>
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
