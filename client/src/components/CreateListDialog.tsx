import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, doc, getDoc, addDoc, DocumentReference, DocumentData, query, where, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userListsState, userState } from "../atoms";


export default function CreateListDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [comment, setComment] = React.useState("")
  const user = useRecoilValue(userState)
  const setUserLists = useSetRecoilState(userListsState)

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

  const createList = async () => {
    if (user) {
      const docRef = await addDoc(collection(db, "tier_lists"), {
        rest_name: name,
        address: address,
        comment: comment,
        ranking_rows: [],
        user_id: user.uid,
      })
      await setDoc(docRef, { id: docRef.id }, { merge: true });
      let lists = await getUserLists(user.uid) 
      setUserLists(lists)
    }
    setOpen(false);
  };

  const formChangeName = (value: string) => {
    setName(value)
  }
  const formChangeComment = (value: string) => {
    setComment(value)
  }
  const formChangeAddress = (value: string) => {
    setAddress(value)
  }

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        Create new list
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New List</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Restaurant Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => formChangeName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            value={address}
            onChange={(e) => formChangeAddress(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createList}>Create List</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}