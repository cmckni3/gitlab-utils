var gitlab = require(process.cwd() + '/gitlab');
require('terminal-colors');
var debug  = require('debug')('gitlab-utils:tag-checker');

gitlab.projects.all({archived: false}, function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listTags(project.id, function(result) {
      debug(project.name_with_namespace, project.id);
      debug(result);
      if (result) {
        if (result.length == 0) {
          console.log(project.name_with_namespace, ':', 'No tags found'.underline.red);
        }
      } else {
        console.log(project.name_with_namespace, ':', 'Empty result returned'.bold.yellow);
      }
    });
  });
});
