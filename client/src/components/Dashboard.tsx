import React from 'react'
import { Container, Paper, Typography, Button, Box, Grid, Card, CardActions } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { userListsState, userState, currentListState } from '../atoms'
import { collection, doc, getDoc, setDoc, DocumentReference, DocumentData, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleApiKey } from '../firebaseConfig'
import axios from 'axios';
import { TierListInfo } from '../interfaces/User';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import ListCard from './ListCard';
import Login from './Login'
import CreateListDialog from './CreateListDialog'
import ListEditor from './ListEditor'

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
  const currentList = useRecoilValue(currentListState)

  React.useEffect(() => {
    console.log(lists)
    console.log(lists)
  }, [lists])

  if (user) {
    if (!currentList) {
      return (
        <Container>
          <Paper sx={{margin: "1rem", padding: "2rem" }}>
            <Typography variant="h2" textAlign="center"> Welcome {user.displayName}</Typography>
          </Paper>
          <Paper sx={{margin: "1rem", padding: "2rem" }}>
            <Typography textAlign="center" variant="h4">My lists</Typography>
            <Grid container sm={12} alignItems="stretch" sx={{ display: 'flex', alignItems: 'stretch', justifyContent: "center" }}>
              <Grid item style={{display: 'flex', padding: '1rem'}} >
                <Card color="primary" sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", backgroundColor: "primary.main", color: "primary.contrastText", width: "256px" }}>
                  <CardActions>
                    <CreateListDialog />
                  </CardActions>
                </Card>
              </Grid>
              {lists.map((list) => (
                <Grid key={list.rest_name} item sx={{ display: 'flex', padding: "1rem" }}>
                  <ListCard  name={list.rest_name} comment={list.comment ? list.comment : ''} address={list.address ? list.address : ''} listData={list}/>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      )
    } else {
      return (
        <ListEditor listData={currentList} />
      )
    }
  } else {
    return (
      <Container>
        <Login />
      </Container>
    )
  }

  
}

