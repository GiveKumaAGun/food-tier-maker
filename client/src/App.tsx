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
import { userState, userDataState, userListsState } from './atoms'
import { collection, doc, getDoc, setDoc, DocumentReference, DocumentData, query, where, getDocs } from "firebase/firestore";
import { User, TierList } from './interfaces/User'



function App() {
  const [user, setUser] = useRecoilState(userState)
  const [userData, setUserData] = useRecoilState(userDataState)
  const [userLists, setUserLists] = useRecoilState(userListsState)

  const getUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return true
    } else {
      console.log('No such document!')
      return false
    }
  }

  const getUserLists = async (uid: string) => {
    const temp: TierList[] = [];
    const q = query(collection(db, "tier_lists"), where("user_id", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data()
      temp.push({
        id: doc.id,
        ranking_rows: data.ranking_rows,
        rest_id: data.rest_id,
        user_id: data.user_id,
        rest_name: data.rest_name
      })
    });
    return temp
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

        let userInDb = await getUserData(auth.currentUser.uid)
        let lists = await getUserLists(auth.currentUser.uid) 
        setUserLists(lists)
        if (!userInDb) {
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
          })
        } else {
          
        }
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <div style={{ backgroundColor: "#eeeeee", height: "100vh"}} id="app">
      <Router>
        <ThemeProvider theme={theme}>
          <AppBar />
          <Route path="/" exact component={Landing} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
