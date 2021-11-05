import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ListCard(props: { name: string, comment: string, address: string}) {
  return (
    <Card color="primary" sx={{ display: "inline-block", width: "256px", backgroundColor: "primary.main", color: "primary.contrastText" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body1">
          {`"${props.comment}"`}
        </Typography>
        <Typography variant="body2">
          {`Address: ${props.address}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" variant="contained" size="small">View Details</Button>
      </CardActions>
    </Card>
  );
}

{/* <Box sx={{width: "15rem", height: "15rem"}}>
                    <GoogleMapReact bootstrapURLKeys={{ key: googleApiKey }} defaultCenter={{lat: 12, lng: 12}} defaultZoom={11}>
                      <AnyReactComponent lat={12} lng={12}></AnyReactComponent>
                    </GoogleMapReact>
                  </Box> */}