import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userListsState, userState, currentListState, imageViewState } from "../../atoms";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TierRow, TierItem } from "../../interfaces/TierList";
import { getUserLists } from "../../util";
import _ from "lodash";
import { styled } from "@mui/system";
import theme from "../../theme";
import { DialogContentText } from "@mui/material";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

const RowItem = styled(Button)({
  margin: theme.spacing(1),
  height: "100px",
  width: "100px",
  minWidth: "100px",
  textTransform: "none",
});

export default function Item(props: { item: TierItem, tier: TierRow }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [name, setName] = React.useState(props.item.name);
  const [comment, setComment] = React.useState(props.item.comment);
  const [tier, setTier] = React.useState(props.tier.row_name);
  const [image, setImage] = React.useState(null);
  const imageView = useRecoilValue(imageViewState);

  const user = useRecoilValue(userState);
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const setUserLists = useSetRecoilState(userListsState);

  const fetchImage = async () => {
    if (currentList) {
      if (props.item.image) {
        let response = await axios.get(`/api/images/${props.item.image}`);
        setImage(response.data);
      }
    }
  };

  React.useEffect(() => {
    fetchImage();
  }, [currentList]);
  
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const formChangeName = (value: string) => {
    if (value.length < 42) { // temp arbitrary
      setName(value);
    }
  };

  const formChangeComment = (value: string) => {
    setComment(value);
  };

  const formChangeTier = (event: SelectChangeEvent) => {
    setTier(event.target.value);
  };

  const saveChanges = async () => {
    if (user && currentList) {
      const clone = _.cloneDeep(currentList.ranking_rows);
      const rowIndex = _.findIndex(clone, {row_name: props.tier.row_name});
      const itemIndex = _.findIndex(clone[rowIndex].row_items, { name: props.item.name });
      const newRowIndex = _.findIndex(clone, {row_name: tier});
      const removed = clone[rowIndex].row_items.splice(itemIndex, 1);
      clone[newRowIndex].row_items.push({ name: name, comment: comment, image: removed[0].image});
      
      const docRef = await doc(db, "tier_lists", currentList.id);
      await updateDoc(docRef, "ranking_rows",  clone);
      const updatedList = await (await getDoc(docRef)).data();
      let lists = await getUserLists(user.uid); 
      if (updatedList) {
        setCurrentList(updatedList);
      }
      setUserLists(lists);
    }
    setOpenEdit(false);
  };

  const deleteItem = async () => {
    if (user && currentList) {
      const clone = _.cloneDeep(currentList.ranking_rows);
      const rowIndex = _.findIndex(clone, {row_name: props.tier.row_name});
      const itemIndex = _.findIndex(clone[rowIndex].row_items, { name: props.item.name });
      clone[rowIndex].row_items.splice(itemIndex, 1);
      
      const docRef = await doc(db, "tier_lists", currentList.id);
      await updateDoc(docRef, "ranking_rows",  clone);
      const updatedList = await (await getDoc(docRef)).data();
      let lists = await getUserLists(user.uid); 
      if (updatedList) {
        setCurrentList(updatedList);
      }
      setUserLists(lists);
    }
    setOpenEdit(false);
    setOpenDelete(false);
  };

  const uploadFile = async  (e: HTMLInputElement) => {
    const imageId = uuidv4();
    let formData = new FormData();
    

    if (user && currentList) {
      const clone = _.cloneDeep(currentList.ranking_rows);
      const rowIndex = _.findIndex(clone, {row_name: props.tier.row_name});
      const itemIndex = _.findIndex(clone[rowIndex].row_items, { name: props.item.name });
      const newRowIndex = _.findIndex(clone, {row_name: tier});
      const removed = clone[rowIndex].row_items.splice(itemIndex, 1);
      clone[newRowIndex].row_items.push({ name: removed[0].name, comment: removed[0].comment, image: imageId});

      if (e.files) {

        formData.append("file", e.files[0]);
  
        await axios({
          url: `/api/image?${"imageId=" + imageId + "&prevImageId=" + removed[0].image}`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formData
        });
      }
      
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
    <span>
      <RowItem color="primary" variant="contained" onClick={handleClickOpenEdit}>
        {image ? <img hidden={imageView ? false: true} style={{ width: "100px", height: "100px", borderRadius: "4px"}} src={`data:image/png;base64,${image}`} /> : null}
        {image && imageView ? <Typography variant="body1" component="span" sx={{ position:"absolute", bottom: 1, backgroundColor: "rgba(5, 5, 5, .3)", width: "100%" }}>{props.item.name}</Typography> : null}
        <Typography hidden={imageView && image ? true : false} sx={{ lineHeight: 1 }}>{props.item.comment ? props.item.name + "*" : props.item.name}</Typography>
      </RowItem>
      {/* DIALOG FOR EDIT ITEM */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between"}}>
          Edit Item Details
          <Button color="error" variant="contained" onClick={handleClickOpenDelete}>Delete</Button>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "1rem" }}>
            {image ? <img style={{ width: "70%", height: "auto"}} src={`data:image/png;base64,${image}`} /> : null}
            <Button variant="contained" component="label" sx={{ margin: 1 }}>
              <input onChange={(e) => uploadFile(e.target)} type="file" id="image" name="image" accept="image/png, image/jpeg" hidden />
            Upload an image
            </Button>
          </div>
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
            multiline={true}
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
            <InputLabel id="tier-select-label">Select a row</InputLabel>
            <Select
              labelId="tier-select-label"
              id="tier-select"
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
          <Button variant="outlined" onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="contained" onClick={saveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
      {/* DIALOG FOR DELETE ITEM */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{props.item.name}&quot;?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDelete}>Cancel</Button>
          <Button variant="contained" onClick={deleteItem}>Delete</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}