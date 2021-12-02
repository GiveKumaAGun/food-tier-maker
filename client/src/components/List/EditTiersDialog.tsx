import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userListsState, userState, currentListState } from "../../atoms";
import { TierRow } from "../../interfaces/TierList";
import { Box, IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import _ from "lodash";
import { getUserLists } from "../../util";

export default function EditTiersDialog(props: { tiers: TierRow[] }) {
  const [open, setOpen] = React.useState(false);
  const user = useRecoilValue(userState);
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const setUserLists = useSetRecoilState(userListsState);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TierEdit = (props: { tier: TierRow, index: number }) => {
    const [name, setName] = React.useState(props.tier.row_name);

    const formChange = (value: string) => {
      setName(value);
    };

    const saveChange = async () => {
      if (user && currentList) {
        const clone = _.cloneDeep(currentList.ranking_rows);
        const rowIndex = _.findIndex(clone, {row_name: props.tier.row_name});
        clone[rowIndex].row_name = name;
        
        const docRef = await doc(db, "tier_lists", currentList.id);
        await updateDoc(docRef, "ranking_rows",  clone);
        const updatedList = await (await getDoc(docRef)).data();
        let lists = await getUserLists(user.uid); 
        if (updatedList) {
          setCurrentList(updatedList);
        }
        setUserLists(lists);
      }
    };

    const deleteRow = async () => {
      if (user && currentList) {
        const clone = _.cloneDeep(currentList.ranking_rows);
        const rowIndex = _.findIndex(clone, {row_name: props.tier.row_name});
        clone.splice(rowIndex, 1);
        
        const docRef = await doc(db, "tier_lists", currentList.id);
        await updateDoc(docRef, "ranking_rows",  clone);
        const updatedList = await (await getDoc(docRef)).data();
        let lists = await getUserLists(user.uid); 
        if (updatedList) {
          setCurrentList(updatedList);
        }
        setUserLists(lists);
      }
    };

    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TextField sx={{ m: 1 }} onBlur={saveChange} value={name} onChange={(e) => formChange(e.target.value)}></TextField>
        <IconButton onClick={deleteRow}>
          <RemoveCircleIcon color="error" fontSize="large" />
        </IconButton>
      </Box>
    );
  };

  return (
    <span>
      <Button color="warning" variant="contained" onClick={handleClickOpen} sx={{ m: 0.5 }}>
        Edit tiers
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit tiers</DialogTitle>
        <DialogContent>
          {props.tiers.map((tier, index) => (
            <TierEdit index={index} key={tier.row_name} tier={tier} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}