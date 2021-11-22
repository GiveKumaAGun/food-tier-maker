import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userListsState, userState, currentListState } from "../atoms";
import { getUserLists } from "../util/index";


export default function CreateRowDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const user = useRecoilValue(userState);
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const setUserLists = useSetRecoilState(userListsState);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createRow = async () => {
    if (user && currentList) {
      const docRef = await doc(db, "tier_lists", currentList.id);
      await updateDoc(docRef, "ranking_rows",  [...currentList.ranking_rows, { row_name: name, row_items: [] }]);
      const updatedList = await (await getDoc(docRef)).data();
      let lists = await getUserLists(user.uid); 
      if (updatedList) {
        setCurrentList(updatedList);
      }
      setUserLists(lists);
    }
    setName("");
    setOpen(false);
  };

  const formChange = (value: string) => {
    setName(value);
  };

  return (
    <span>
      <Button color="success" variant="contained" onClick={handleClickOpen} sx={{ m: 0.5 }}>
        Add Tier
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Tier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Row name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => formChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createRow}>Add Row</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}