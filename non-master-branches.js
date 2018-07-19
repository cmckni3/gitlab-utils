var gitlab = require('./gitlab');
require('./colors');
var debug = require('debug')('gitlab-utils:branch-checker');

gitlab.projects.all({ archived: false }, function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listBranches(project.id, function(result) {
      debug(name, project.id);
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
            name,
            ':',
            non_master_branches
              .map(function(branch) {
                return branch.name.error;
              })
              .join(', ')
          );
        }
      } else {
        console.log(name, ':', 'Empty result returned'.warn);
      }
    });
  });
});
