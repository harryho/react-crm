# Reetek React Redux CRM


> A reusable CRM project for real-world business based on React 15.4, React-Redux & Material-UI



This is the very first version, feel free to use for any app. Contributions are always welcome!

The goal of this starter project is to create reusable project for real-world business. To achieve this target, we need a solution which should include authentication process, restful API feature with token support and simple but elegant UI design. 

There are two another similar starter projects respectively built on the Vue.js and Angular. 

For the CRM starter project with Vue.js, please clone the repo Vue2Crm from [here](https://github.com/harryho/vue2crm.git).
For the CRM starter project with Angular 4, please clone the repo Ng4Crm from [here](https://github.com/harryho/ng4crm.git).

#### Features

* This project is built on the top of React/Redux. 
* The UI part of this project uses Material-UI. 
* This project uses Redux-Thunk to support backend API.
* It uses Json-Server as fake Restful API. (You can simple replace it with your own API)



#### Screenshots

![Screenshot1](screenshots/screenshot-1.jpg)

![Screenshot2](screenshots/screenshot-2.jpg)

![Screenshot3](screenshots/screenshot-3.jpg)

![Screenshot4](screenshots/screenshot-4.jpg)


## Build Setup

``` bash

# Clone project
git clone https://github.com/harryho/react-crm.git


# prepare Json-Server as fake Restful API

## clone json-server to folder server
cd react-crm
git clone https://github.com/typicode/json-server.git server
cd server
npm install json-server

## replace db.json and routes.json files
copy /Y ..\db\*.json

## start json-server
json-server -p 5354 db.json

## You will see the following output. You can test the URLs via browser.
##
## \{^_^}/ hi!                        
##                                    
## Loading db.json                    
## Done                               
##                                    
## Resources                          
## http://localhost:5354/token        
## http://localhost:5354/customers    
## http://localhost:5354/orders       
##                                    
## Home                               
## http://localhost:5354              

# install dependences for Reetek React CRM
cd ..

# install the repo with npm
npm install

# start the server with hot reload at localhost:4000
npm run start

# Visit the app at [http://localhost:4000](http://localhost:4000)

```



# Welcome to fork or clone!

For detailed explanation on how things work, checkout following links please.

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Material-UI] (http://www.material-ui.com/)


