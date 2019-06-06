import React, { useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import AppContext from '../../context';

class Project extends React.Component {
  state = {
    project: null,
  };

  componentDidMount() {
    fetch(`/api/projects/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(project => this.setState({ project }));
  }

  render() {
    const { project } = this.state;

    return (
      <React.Fragment>
        {project == null ? <CircularProgress /> : (
          <Card className="card-project">
            <CardHeader title={project.name} subheader={`Categoría: ${project.category}`} />
            {project.images.length > 0
            && <CardMedia className="card-media" image={project.images[0]} />
            }
            <CardContent>
              <Typography>{project.description}</Typography>
              {project.tags.length > 0
                && <Typography variant="overline" gutterBottom>Tags: </Typography>
              }
              {project.tags.map((tag, index) => (
                <Chip key={tag} className="card-tags" label={tag} component="a" href={`/tag/${tag}`} />
              ))}
            </CardContent>
            <CardActions />
          </Card>
        )}
      </React.Fragment>
    );
  }
}

Project.contextType = AppContext;

export default Project;
