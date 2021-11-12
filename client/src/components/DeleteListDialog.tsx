import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userListsState, userState, currentListState } from "../atoms";
import { TierRow } from "../interfaces/TierList";
import { Box, DialogContentText, IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import _ from "lodash";
import { getUserLists } from "../util";
import { useHistory } from "react-router-dom";

export default function DeleteListDialog() {
  const [open, setOpen] = React.useState(false);
  const user = useRecoilValue(userState);
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const setUserLists = useSetRecoilState(userListsState);
  const history = useHistory();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteList = async () => {
    if (user && currentList) {
      await deleteDoc(doc(db, "tier_lists", currentList.id));
      let lists = await getUserLists(user.uid); 
      setUserLists(lists);
      history.push("/dashboard");
    }
  };

  return (
    <span>
      <Button color="error" variant="contained" onClick={handleClickOpen} sx={{ m: 0.5 }}>
        Delete list
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete list</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this list and all of its contents?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={deleteList}>Delete</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}