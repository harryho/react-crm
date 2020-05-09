# React Redux CRM

> A reusable CRM project for real-world business based on React 15.4, React-Redux & Material-UI

This is the very first version, feel free to use for any app. Contributions are always welcome!

The goal of this starter project is to create reusable project for real-world business. To achieve this target, we need a solution which should include simple authentication process, restful API with token support and simple but elegant UI design.

### Features

- This project is built on the top of React/Redux.
- The UI part of this project uses Material-UI.
- This project uses Redux-Thunk to support back-end API.
- ~~To simulate real-world business, this starter project chooses Json-Server as fake Restful API. (You can simple replace it with your own API)~~

* Fake API is just readonly fake service.
* CRUD functions for Customer, Order and Product

### Live Demo

[Demo](https://react-app-demo.harryho.org) The demo is just a proof of concept. It doesn't have back-end API and all features of master branch.

### Screenshots

![Screenshot1](screenshots/screenshot-1.jpg)

![Screenshot2](screenshots/screenshot-2.jpg)

![Screenshot3](screenshots/screenshot-3.jpg)

![Screenshot4](screenshots/screenshot-4.jpg)

## Build Setup

```bash
# Clone project
git clone https://github.com/harryho/react-crm.git


# install the packages with npm
cd react-crm
npm install

# start the server with hot reload at localhost:4000
npm run start
# or yarn
yarn start


## You might see sth below.
#
# [Browsersync] Access URLs:
#  ------------------------------------
#        Local: http://localhost:4000
#     External: http://192.168.1.5:4000
#  ------------------------------------
#           UI: http://localhost:4001
#  UI External: http://localhost:4001
#  ------------------------------------
# [Browsersync] Serving files from: src
# [Browsersync] Watching files...
# webpack: wait until bundle finished: /index.html
# webpack built de2fee97ada8c77dde8e in 10556ms
# Child html-webpack-plugin for "index.html":


## development
npm run demo
# or yarn
yarn demo

## build for dev
npm run build

## build for production
npm run build --mode production
```

## Docker 

```
## Run / Test release without building new image
npm run build

# Launch nginx image to test latest release
docker pull nginx:alpine
docker run -p 8080:80 -v \
    <your_aboslute_path>/dist:/usr/share/nginx/html nginx:alpine


# Build release image
docker build . -t  rc-prd:1.0

# Launch the development image in the backgroud
docker run -d --publish 8080:80  --name rc1 rc-prd:1.0

# Check the log
docker logs vc2   -f
```

## Welcome to fork or clone!

For detailed explanation on how things work, checkout following links please.

- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [Material-UI](http://www.material-ui.com/)

### Alternatives

There are another two similar projects respectively built on the Vue.js and Angular. If you have interests in those technical stacks. You can find and clone those repositories below.

- [Ng-MD-App](https://github.com/harryho/ng-md-app.git).
- [Ng4Crm](https://github.com/harryho/ng4crm.git). (It is no longer maintained with latest Angular)
- [Vue2Crm](https://github.com/harryho/vue2crm.git).

### Change log



- Rebase demo branch to master

  New master doesn't rely on Json-Server as fake API. It will only have Readonly fake API. It means any new or updated data will be stored to any physical file. All test data will be rolled back after system restart.

- Create an archived branch json-server

  This branch was the master which used Json-Server as fake API. Considering the hiccup of setting Json-Server up and maintenance, it will be replaced by fake service ( Readonly fake API). You still can find clone this branch by branch name **json-server**, but it will be no longer updated. It is an archived branch.

