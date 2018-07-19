var gitlab = require(process.cwd() + '/gitlab');
var debug = require('debug')('gitlab-utils:tag-checker');

require('./colors');

gitlab.projects.all({ archived: false }, function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listTags(project.id, function(result) {
      debug(name, project.id);
      debug(result);
      if (result) {
        if (result.length == 0) {
          console.log(name, ':', 'No tags found'.error);
        }
      } else {
        console.log(name, ':', 'Empty result returned'.warn);
      }
    });
  });
});
