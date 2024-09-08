import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SaveIcon from '@mui/icons-material/Save';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMutation } from "@apollo/client";
import { UPDATE_USER_BIO } from "../utils/mutations";

// Page Material UI Theme
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--ComponentGBColor)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Page Logic and React hooks
const AddUserInfo = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();

  const [updateUser, { error }] = useMutation(UPDATE_USER_BIO);
  const [userFormData, setUserFormData] = useState({ bio: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setShowAlert(true); // Show alert if form is invalid
      return;
    }

    const updateUserData = {
      bio: userFormData.bio,
    };

    try {
      const { data } = await updateUser({
        variables: { updateBio: updateUserData },
      });
      
      console.log(data);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true); // Show error alert if mutation fails
    }
  };

  return (
    <Container sx={{height: '100vh'}} maxWidth="sm" alignItems="center">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "auto" },
          flexGrow: 1
        }}
        noValidate
        onSubmit={handleFormSubmit}
        autoComplete="off"
      > 
        <Card>
          <CardContent>
            <Typography sx={{textAlign: 'center'}} variant="h6">Please provide some more information</Typography>
            <br/>
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center"}}
              label="Bio"
              type="text"
              name="bio"
              placeholder="Please write a little about yourself and your growing journey"
              onChange={handleInputChange}
              value={userFormData.bio}
              required
              fullWidth 
            />
          </CardContent>
            {showAlert && 
            <Alert severity="error" onClose={() => setShowAlert(false)}>
              <span>Computer says no!</span> 
              <span>Please enter details in at least one field</span>
            </Alert>}
            {showErrorAlert && 
            <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
              <span>Error!</span>
              <span>{error?.message || 'Something went wrong while updating user information.'}</span>
            </Alert>}
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <Item>
                  <Button
                    type="submit"
                    name="completeButton"
                    variant="outlined"
                    sx={{ width: '45%' }}
                  >
                    <SaveIcon />
                    Save
                  </Button>
                </Item>
                <Item>
                  <Button
                    variant="outlined"
                    sx={{ width: '45%' }}
                    onClick={() => navigate("/profile")}
                  >
                    Skip
                    <ChevronRightIcon />
                  </Button>
                </Item>
                <Item>
                  <Link to='/profile'>
                      <Button variant="contained">
                          <ChevronLeftIcon /> Go Back
                      </Button>
                  </Link>
                </Item>
              </Stack>
            </Box>                 
          <br/>
        </Card>        
      </Box>
    </Container>
  );
};

export default AddUserInfo;
