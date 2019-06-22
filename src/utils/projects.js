const wasPostuled = ({ postulants }, meId, phaseId, taskId) => postulants.find(postulant => (
  postulant.task_id === taskId
    && postulant.phase === phaseId
    && (
      (postulant.collaborator
      && postulant.collaborator.id === meId)
      || postulant.collaborator_id === meId
    )
));

const getPostulants = ({ postulants }, phaseId, taskId) => postulants.filter(postulant => (
  postulant.task_id === taskId
    && postulant.phase === phaseId
));

module.exports = {
  wasPostuled,
  getPostulants,
};
