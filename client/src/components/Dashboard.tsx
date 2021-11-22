import React from "react";
import { Container, Paper, Typography, Grid, Card, CardActions, Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userListsState, userState, currentListState } from "../atoms";
import ListCard from "./ListCard";
import CreateListDialog from "./CreateListDialog";
import { useHistory } from "react-router-dom";

type Props = {
  lat: number,
  lng: number,
  children?: JSX.Element;
};

export default function Dashboard() {
  const user = useRecoilValue(userState);
  const lists = useRecoilValue(userListsState);
  const history = useHistory();

  React.useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, []);


  if (user) {
    return (
      <Container>
        <Paper sx={{m: 1, p: 2 }}>
          <Typography variant="h2" textAlign="center" data-testid="greeting"> Welcome {user.displayName}</Typography>
        </Paper>
        <Paper sx={{ m: 1, p: 2 }}>
          <Typography textAlign="center" variant="h4">My lists</Typography>
          <Box data-testid="lists" sx={{ mt: 3, height: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fill, 250px)", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <Box sx={{ height: "100%", p: 1 }}>
              <Card color="primary" sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", color: "primary.contrastText", width: "230px", minHeight: "150px" }}>
                <CardActions>
                  <CreateListDialog />
                </CardActions>
              </Card>
            </Box>
            {lists.map((list) => (
              <Box key={list.rest_name} sx={{ height: "100%", p: 1 }}>
                <ListCard  name={list.rest_name} comment={list.comment ? list.comment : ""} address={list.address ? list.address : ""} listData={list}/>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    );
  } else {
    return null;
  }
  
  
}

