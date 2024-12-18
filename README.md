## GitLab Utils

[![License](https://img.shields.io/github/license/cmckni3/gitlab-utils.svg)](https://github.com/cmckni3/gitlab-utils/blob/master/LICENSE)

## Requirements

* [node.js 18.x](https://nodejs.org)
* [yarn 1.x](https://yarnpkg.com)

## Setup

* Clone project
  ```bash
  git clone https://github.com/cmckni3/gitlab-utils.git
  ```

* Install dependencies
  ```bash
  yarn install
  # npm install
  ```

* Copy config
  ```bash
  cp config.sample.js config.js
  ```

* Add GitLab URL and private token to `config.js`

## Usage

* Find projects containing branches other than master, staging, quality-assurance
  ```bash
  babel-node src/branch-checker.js
  # alternatively use npm/yarn
  # npm run branch-checker
  # yarn branch-checker
  ```

* Find projects without git tags
  ```bash
  babel-node src/tag-checker.js
  # alternatively use npm/yarn
  # npm run tag-checker
  # yarn tag-checker
  ```

* Find release status of repos
  ```bash
  babel-node src/release-checker.js
  # alternatively use npm/yarn
  # npm run release-checker
  # yarn release-checker
  ```

* Find projects with project tags (topics)
  ```bash
  babel-node src/projects-tags.js
  # alternatively use npm/yarn
  # npm run projects-tags
  # yarn projects-tags
  ```

