var gitlab = require(process.cwd() + '/gitlab');
var debug  = require('debug')('gitlab-utils:release-checker');

require('./colors');

gitlab.projects.all({archived: false}, function(projects) {
  projects.filter(function(project) { return project.tag_list.length > 0; })
          .forEach(function(project) {
            var name = project.name_with_namespace;
            console.log(name + ' ' + project.tag_list.map(function(t) { return t.info; }).join(', '));
          });
});
