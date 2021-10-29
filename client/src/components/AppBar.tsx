import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function ButtonAppBar() {

  const test = async () => {
    const response = await axios.get('/api/hello')
    console.log(response)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "fontWeightBold" }}>
            Menu Item Ranker
          </Typography>
          <Button color="inherit" onClick={test}>Login</Button>
          <Link to="/signup">
            <Button variant="outlined" sx={{ backgroundColor: "secondary.main", fontWeight: "fontWeightBold"  }}>Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}