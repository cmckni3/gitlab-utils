var gitlab = require(process.cwd() + '/gitlab');

gitlab.projects.all(function(projects) {
  var projects = projects.map(function(project) {
    return {id: project.id, name: project.name_with_namespace};
  });
  projects.forEach(function(project) {
    var opts = {
      projectId: project.id,
      file_path: 'README.md',
      ref: 'master'
    };
    gitlab.projects.repository.listTree(project.id, {}, function(result) {
      if (result) {
        readme_files = result.filter(function(object) { return object.type === 'blob'; }).filter(function(object) { return /readme/.test(object.name.toLowerCase()); });
        console.log(readme_files);
      }
    });
    gitlab.projects.repository.showFile(opts, function(result) {
      if (!result) {
        console.log('No readme for ' + project.name);
      }
    });
  });
});
