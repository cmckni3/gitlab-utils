# GitLab Utils

## Requirements

* node.js >= 0.12

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

* Find project containing branches other than master
  ```bash
  node non-master-branches.js
  ```
