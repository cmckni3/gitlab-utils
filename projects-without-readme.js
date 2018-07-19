var gitlab = require(process.cwd() + '/gitlab');
var debug = require('debug')('gitlab-utils:projects-without-readme');

require('./colors');

gitlab.projects.all(function(projects) {
  var projects = projects.map(function(project) {
    return { id: project.id, name: project.name_with_namespace };
  });
  projects.forEach(function(project) {
    gitlab.projects.repository.listTree(project.id, {}, function(result) {
      if (result) {
        readme_files = result
          .filter(function(object) {
            return object.type === 'blob';
          })
          .filter(function(object) {
            return /readme.md/i.test(object.name.toLowerCase());
          });
        if (readme_files.length > 0) {
          var opts = {
            projectId: project.id,
            file_path: readme_files[0].name,
            ref: 'master',
          };
          gitlab.projects.repository.showFile(opts, function(result) {
            if (result.size > 0) {
            } else {
              console.log(('No readme for ' + project.name).error);
            }
          });
        } else {
          console.log(('No readme for ' + project.name).error);
        }
      } else {
        console.log(('Could not retrieve tree for ' + project.name).warn);
      }
    });
  });
});
