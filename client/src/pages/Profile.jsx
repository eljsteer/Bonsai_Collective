import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import { GiTreeBranch } from "react-icons/gi";
import { RiSeedlingFill } from "react-icons/ri";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

export default function Profile() {
  const {loading, data} = useQuery(QUERY_ME);
  
  if (loading) {
    return <div>Fire is starting...</div>;
  }
  
  const userData = data?.me.userBonzai || [];
  const allUserBonzai = data?.me.userBonzai || [];

  console.log(userData)
  console.log(data)
  console.log(allUserBonzai)

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
        url: "/addBonzai"
    }
  ];


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4} md={2}>
          <Card>
            <CardMedia
              // image={userData.}
            >
            </CardMedia>
            <Box>
              {profileOptions.map((option, i) => (
              <Link
                key={i}
                to={`${option.url}`}
                underline="none"
              >
                <Button key={i} variant="outlined">
                  {option.name}
                </Button>
              </Link>    
              )
              )}
            </Box>
          </Card>
        </Grid>
        <Grid xs={8} md={10}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>

  );
}