import React from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { useSetRecoilState } from "recoil";
import { userState, userListsState } from "./atoms";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ListEditor from "./components/ListEditor";
import { getUserLists } from "./util/index";



function App() {
  const setUser = useSetRecoilState(userState);
  const setUserLists = useSetRecoilState(userListsState);

  const getUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return true;
    } else {
      console.log("No such document!");
      return false;
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, async () => {
      if (auth.currentUser) {
        await setUser({
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email
        });

        let userInDb = await getUserData(auth.currentUser.uid);
        let lists = await getUserLists(auth.currentUser.uid); 
        setUserLists(lists);
        if (!userInDb) {
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
          });
        }
      }
    });
  }, []);

  return (
    <div style={{ height: "100vh" }} id="app">
      <Router>
        <ThemeProvider theme={theme}>
          <AppBar />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/" exact component={Login} />
          <Route path="/lists/:list_id" exact component={ListEditor} />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
