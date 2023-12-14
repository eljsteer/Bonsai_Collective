
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';
import { Box, Button } from "@mui/material";
import { GiTreeBranch } from "react-icons/gi";
import { RiSeedlingFill } from "react-icons/ri";

export default function Profile() {


  const profileOptions = [
    {
        id: 0,
        icon: <GiTreeBranch />,
        name: "My Bonzai",
        url: "/mybonzai"
    },
    {
        id: 1,
        icon: <RiSeedlingFill />,
        name: "Add Bonzai",
        url: "/addbonzai"
    }
  ];


  return (

        <Box>
          {profileOptions.map((option, i) => (
            <Button key={i} variant="outlined">
              {option.name}
            </Button>
          )
          )}
        </Box>
  );
}