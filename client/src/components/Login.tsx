import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { provider, auth } from '../firebaseConfig'
import { GoogleLoginButton } from "react-social-login-buttons";
import { useHistory } from 'react-router-dom';


export default function Login() {
  const history = useHistory()

  React.useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            const token = credential.accessToken;
          }
          // The signed-in user info.
          const user = result.user;
          history.push("/")
        }
        // FIX NESTED IFS LATER ^

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)
        // ...
      });

  }, [])
  
  const buttonHandler = () => {
    signInWithRedirect(auth, provider);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    
  };

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Log in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>    
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
              Log in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup">
                  Need an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{margin: "2rem"}}>
          Or
        </Typography>
        <Button variant="contained" onClick={buttonHandler}>Log in with Google</Button>
        <Button variant="contained" sx={{margin: "1rem"}}>USE PUBLIC DEMO ACCOUNT</Button>
      </Box>
    </Container>
  )
}
