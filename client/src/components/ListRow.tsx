import React from 'react'
import { Stack, Divider, Paper } from '@mui/material'
import { TierRow } from '../interfaces/User'
import { styled } from '@mui/material/styles';
import theme from '../theme'

const Item = styled(Paper)({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.secondary.main
})

export default function ListRow(props: { rowData: TierRow}) {
  return (
    <Stack 
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2} >
      <Item>{props.rowData.row_name}</Item>
      {props.rowData.row_items.map((item) => (
        <Item key={item.name}>Test</Item>
      ))}
    </Stack>
  )
}
