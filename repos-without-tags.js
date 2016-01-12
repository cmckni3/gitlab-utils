var gitlab = require(process.cwd() + '/gitlab');
var debug  = require('debug')('gitlab-utils:tag-checker');

require('./colors');

gitlab.projects.all({archived: false}, function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listTags(project.id, function(result) {
      debug(project.name_with_namespace, project.id);
      debug(result);
      if (result) {
        if (result.length == 0) {
          console.log(project.name_with_namespace, ':', 'No tags found'.error);
        }
      } else {
        console.log(project.name_with_namespace, ':', 'Empty result returned'.warn);
      }
    });
  });
});
