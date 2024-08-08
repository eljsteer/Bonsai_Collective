import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Add Bonsai Details', 'Upload Image', 'Add Chapters'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSubmit = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box sx={{ margin:"20px", width:"100%"}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Box style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Completed, Thank You for Listing your Bonsai
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
              <Link                 
                  to="/profile/myBonsai"
                  underline="none">
                <Button sx={{width:"minContent"}} color="success" variant="contained">
                  View My Bonsai
                </Button>
              </Link>
          </Box>
        </Box>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}> Hello {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="success"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="success" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep === steps.length - 1 ? 
              <Button
                color="success"
                variant="outlined"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              :
              <Button 
                onClick={handleNext}
                color="success"
                variant="outlined"
              >
                Next
            </Button>
            }
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}