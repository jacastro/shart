import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Img from '../../assets/nah.png';

const EmptyProjectItem = () => (
  <div className="project-item">
    <CardMedia image={Img} />
    <CardContent>
      <Typography variant="body" align="center" color="textSecondary" component="p">
        No encontramos ningún proyecto con este criterio
      </Typography>
    </CardContent>
  </div>
);

export default EmptyProjectItem;
