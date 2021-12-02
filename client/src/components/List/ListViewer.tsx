import { doc, getDoc } from "@firebase/firestore";
import React from "react";
import { TierRow } from "../../interfaces/TierList";
import { Container, Paper, Typography, Button, Stack, Switch, Box } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentListState, imageViewState, userState } from "../../atoms";
import CreateRowDialog from "./CreateRowDialog";
import CreateItemDialog from "./CreateItemDialog";
import EditTiersDialog from "./EditTiersDialog";
import ListRow from "./ListRow";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import DeleteListDialog from "./DeleteListDialog";
import axios from "axios";
import _ from "lodash";
import ListRowViewer from "./ListRowViewer";


export default function ListViewer() {
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const { list_id } = useParams<{list_id: string}>();
  const history = useHistory();
  const user = useRecoilValue(userState);
  const [imageView, setImageView] = useRecoilState(imageViewState);

  const fetchListData = async () => {
    const docRef = await doc(db, "tier_lists", list_id);
    const docSnap = await getDoc(docRef);
    if (docSnap) {
      const listData = await docSnap.data();
      if (listData) {
        setCurrentList(listData);
      }
    }
  };

  React.useEffect(() => {
    if (!currentList) {
      fetchListData();
    }
    return () => {
      setImageView(false);
    };
  }, []);

  const unsetList = () => {
    setCurrentList(null);
    history.push("/dashboard");
  };

  const toggleImageView = () => {
    setImageView(!imageView);
  };

  if (currentList) {
    return (
      <Container>
        <Button onClick={unsetList} color="secondary" variant="contained" sx={{ margin: 2}}>Back to dashboard</Button>
        <Paper sx={{ margin: 1, padding: 4 }}>
          <Typography variant="h3">{currentList.rest_name}</Typography>
          <div style={{ marginLeft: "0.3rem" }}>
            <Typography component="span">Show Images</Typography>
            <Switch checked={imageView} onChange={toggleImageView} />
          </div>
          <Stack 
            sx={{ marginBlock: 1 }}
          >
            {currentList.ranking_rows.map((row: TierRow) => {
              return (
                <ListRowViewer key={row.row_name} rowData={row} />
              );
            })}
          </Stack>
        </Paper>
      </Container>
    );
  } else { // error if this somehow occurs
    return <Button onClick={unsetList} color="secondary" variant="contained" sx={{ margin: 2}}>Back to dashboard</Button>;
  }
  
}
