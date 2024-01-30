## GitLab Utils

[![License](https://img.shields.io/github/license/cmckni3/gitlab-utils.svg)](https://github.com/cmckni3/gitlab-utils/blob/master/LICENSE)

## Requirements

* node.js >= 8

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

* Add GitLab URL and private token to config.js

## Usage

* Find projects containing branches other than master, staging, quality-assurance
  ```bash
  babel-node src/branch-checker.js
  # alternatively use npm/yarn
  # npm run branch-checker
  # yarn branch-checker
  ```

* Find projects without tags
  ```bash
  babel-node src/tag-checker.js
  ```

* Find release status of repos
  ```bash
  babel-node src/release-checker.js
  # alternatively use npm/yarn
  # npm run release-checker
  # yarn release-checker
  ```
