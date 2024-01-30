// TODO: @cmckni3 2024-01-30 Implement better secrets management
const config = require('../../config');

import { ProjectsBundle } from 'gitlab';

const services = new ProjectsBundle(config);

const allProjects = () => {
  return services.Projects.all({ archived: false, membership: true });
};

module.exports = {
  services,
  allProjects,
};
