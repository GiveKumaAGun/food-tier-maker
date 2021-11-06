import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { TierListInfo } from '../interfaces/User';
import { DocumentData } from '@firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { currentListState } from '../atoms';

export default function ListCard(props: { name: string, comment: string, address: string, listData: DocumentData}) {
  const setCurrentList = useSetRecoilState(currentListState)

  React.useEffect(() => {
    console.log(props.listData)
  }, [])

  const buttonHandler = () => {
    setCurrentList(props.listData)
  }

  return (
    <Card color="primary" sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', backgroundColor: "primary.main", color: "primary.contrastText", width: "256px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          {`${props.comment}`}
        </Typography>
        <Typography variant="body2">
          {props.address ? `Address: ${props.address}` : null}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" variant="contained" size="small" onClick={buttonHandler}>View Details</Button>
      </CardActions>
    </Card>
  );
}

{/* <Box sx={{width: "15rem", height: "15rem"}}>
                    <GoogleMapReact bootstrapURLKeys={{ key: googleApiKey }} defaultCenter={{lat: 12, lng: 12}} defaultZoom={11}>
                      <AnyReactComponent lat={12} lng={12}></AnyReactComponent>
                    </GoogleMapReact>
                  </Box> */}