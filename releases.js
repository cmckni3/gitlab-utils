var gitlab = require(process.cwd() + '/gitlab');
require('terminal-colors');
var debug  = require('debug')('gitlab-utils:release-checker');
var semver = require('semver');

gitlab.projects.all({archived: false}, function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listTags(project.id, function(result) {
      debug(project.name_with_namespace, project.id);
      debug(result);
      if (result) {
        var valid_tags = result.filter(function(tag) { return semver.valid(tag.name); }).map(function(tag) { return tag.name; });
        // Find tags >= 1.0.0
        var stable_tags = valid_tags.filter(function(tag) { return semver.satisfies(tag, '>= 1.x'); });
        var latest_valid_tag = valid_tags.sort(semver.rcompare)[0];
        if (result.length == 0) {
          console.log(project.name_with_namespace, ':', 'No tags found'.underline.red);
        } else if (valid_tags.length == 0) {
          console.log(project.name_with_namespace, ':', 'No valid tags found'.underline.red);
        } else if (stable_tags.length > 0) {
          console.log(project.name_with_namespace, ':', 'Stable release found'.underline.green, latest_valid_tag.bold.blue);
        } else {
          var message = [
            project.name_with_namespace,
            ':',
            'No stable release found'.underline.lightRed
          ];
          if (latest_valid_tag) {
            message.push('Latest valid tag:', latest_valid_tag.bold.blue)
          }
          console.log(message.join(' '));
        }
      } else {
        console.log(project.name_with_namespace, ':', 'Empty result returned'.bold.yellow);
      }
    });
  });
});
