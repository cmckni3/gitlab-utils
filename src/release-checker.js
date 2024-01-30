const process = require('process');

require('./utils/colors');
const gitlab_util = require('./utils/gitlab');

const debug = require('debug')('gitlab-utils:release-checker');

const semver = require('semver');

const services = gitlab_util.services;
const allProjects = gitlab_util.allProjects;

async function main() {
  return await allProjects();
}

async function getTags(project) {
  const name = project.name_with_namespace;
  return services.Tags.all(project.id, {}).then(result => {
    debug(result);
    if (result) {
      const valid_tags = result
        .filter(function(tag) {
          return semver.valid(tag.name);
        })
        .map(function(tag) {
          return tag.name;
        });
      // Find tags >= 1.0.0
      const stable_tags = valid_tags.filter(function(tag) {
        return semver.satisfies(tag, '>= 1.x');
      });
      const latest_valid_tag = valid_tags.sort(semver.rcompare)[0];
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
        const message = [
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
}

main()
  .then(projects => {
    let p = Promise.resolve();
    projects.forEach(function(project) {
      const name = project.name_with_namespace;
      debug(name, project.id);
      p = p.then(() => getTags(project));
    });
    return p;
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
