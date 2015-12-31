var gitlab = require(process.cwd() + '/gitlab');
var colors = require('colors');
var debug  = require('debug')('gitlab-utils:tag-checker');

gitlab.projects.all({archived: false}, function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listTags(project.id, function(result) {
      debug(project.name_with_namespace, project.id);
      debug(result);
      if (result) {
        if (result.length == 0) {
          console.log(project.name_with_namespace, ':', colors.red.underline('No tags found'));
        }
      } else {
        console.log(project.name_with_namespace, ':', colors.yellow.bold('Empty result returned'));
      }
    });
  });
});
