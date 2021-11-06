import { DocumentData } from '@firebase/firestore'
import React from 'react'
import { TierListInfo } from '../interfaces/User'
import { Container, Paper, Typography } from '@mui/material'

export default function ListEditor(props: { listData: DocumentData }) {
  return (
    <Container>
      <Paper>
        <Typography variant="h3">{props.listData.rest_name}</Typography>
      </Paper>
    </Container>
  )
}
