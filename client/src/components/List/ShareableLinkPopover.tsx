import * as React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export default function ShareableLinkPopover(props: { listId: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [clicked, setClicked] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://menu-item-ranker.an.r.appspot.com/lists/view/${props.listId}`);
    setClicked(true);
  };

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="success" onClick={handleClick}>
        Get Shareable Link
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" >Shareable Link</Typography>
          <Typography sx={{ marginBlock: 2, p: 2, backgroundColor: "rgba(5, 5, 5, .1)", borderRadius: "4px", wordBreak: "break-all" }}>{`https://menu-item-ranker.an.r.appspot.com/lists/view/${props.listId}`}</Typography>
          <Button 
            variant="contained"
            color="success"
            onClick={copyToClipboard}
            sx={{ marginBlock: 2}}
          >
          Copy to Clipboard
          </Button>
          {clicked ? <Alert sx={{ marginBlock: 2}} severity="success">Copied to Clipboard</Alert> : null}
        </Box>
      </Popover>
    </div>
  );
}