import React from 'react';
import logo from './logo.svg';
import AppBar from './components/AppBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, ThemeProvider } from '@mui/material';
import theme from './theme'
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebaseConfig'


function App() {

  React.useEffect(() => {
    onAuthStateChanged(auth, () => {
      console.log(auth)
      console.log(auth.currentUser)
    })
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Route path="/" exact component={Landing} />
        <Route path="/signup" exact component={SignUp} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
