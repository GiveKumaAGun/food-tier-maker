import React from "react"
import { Container, Paper, Typography, Grid, Card, CardActions } from "@mui/material"
import { useRecoilValue } from "recoil"
import { userListsState, userState, currentListState } from "../atoms"
import ListCard from "./ListCard";
import Login from "./Login"
import CreateListDialog from "./CreateListDialog"
import ListEditor from "./ListEditor"
import { useHistory } from "react-router-dom"

type Props = {
  lat: number,
  lng: number,
  children?: JSX.Element;
};

export default function Dashboard() {
  const user = useRecoilValue(userState)
  const lists = useRecoilValue(userListsState)
  const currentList = useRecoilValue(currentListState)
  const history = useHistory()

  React.useEffect(() => {
    if (!user) {
      history.push("/")
    }
  }, [])


  if (user) {
    return (
      <Container>
        <Paper sx={{margin: "1rem", padding: "2rem" }}>
          <Typography variant="h2" textAlign="center"> Welcome {user.displayName}</Typography>
        </Paper>
        <Paper sx={{margin: "1rem", padding: "2rem" }}>
          <Typography textAlign="center" variant="h4">My lists</Typography>
          <Grid container alignItems="stretch" sx={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
            <Grid item style={{display: "flex", padding: "1rem"}} >
              <Card color="primary" sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", color: "primary.contrastText", width: "256px" }}>
                <CardActions>
                  <CreateListDialog />
                </CardActions>
              </Card>
            </Grid>
            {lists.map((list) => (
              <Grid key={list.rest_name} item sx={{ display: "flex", padding: "1rem" }}>
                <ListCard  name={list.rest_name} comment={list.comment ? list.comment : ""} address={list.address ? list.address : ""} listData={list}/>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    )
  } else {
    return null
  }
  
  
}

