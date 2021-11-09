import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, doc, getDoc, addDoc, DocumentReference, DocumentData, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { userListsState, userState, currentListState } from '../atoms';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { TierRow } from '../interfaces/User';
import _ from 'lodash';



export default function CreateRowDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')
  const [selectedTier, setSelectedTier] = React.useState('');

  const user = useRecoilValue(userState)
  const [currentList, setCurrentList] = useRecoilState(currentListState)
  const setUserLists = useSetRecoilState(userListsState)

  const handleTierSelect = (event: SelectChangeEvent) => {
    setSelectedTier(event.target.value as string);
  };
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserLists = async (uid: string) => {
    const q = query(collection(db, "tier_lists"), where("user_id", "==", uid));
    const querySnapshot = await getDocs(q);
    const lists = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data()
      return {
        address: data.address,
        comment: data.comment,
        ranking_rows: data.ranking_rows,
        rest_name: data.rest_name,
        rest_id: data.rest_id,
        user_id: data.user_id,
        geopoint: data.geopoint,
        id: data.id
      }
    });
    return lists
  }

  const createItem = async () => {
    if (currentList) {
      const clone = _.cloneDeep(currentList.ranking_rows);
      clone[0].row_items.push({ name: "Test", comment: "test", image: ""})
      console.log(clone)
      console.log(currentList.ranking_rows)
    }
    setOpen(false);
  };

  const formChange = (value: string) => {
    setName(value)
  }

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        Add an item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add an item</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Item name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => formChange(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select a row</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTier}
              label="Select a tier"
              onChange={handleTierSelect}
            >
              {currentList ? currentList.ranking_rows.map((row: TierRow) => (
                <MenuItem key={row.row_name} value={row.row_name}>{row.row_name}</MenuItem>
              )) : null}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createItem}>Add Row</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}