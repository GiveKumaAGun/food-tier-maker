import { DocumentData, setDoc, doc } from '@firebase/firestore'
import React from 'react'
import { TierListInfo, TierRow } from '../interfaces/User'
import { Container, Paper, Typography, Button, Stack, Divider } from '@mui/material'
import { useRecoilState } from 'recoil'
import { currentListState } from '../atoms'
import { db } from '../firebaseConfig'
import CreateRowDialog from './CreateRowDialog'
import CreateItemDialog from './CreateItemDialog'
import { styled } from '@mui/material/styles';
import theme from '../theme'
import ListRow from './ListRow'


const Item = styled(Paper)({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.secondary.main
})

export default function ListEditor() {
  const [currentList, setCurrentList] = useRecoilState(currentListState)

  React.useEffect(() => {
  }, [])

  const unsetList = () => {
    setCurrentList(null)
  }

  const saveChanges = () => {
    if (currentList) {
      const docRef = doc(db, "tier_lists", );
      setDoc(docRef, { ranking_rows: currentList.ranking_rows }, { merge: true });
    }
  }

  if (currentList) {
    return (
      <Container>
        <Button onClick={unsetList}>Back to dashboard</Button>
        <Paper sx={{ margin: "2rem", padding: "2rem" }}>
          <Typography variant="h3">{currentList.rest_name}</Typography>
          <CreateRowDialog />
          <CreateItemDialog />
          <Button onClick={saveChanges}>Save Changes</Button>
          {currentList.ranking_rows.map((row: TierRow) => {
            return (
              <ListRow key={row.row_name} rowData={row} />
            )
          })}
        </Paper>
      </Container>
    )
  } else { // error if this somehow occurs
    return null
  }
  
}
