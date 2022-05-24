# ba-project

![superlinter](https://github.com/leandergebhardti8/ba-2021/actions/workflows/superlinter.yml/badge.svg)
![node](https://github.com/leandergebhardti8/ba-2021/actions/workflows/node.yml/badge.svg)
[![Build & Test Project](https://github.com/leandergebhardti8/ba-2021/actions/workflows/build-test.yml/badge.svg)](https://github.com/leandergebhardti8/ba-2021/actions/workflows/build-test.yml)

## Project setup
```bash
npm install
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Lints and fixes files
```bash
npm run lint
```

## Deploying
### Backend Deploy
If not already logged in
```bash
heroku login
```
Add the git remote
```bash
heroku git:remote -a ba-2021
```
from root directory
```bash
git subtree push --prefix App/ba-project heroku main
```
### Frontend Deploy
If not already logged in
```bash
heroku login
```
Add the git remote
```bash
heroku git:remote -a usus-ba-leander
```
from root directory
```bash
git subtree push --prefix App/ba-project heroku main
```
