var gitlab = require(process.cwd() + '/gitlab');
var colors = require('colors');
var debug  = require('debug')('gitlab-utils:branch-checker');

gitlab.projects.all(function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listBranches(project.id, function(result) {
      debug(project.name_with_namespace, project.id);
      debug(result);
      if (result) {
        var non_master_branches = result.filter(function(branch) { return branch.name !== 'master' && branch.name !== 'quality-assurance'; }).map(function(branch) { return branch; });
        if (non_master_branches.length !== 0)
        {
          console.log(project.name_with_namespace, ':', non_master_branches.map(function(branch) { return colors.red.underline(branch.name); }).join(', '));
        }
      } else {
        console.log(project.name_with_namespace, ':', colors.yellow.bold('Empty result returned'));
      }
    });
  });
});
