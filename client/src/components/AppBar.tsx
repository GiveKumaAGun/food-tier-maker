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
import { Auth, getAuth, signOut } from '@firebase/auth';
import { auth } from '../firebaseConfig'
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';

export default function ButtonAppBar() {
  const [user, setUser] = useRecoilState(userState)


  const test = async () => {
    const response = await axios.get('/api/hello')
    console.log(response)
  }

  const signOutHandler = () => {
    console.log(auth)
    if (auth) {
      signOut(auth);
      setUser(null);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "fontWeightBold" }}>
            Menu Item Ranker
          </Typography>
          {user ? 
            <Button color="secondary" variant="contained" sx={{fontWeight: "fontWeightBold"}} onClick={signOutHandler}>Sign Out</Button>
            :
            <>
              <Link to="/login">
                <Button color="secondary" variant="outlined">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="contained" color="secondary" sx={{ fontWeight: "fontWeightBold", marginLeft: "1rem" }}>Sign Up</Button>
              </Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}