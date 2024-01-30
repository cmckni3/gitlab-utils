const process = require('process');

require('./utils/colors');
const gitlab_util = require('./utils/gitlab');

const allProjects = gitlab_util.allProjects;

const debug = require('debug')('gitlab-utils:project-tags');

async function main() {
  return await allProjects();
}

main()
  .then(projects => {
    projects
      .filter(function(project) {
        return project.tag_list.length > 0;
      })
      .forEach(function(project) {
        const name = project.name_with_namespace;
        console.log(
          name +
            ' ' +
            project.tag_list
              .map(function(t) {
                return t.info;
              })
              .join(', ')
        );
      });
    return Promise.resolve();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
