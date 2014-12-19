var gitlab = require(process.cwd() + '/gitlab');
var colors = require('colors');

gitlab.projects.all(function(projects) {
  var projects = projects.map(function(project) {
    return {id: project.id, name: project.name};
  });
  projects.forEach(function(project) {
    gitlab.projects.repository.listBranches(project.id, function(result)
    {
      var non_master_branches = result.filter(function(branch) { return branch.name !== 'master'; }).map(function(branch) { return branch; });
      if (non_master_branches.length !== 0)
      {
        console.log(project.name + ': ' + non_master_branches.map(function(branch) { return colors.red.underline(branch.name); }).join(', '));
      }
    });
  });
});

