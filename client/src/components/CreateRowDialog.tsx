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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userListsState, userState } from '../atoms';


export default function CreateRowDialog(props: { listData: DocumentData }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [comment, setComment] = React.useState('')
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

  const createRow = async () => {
    if (user) {
      console.log(props.listData.id)
      const docRef = await doc(db, 'tier_lists', props.listData.id)
      console.log(await (await getDoc(docRef)))
      await updateDoc(docRef, "ranking_rows",  [...props.listData.ranking_rows, { row_name: name, row_items: [] }]);
      let lists = await getUserLists(user.uid) 
      setUserLists(lists)
    }
    setOpen(false);
  };

  const formChange = (value: string) => {
    setName(value)
  }

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        Add a row
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a row</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
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
    </div>
  );
}