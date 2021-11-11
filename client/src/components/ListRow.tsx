import React from 'react'
import { Stack, Divider, Paper, Box, Button, Typography } from '@mui/material'
import { TierRow } from '../interfaces/User'
import { styled } from '@mui/material/styles';
import theme from '../theme'

const Row = styled(Box)({
  textAlign: 'left',
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
})

const RowName = styled(Box)({
  margin: theme.spacing(1),
  height: "100px",
  width: "100px",
  minWidth: "100px",
  padding: theme.spacing(1),
  textAlign: 'left',
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const RowItem = styled(Button)({
  margin: theme.spacing(1),
  height: "100px",
  width: "100px",
  minWidth: "100px",
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textTransform: "none",
  ":hover": {
    backgroundColor: theme.palette.primary.dark
  }
})

const ItemContainer = styled(Box)({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
})

export default function ListRow(props: { rowData: TierRow}) {
  return (
      <Row>
        <RowName>
          <Typography variant="h5">{props.rowData.row_name}</Typography>
        </RowName>
        {props.rowData.row_items.map((item) => (
          <RowItem key={item.name}>{item.comment ? item.name + "*" : item.name}</RowItem>
        ))}
      </Row>
  )
}
