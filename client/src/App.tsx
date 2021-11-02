import React from 'react';
import logo from './logo.svg';
import AppBar from './components/AppBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, ThemeProvider } from '@mui/material';
import theme from './theme'
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebaseConfig'
import { useRecoilState } from 'recoil';
import { userState, userDataState } from './atoms'
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { User } from './interfaces/User'



function App() {
  const [user, setUser] = useRecoilState(userState)
  const [userData, setUserData] = useRecoilState(userDataState)

  const getUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      console.log('No such document!')
      return null
    }
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, async () => {
      if (auth.currentUser) {
        console.log(auth.currentUser)
        await setUser({
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email
        })

        let userData = await getUserData(auth.currentUser.uid) 
        if (!userData) {
          const test = await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
          })
          console.log(test)
        }
      } else {
        setUser(null)
      }
      console.log(user)
    })
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Route path="/" exact component={Landing} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
