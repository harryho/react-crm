<h1 align="center">
  React MUI Demo v6
</h1>

This react demo is built on the top of my customized React boilerplate with Storybook. 

The boilerplate repo is available [here](https://github.com/harryho/storybook-react-vite-ts-template). 

If you want to build something simpler from scratch, you can follow the README to build your own app step by step.



### Live Demo

[Demo](https://react-demo-v6.harryho.org/) The demo is just a proof of concept. It doesn't have back-end API and all features of master branch.

### Screenshots

![Screenshot1](screenshots/react-demo-v6-screen1.png)

![Screenshot2](screenshots/react-demo-v6-screen2.png)

![Screenshot3](screenshots/react-demo-v6-screen3.png)

![Screenshot4](screenshots/react-demo-v6-screen4.png)

<!-- ![Screenshot4](screenshots/screenshot-4.jpg) -->

----


## Getting Start

```bash
# Clone project
git clone https://github.com/harryho/react-demo.git


# install the packages with npm
cd react-demo

# development
yarn dev

# build
yarn build

```



----


### Previous demo

[Previous Demo](https://react-demo-v4.harryho.org/) The demo is built on React 16 and Mui 4. Source code is available [here](https://github.com/harryho/react-crm/tree/r16m4)

#### Screenshots

![Screenshot1](screenshots/screenshot-1.jpg)

![Screenshot2](screenshots/screenshot-1.1.jpg)

![Screenshot3](screenshots/screenshot-3.1.jpg)

#### Storybook
  
![Screenshot4](screenshots/screenshot-6.jpg)



### Change log

- Apr 2025 - Merge latest demo to master branch.

- Dec 2024 - React 18 and Mui 6 live demo is released.

- Jun 2024 - Uplifting to React 18 and Mui 6 is in progress.

- May 2020 -  Merge the branch rctsx to master

  After the merge, the whole project moved to new technical stack - TypeScript 3. Also, the Material-UI is upgraded to 4.x version. Nodejs 12.x is recommended.

- Dec 2018 - Rebase demo branch to master

  New master doesn't rely on Json-Server as fake API. It will only have Readonly fake API. It means any new or updated data will be stored to any physical file. All test data will be rolled back after system restart.

- May 2018 -  Create an archived branch json-server

  This branch was the master which used Json-Server as fake API. Considering the hiccup of setting Json-Server up and maintenance, it will be replaced by fake service ( Readonly fake API). You still can find clone this branch by branch name **json-server**, but it will be no longer updated. It is an archived branch.