var gitlab = require(process.cwd() + '/gitlab');
var debug = require('debug')('gitlab-utils:release-checker');
var semver = require('semver');

require('./colors');

gitlab.projects.all({ archived: false }, function(projects) {
  projects.forEach(function(project) {
    var name = project.name_with_namespace;
    gitlab.projects.repository.listTags(project.id, function(result) {
      debug(name, project.id);
      debug(result);
      if (result) {
        var valid_tags = result
          .filter(function(tag) {
            return semver.valid(tag.name);
          })
          .map(function(tag) {
            return tag.name;
          });
        // Find tags >= 1.0.0
        var stable_tags = valid_tags.filter(function(tag) {
          return semver.satisfies(tag, '>= 1.x');
        });
        var latest_valid_tag = valid_tags.sort(semver.rcompare)[0];
        if (result.length == 0) {
          console.log(name, ':', 'No tags found'.error);
        } else if (valid_tags.length == 0) {
          console.log(name, ':', 'No valid tags found'.error);
        } else if (stable_tags.length > 0) {
          console.log(
            name,
            ':',
            'Stable release found'.success,
            latest_valid_tag.info
          );
        } else {
          var message = [
            name,
            ':',
            'No stable release found'.underline.lightRed,
          ];
          if (latest_valid_tag) {
            message.push('Latest valid tag:', latest_valid_tag.info);
          }
          console.log(message.join(' '));
        }
      } else {
        console.log(name, ':', 'Empty result returned'.warn);
      }
    });
  });
});
