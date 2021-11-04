import React from 'react'
import { Container, Paper, Typography, Button } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { userListsState, userState } from '../atoms'
import { collection, doc, getDoc, setDoc, DocumentReference, DocumentData, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleApiKey } from '../firebaseConfig'
import axios from 'axios';
import { TierList } from '../interfaces/User';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

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



  if (user) {
    return (
      <Container>
        <Paper sx={{margin: "1rem", padding: "2rem"}}>
          <Typography variant="h2" textAlign="center"> Welcome {user.displayName}</Typography>
        </Paper>
        <Paper sx={{margin: "1rem", padding: "2rem"}}>
          <Typography variant="h4">My lists</Typography>
          {lists.map((list) => (
            <Paper key={list.rest_id} sx={{backgroundColor: "primary.main", margin: "1rem", padding: "1rem", color: "primary.contrastText"}}>
              <Typography variant="h5">{list.rest_name}</Typography>
              <div style={{width: "15rem", height: "15rem"}}>
                <GoogleMapReact bootstrapURLKeys={{ key: googleApiKey }} defaultCenter={{lat: 12, lng: 12}} defaultZoom={11}>
                  <AnyReactComponent lat={12} lng={12}></AnyReactComponent>
                </GoogleMapReact>
              </div>
            </Paper>
          ))}
          <Paper sx={{backgroundColor: "secondary.main", margin: "1rem", padding: "1rem", color: "secondary.contrastText", textAlign: "center"}}>
            <Typography variant="h5">Add a new restaurant</Typography>
          </Paper>
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

