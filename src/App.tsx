import React from 'react';
import logo from './logo.svg';
import AppBar from './components/AppBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import theme from './theme'
import Landing from './components/Landing'

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Route path="/" exact component={Landing} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
