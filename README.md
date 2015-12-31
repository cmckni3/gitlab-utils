## GitLab Utils
[![License](https://img.shields.io/github/license/cmckni3/gitlab-utils.svg)](https://github.com/cmckni3/gitlab-utils/blob/master/MIT-LICENSE)

## Setup

* Clone project
  ```bash
  git clone https://github.com/cmckni3/gitlab-utils.git
  ```

* Install dependencies
  ```bash
  npm install
  ```

* Copy config
  ```bash
  cp config.sample.js config.js
  ```

* Add GitLab URL and private token to config.js

## Usage

* Clone all GitLab projects
  ```bash
  node download.js
  ```

* Find projects containing branches other than master, staging, quality-assurance
  ```bash
  node non-master-branches.js
  ```

* Find projects without tags
  ```bash
  node repos-without-tags.js
  ```
