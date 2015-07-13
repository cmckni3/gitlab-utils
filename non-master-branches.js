var gitlab = require(process.cwd() + '/gitlab');
var colors = require('colors');

gitlab.projects.all(function(err, projects) {
  if (err)
  {
    console.log(err);
    process.exit(1);
    return;
  }
  var projects = projects.map(function(project) {
    return {id: project.id, name: project.name_with_namespace};
  });
  projects.forEach(function(project) {
    gitlab.projects.repository.listBranches(project.id, function(err, result)
    {
      if (err)
      {
        console.log(colors.blue(project.name), colors.red(err));
        return;
      }
      var non_master_branches = result.filter(function(branch) { return branch.name !== 'master'; }).map(function(branch) { return branch; });
      if (non_master_branches.length !== 0)
      {
        console.log(project.name + ': ' + non_master_branches.map(function(branch) { return colors.red.underline(branch.name); }).join(', '));
      }
    });
  });
});

