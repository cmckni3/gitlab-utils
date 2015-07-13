var gitlab = require(process.cwd() + '/gitlab');
var spawn  = require('child_process').spawn;
var colors = require('colors');

function clone_project(project) {
  return new Promise(function(resolve, reject) {
    console.log('Cloning ' + colors.cyan(project.name_with_namespace));
    var result = spawn('git', ['clone', project.ssh_url_to_repo, 'gitlab/' + project.path_with_namespace]);
    result.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
      Promise.resolve(data);
    });
    result.stderr.on('data', function(data) {
      console.log(colors.red(data));
      Promise.reject(data);
    });
    result.on('error', function(data) {
      console.log(colors.red(data));
      Promise.reject(data);
    });
    result.on('exit', function(exit_code) {
      if (exit_code === 0)
        Promise.resolve();
      else
        Promise.reject();
    });
  });
}

new Promise(function(resolve, reject) {
  return gitlab.projects.all(function(projects) {
    // TODO: Handle errors
    resolve(projects);
  });
}).then(function(projects) {
  return Promise.all(projects.map(function(project) {
    return Promise.resolve(clone_project(project));
  }))
  .then(function() {
    return Promise.resolve();
  })
  .catch(function(err) {
    console.log(colors.red(err));
  });

});

