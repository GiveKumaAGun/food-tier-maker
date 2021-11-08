import { DocumentData, setDoc, doc } from '@firebase/firestore'
import React from 'react'
import { TierListInfo, TierRow } from '../interfaces/User'
import { Container, Paper, Typography, Button } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import { currentListState } from '../atoms'
import { db } from '../firebaseConfig'
import CreateRowDialog from './CreateRowDialog'

export default function ListEditor(props: { listData: DocumentData }) {
  const setCurrentList = useSetRecoilState(currentListState)
  const [list, setList] = React.useState(props.listData.ranking_rows)

  React.useEffect(() => {
    console.log('hello')
    console.log(props.listData.id)
    console.log(props.listData)
  }, [])

  const addRow = () => {
    const temp: TierRow = {
      row_items: [],
      row_name: "Test Name"
    }
    
    setList([...list, {}])
  }

  const unsetList = () => {
    setCurrentList(null)
  }

  const saveChanges = () => {
    const docRef = doc(db, "tier_lists", );
    setDoc(docRef, { ranking_rows: list }, { merge: true });
  }

  return (
    <Container>
      <Button onClick={unsetList}>Back to dashboard</Button>
      <Paper sx={{ margin: "2rem", padding: "2rem" }}>
        <Typography variant="h3">{props.listData.rest_name}</Typography>
        <CreateRowDialog listData={props.listData} />
        <Button>Add Item</Button>
        <Button onClick={saveChanges}>Save Changes</Button>
      </Paper>
    </Container>
  )
}
