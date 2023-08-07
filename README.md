## GitLab Utils

[![License](https://img.shields.io/github/license/cmckni3/gitlab-utils.svg)](https://github.com/cmckni3/gitlab-utils/blob/master/MIT-LICENSE)

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
  babel-node non-master-branches.js
  # alternatively use npm run branch-checker or yarn branch-checker
  ```

* Find projects without tags
  ```bash
  babel-node repos-without-tags.js
  # alternatively use npm run tags or yarn tags
  ```

* Find release status of repos
  ```bash
  babel-node releases.js
  # alternatively use npm run releases or yarn releases
  ```
