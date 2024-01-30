// TODO: @cmckni3 2024-01-30 Implement better secrets management
const config = require('../../config');

import { Gitlab } from '@gitbeaker/rest';

const api = new Gitlab({
  host: config.url,
  token: config.token
});

const services = api;

const allProjects = () => {
  return services.Projects.all({ archived: false, membership: true });
};

module.exports = {
  services,
  allProjects,
};
