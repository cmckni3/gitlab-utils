require('./colors');
const debug = require('debug')('gitlab-utils:tag-checker');
const process = require('process');

const services = require('./gitlab').services;
const allProjects = require('./gitlab').allProjects;

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
