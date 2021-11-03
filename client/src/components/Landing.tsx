import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { userListsState, userState } from '../atoms'
import { collection, doc, getDoc, setDoc, DocumentReference, DocumentData, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../firebaseConfig'


function Landing() {
  const user = useRecoilValue(userState)
  const lists = useRecoilValue(userListsState)

  React.useEffect(() => {
  }, [])


  if (user) {
    return (
      <Container>
        <Paper sx={{margin: "1rem", padding: "2rem"}}>
          <Typography variant="h2" textAlign="center"> Welcome {user.displayName}</Typography>
          <Typography></Typography>
          {lists.map((element) => (
            <div key={element.id}>{element.rest_name}</div>
          ))}
        </Paper>
      </Container>
    )
  } else {
    return (
      <Container>
        Not signed in
      </Container>
    )
  }

  
}


export default Landing

