import { DocumentData, setDoc, doc } from '@firebase/firestore'
import React from 'react'
import { TierListInfo, TierRow } from '../interfaces/User'
import { Container, Paper, Typography, Button, Stack, Divider } from '@mui/material'
import { useRecoilState } from 'recoil'
import { currentListState } from '../atoms'
import CreateRowDialog from './CreateRowDialog'
import CreateItemDialog from './CreateItemDialog'
import ListRow from './ListRow'

export default function ListEditor() {
  const [currentList, setCurrentList] = useRecoilState(currentListState)

  React.useEffect(() => {
  }, [])

  const unsetList = () => {
    setCurrentList(null)
  }

  const saveChanges = () => {
    if (currentList) {
      // const docRef = doc(db, "tier_lists", );
      // setDoc(docRef, { ranking_rows: currentList.ranking_rows }, { merge: true });
    }
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
            spacing={1} >
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
