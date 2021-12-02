import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userListsState, userState, currentListState } from "../../atoms";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TierRow } from "../../interfaces/TierList";
import _ from "lodash";
import { getUserLists } from "../../util";



export default function CreateItemDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [selectedTier, setSelectedTier] = React.useState("");

  const user = useRecoilValue(userState);
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const setUserLists = useSetRecoilState(userListsState);

  const handleTierSelect = (event: SelectChangeEvent) => {
    setSelectedTier(event.target.value);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createItem = async () => {
    if (user && currentList) {
      const clone = _.cloneDeep(currentList.ranking_rows);
      _.find(clone, {row_name: selectedTier}).row_items.push({ name: name, comment: comment, image: ""});

      const docRef = await doc(db, "tier_lists", currentList.id);
      await updateDoc(docRef, "ranking_rows",  clone);
      const updatedList = await (await getDoc(docRef)).data();
      let lists = await getUserLists(user.uid); 
      if (updatedList) {
        setCurrentList(updatedList);
      }
      setUserLists(lists);
    }
    setName("");
    setComment("");
    setSelectedTier("");
    setOpen(false);
  };

  const formChangeName = (value: string) => {
    setName(value);
  };

  const formChangeComment = (value: string) => {
    setComment(value);
  };

  return (
    <span>
      <Button color="success" variant="contained" onClick={handleClickOpen} sx={{ m: 0.5 }}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add an item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => formChangeName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e) => formChangeComment(e.target.value)}
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
          <Button onClick={createItem}>Add Item</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}