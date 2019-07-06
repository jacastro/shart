import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Img from '../../assets/nah.png';

const EmptyProjectItem = () => (
  <Card className="project-item">
    <CardMedia image={Img} />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        nada por aquí
      </Typography>
    </CardContent>
  </Card>
);

export default EmptyProjectItem;
