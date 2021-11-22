import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userListsState, userState, currentListState, imageViewState } from "../atoms";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TierRow, TierItem } from "../interfaces/TierList";
import { getUserLists } from "../util";
import _ from "lodash";
import { styled } from "@mui/system";
import theme from "../theme";
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

export default function ItemViewer(props: { item: TierItem, tier: TierRow }) {
  const [openEdit, setOpenEdit] = React.useState(false);
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

  const handleCloseEdit = () => {
    setOpenEdit(false);
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
          <Typography variant="h3">
            {props.item.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "1rem" }}>
            {image ? <img style={{ width: "70%", height: "auto"}} src={`data:image/png;base64,${image}`} /> : <Typography>The creator of this list has not uploaded an image</Typography>}
          </div>
          <Typography variant="h5">
            Comment:
          </Typography>
          <Typography variant="body1" style={{ fontStyle: "italic" }}>
            {props.item.comment ? props.item.comment : "none"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseEdit}>Close</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}