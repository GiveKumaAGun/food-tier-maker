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
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, userListsState, currentListState } from '../atoms';
import { useHistory } from 'react-router-dom';

export default function ButtonAppBar() {
  const [user, setUser] = useRecoilState(userState)
  const setUserLists = useSetRecoilState(userListsState)
  const setCurrentList = useSetRecoilState(currentListState)
  const history = useHistory()

  const signOutHandler = () => {
    if (auth) {
      signOut(auth);
      setUser(null);
      setUserLists([]);
      setCurrentList(null)
      history.push("/")
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
              {/* <Link to="/login">
                <Button color="secondary" variant="outlined">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="contained" color="secondary" sx={{ fontWeight: "fontWeightBold", marginLeft: "1rem" }}>Sign Up</Button>
              </Link> */}
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}