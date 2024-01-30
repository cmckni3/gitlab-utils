const process = require('process');

require('./utils/colors');
const gitlab_util = require('./utils/gitlab');

const debug = require('debug')('gitlab-utils:tag-checker');

const services = gitlab_util.services;
const allProjects = gitlab_util.allProjects;

async function main() {
  return await allProjects();
}

async function getTags(project) {
  return services.Tags.all(project.id).then(tags => {
    debug(tags);
    if (tags) {
      if (tags.length == 0) {
        console.log(project.name_with_namespace, ':', 'No tags found'.error);
      }
    } else {
      console.log(
        project.name_with_namespace,
        ':',
        'Empty result returned'.warn
      );
    }
    return Promise.resolve();
  });
}

main()
  .then(projects => {
    let p = Promise.resolve();
    projects.forEach(function(project) {
      const name = project.name_with_namespace;
      debug(name, project.id);
      p = p.then(() => getTags(project));
    });
    return p;
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
