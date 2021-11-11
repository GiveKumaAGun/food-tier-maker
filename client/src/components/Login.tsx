import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper"
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { provider, auth, db } from "../firebaseConfig"
import { GoogleLoginButton } from "react-social-login-buttons";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, userListsState } from "../atoms";
import { collection, doc, getDoc, addDoc, DocumentReference, DocumentData, query, where, getDocs } from "firebase/firestore";



export default function Login() {
  const history = useHistory()
  const [user, setUser] = useRecoilState(userState)
  const setUserLists = useSetRecoilState(userListsState)


  const getUserLists = async (uid: string) => {
    const q = query(collection(db, "tier_lists"), where("user_id", "==", uid));
    const querySnapshot = await getDocs(q);
    const lists = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data()
      return {
        address: data.address,
        comment: data.comment,
        ranking_rows: data.ranking_rows,
        rest_name: data.rest_name,
        rest_id: data.rest_id,
        user_id: data.user_id,
        geopoint: data.geopoint,
        id: data.id,
      }
    });
    return lists
  }

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
          history.push("/dashboard")
        }

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

  React.useEffect(() => {
    if (user) {
      history.push("/dashboard")
    }
  }, [])
  
  const buttonHandler = () => {
    signInWithRedirect(auth, provider);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    
  };

  const demoLogin = async () => {
    setUser({
      uid: "guest",
      displayName: "Guest",
      email: ""
    })
    console.log(user)
    let lists = await getUserLists("guest") 
    setUserLists(lists)
    history.push("/dashboard") 
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ margin: "2rem"}}>
        <Box sx={{ padding: "1rem", textAlign: "center" }}>
          <Typography component="h1" variant="h4" sx={{ margin: "2rem"}}>
            Log in
          </Typography>
          <Button variant="contained" onClick={buttonHandler}>Log in with Google</Button>
          <Button variant="contained" sx={{margin: "1rem"}} onClick={demoLogin}>USE PUBLIC DEMO ACCOUNT</Button>
        </Box>
      </Paper>
    </Container>
  )
}
