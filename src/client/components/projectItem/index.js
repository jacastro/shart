import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import AppContext from '../../context';

const ProjectItem = ({ id, name, description, category, tags, owner }) => {
  const { user } = useContext(AppContext);
  const goTo = owner.id === user.id ? `/me/projects/modify/${id}` : `/projects/${id}`;
  return (
    <Card className="project-item">
      <Link to={goTo}>
        <CardActionArea>
          <CardMedia
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {category}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
          <CardContent>
            {tags.map(tag => <Chip label={tag} />)}
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
      { owner.id === user.id ? 
        <Button size="small" color="primary">
          Ver mi proyecto
        </Button>
      :
        <Button size="small" color="primary">
          Formar parte
        </Button>
      }
      </CardActions>
    </Card>
  )
}

ProjectItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

ProjectItem.defaultProps = {
  name: 'A project item',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta est a neque posuere, fringilla auctor ante consectetur.',
  category: 'A category',
  tags: ['Diseño', 'Toys'],
};

export default ProjectItem;
