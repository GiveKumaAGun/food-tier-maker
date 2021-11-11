import { DocumentData, setDoc, doc, getDoc } from "@firebase/firestore"
import React from "react"
import { TierListInfo, TierRow } from "../interfaces/TierList"
import { Container, Paper, Typography, Button, Stack, Divider } from "@mui/material"
import { useRecoilState } from "recoil"
import { currentListState } from "../atoms"
import CreateRowDialog from "./CreateRowDialog"
import CreateItemDialog from "./CreateItemDialog"
import ListRow from "./ListRow"
import { useParams } from "react-router-dom"
import { db } from "../firebaseConfig"
import { useHistory } from "react-router-dom"


export default function ListEditor() {
  const [currentList, setCurrentList] = useRecoilState(currentListState)
  const { list_id } = useParams<{list_id: string}>()
  const history = useHistory()

  const fetchListData = async () => {
    const docRef = await doc(db, "tier_lists", list_id);
    const docSnap = await getDoc(docRef);
    if (docSnap) {
      const listData = await docSnap.data();
      if (listData) {
        setCurrentList(listData)
      }
    }
  }

  React.useEffect(() => {
    if (!currentList) {
      fetchListData()
    }
  }, [])

  const unsetList = () => {
    setCurrentList(null)
    history.push("/dashboard")
  }

  if (currentList) {
    return (
      <Container>
        <Button onClick={unsetList} color="secondary" variant="contained" sx={{ margin: 2}}>Back to dashboard</Button>
        <Paper sx={{ margin: 1, padding: 4 }}>
          <Typography variant="h3">{currentList.rest_name}</Typography>
          <CreateRowDialog />
          <CreateItemDialog />
          <Stack 
            sx={{ marginBlock: 2 }}
          >
            {currentList.ranking_rows.map((row: TierRow) => {
              return (
                <ListRow key={row.row_name} rowData={row} />
              )
            })}
          </Stack>
        </Paper>
      </Container>
    )
  } else { // error if this somehow occurs
    return null
  }
  
}
