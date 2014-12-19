var gitlab = require(process.cwd() + '/gitlab');
var spawn  = require('child_process').spawn
var sleep  = require('sleep');
var colors = require('colors');

gitlab.projects.all(function(projects) {
  projects.forEach(function(project) {
    // Sleep to get around rack attack
    sleep.sleep(5);
    console.log('Cloning ' + colors.cyan(project.name_with_namespace));
    var command = 'git clone ' + project['ssh_url_to_repo'] + ' "gitlab/' + project['path_with_namespace'] + '"';
    var result = spawn(command, []);
    result.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });
  });
});

