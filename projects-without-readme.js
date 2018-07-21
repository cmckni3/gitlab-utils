require('./colors');
const debug = require('debug')('gitlab-utils:project-tags');
const process = require('process');

const services = require('./gitlab').services;
const allProjects = require('./gitlab').allProjects;

async function main() {
  return await allProjects();
}

async function findReadmeFiles(project) {
  return services.Repositories.tree(project.id, {})
    .then(result => {
      if (result) {
        const readme_files = result
          .filter(function(object) {
            return object.type === 'blob';
          })
          .filter(function(object) {
            return /readme.md/i.test(object.name.toLowerCase());
          });
        if (readme_files.length > 0) {
          const opts = {
            projectId: project.id,
            file_path: readme_files[0].name,
            ref: 'master',
          };
          return services.RepositoryFiles.showRaw(
            opts.projectId,
            opts.file_path,
            opts.ref
          ).then(result => {
            if (!result || result.length === 0) {
              console.log(('No readme for ' + project.name).error);
            }
            return Promise.resolve();
          });
        } else {
          console.log(('No readme for ' + project.name).error);
          return Promise.resolve();
        }
      } else {
        console.log(('Could not retrieve tree for ' + project.name).warn);
        return Promise.resolve();
      }
    })
    .catch(err => {
      return Promise.resolve();
    });
}

main()
  .then(projects => {
    let p = Promise.resolve();
    projects
      .map(function(project) {
        return { id: project.id, name: project.name_with_namespace };
      })
      .forEach(function(project) {
        if (project.name === 'calendar-mover') console.log(project);
        debug(project.name, project.id);
        p = p.then(() => findReadmeFiles(project));
      });
    return p;
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
