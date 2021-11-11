import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userListsState, userState, currentListState } from "../atoms";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TierRow, TierItem } from "../interfaces/TierList";
import { getUserLists } from "../util";
import _ from "lodash";
import { styled } from "@mui/system";
import theme from "../theme";

const RowItem = styled(Button)({
  margin: theme.spacing(1),
  height: "100px",
  width: "100px",
  minWidth: "100px",
  padding: theme.spacing(1),
  textAlign: "center",
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

export default function Item(props: { item: TierItem, tier: TierRow }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(props.item.name)
  const [comment, setComment] = React.useState(props.item.comment)
  const [tier, setTier] = React.useState(props.tier.row_name);

  const user = useRecoilValue(userState)
  const [currentList, setCurrentList] = useRecoilState(currentListState)
  const setUserLists = useSetRecoilState(userListsState)
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formChangeName = (value: string) => {
    if (value.length < 42) {
      setName(value)
    }
  }

  const formChangeComment = (value: string) => {
    setComment(value)
  }

  const formChangeTier = (event: SelectChangeEvent) => {
    setTier(event.target.value);
  };

  const saveChanges = async () => {
    if (user && currentList) {
      const clone = _.cloneDeep(currentList.ranking_rows);
      const rowIndex = _.findIndex(clone, {row_name: props.tier.row_name})
      const itemIndex = _.findIndex(clone[rowIndex].row_items, { name: props.item.name })
      const newRowIndex = _.findIndex(clone, {row_name: tier})
      clone[rowIndex].row_items.splice(itemIndex, 1)
      clone[newRowIndex].row_items.push({ name: name, comment: comment, image: ""})
      
      const docRef = await doc(db, "tier_lists", currentList.id)
      await updateDoc(docRef, "ranking_rows",  clone);
      const updatedList = await (await getDoc(docRef)).data()
      let lists = await getUserLists(user.uid) 
      if (updatedList) {
        setCurrentList(updatedList)
      }
      setUserLists(lists)
    }
    setOpen(false);
  };

  return (
    <span>
      <RowItem color="secondary" variant="contained" onClick={handleClickOpen} sx={{ m: 0.5 }}>
        {props.item.comment ? props.item.name + "*" : props.item.name}
      </RowItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Item Details</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            sx={{ mb: 2 }}
            onChange={(e) => formChangeName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={comment}
            sx={{ mb: 4 }}
            onChange={(e) => formChangeComment(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select a row</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tier}
              label="Select a tier"
              onChange={formChangeTier}
            >
              {currentList ? currentList.ranking_rows.map((row: TierRow) => (
                <MenuItem key={row.row_name} value={row.row_name}>{row.row_name}</MenuItem>
              )) : null}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={saveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}