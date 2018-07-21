require('./colors');
const debug = require('debug')('gitlab-utils:branch-checker');
const process = require('process');

const services = require('./gitlab').services;
const allProjects = require('./gitlab').allProjects;

async function getNonMasterBranches(project) {
  return services.Branches.all(project.id).then(result => {
    debug(result);
    if (result) {
      var non_master_branches = result
        .filter(function(branch) {
          return (
            branch.name !== 'master' &&
            branch.name !== 'staging' &&
            branch.name !== 'quality-assurance'
          );
        })
        .map(function(branch) {
          return branch;
        });
      if (non_master_branches.length !== 0) {
        console.log(
          project.name_with_namespace,
          ':',
          non_master_branches
            .map(function(branch) {
              return branch.name.error;
            })
            .join(', ')
        );
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

async function main() {
  return await allProjects();
}

main()
  .then(projects => {
    let p = Promise.resolve();
    projects.forEach(function(project) {
      var name = project.name_with_namespace;
      debug(name, project.id);
      p = p.then(() => getNonMasterBranches(project));
    });
    return p;
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
