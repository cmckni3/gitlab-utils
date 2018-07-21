const config = require('./config');

import { ProjectsBundle } from 'gitlab';

const services = new ProjectsBundle(config);

const allProjects = () => {
  return services.Projects.all({ archived: false, membership: true });
};

module.exports = {
  services,
  allProjects,
};
