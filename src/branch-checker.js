const process = require('process');

require('./utils/colors');
const gitlab_util = require('./utils/gitlab');

const services = gitlab_util.services;
const allProjects = gitlab_util.allProjects;

const debug = require('debug')('gitlab-utils:branch-checker');

const BRANCHES_TO_EXCLUDE = ['master', 'staging', 'quality-assurance'];

async function getNonMasterBranches(project) {
  return services.Branches.all(project.id).then(result => {
    debug(result);
    if (result) {
      const non_master_branches = result
        .filter(function(branch) {
          return BRANCHES_TO_EXCLUDE.indexOf(branch.name) == -1;
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
      const name = project.name_with_namespace;
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
