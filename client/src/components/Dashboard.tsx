import React from 'react'
import { Container, Paper, Typography, Button, Box, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { userListsState, userState } from '../atoms'
import { collection, doc, getDoc, setDoc, DocumentReference, DocumentData, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleApiKey } from '../firebaseConfig'
import axios from 'axios';
import { TierListInfo } from '../interfaces/User';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import ListCard from './ListCard';
import Login from './Login'
import CreateListDialog from './CreateListDialog'

type Props = {
  lat: number,
  lng: number,
  children?: JSX.Element;
};


const AnyReactComponent = ({ lat, lng, children }: Props) => <div>{children}</div>;

export default function Dashboard() {
  const user = useRecoilValue(userState)
  const lists = useRecoilValue(userListsState)
  const [results, setResults] = React.useState([])

  React.useEffect(() => {
    console.log(lists)
    console.log(lists)
  }, [lists])

  if (user) {
    return (
      <Container>
        <Paper sx={{margin: "1rem", padding: "2rem"}}>
          <Typography variant="h2" textAlign="center"> Welcome {user.displayName}</Typography>
        </Paper>
        <Paper sx={{margin: "1rem", padding: "2rem"}}>
          <Typography variant="h4">My lists</Typography>
          <Grid container>
            <Grid container item sm={3} sx={{ backgroundColor: "primary.main", color: "primary.contrastText", width: "256px", minWidth: "256px", height: "192px", margin: "1rem", alignItems: "center", justifyContent: "center", borderRadius: "4px" }}>
              <CreateListDialog />
            </Grid>
            {lists.map((list) => (
              <Grid key={list.rest_name} item sm={3} sx={{ margin: "1rem" }}>
                <ListCard  name={list.rest_name} comment={list.comment ? list.comment : ''} address={list.address ? list.address : ''} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    )
  } else {
    return (
      <Container>
        <Login />
      </Container>
    )
  }

  
}

