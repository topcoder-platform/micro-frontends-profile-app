# micro-frontends-profile-app

# Topcoder Profile App

This is the Topcoder Profile micro application. This is to be loaded in Topcoder mfe-core [single-spa](https://single-spa.js.org/) application.

> NOTE. This application have been configured to be run as child app of a single-spa application. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approch, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

## Requirements

- node - v10.22.1
- npm - v6.14.6

## NPM Commands

| Command               | Description                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm start`           | Run server which serves production ready build from `dist` folder                                                  |
| `npm run dev`         | Run app in the `development` mode and `dev` config                                                                 |
| `npm run dev-https`   | Run app in the `development` mode and `dev` config using HTTPS protocol                                            |
| `npm run local`       | Run app in the `development` mode and `local-dev` config                                                           |
| `npm run prod`        | Run app in the `development` mode and `prod` config                                                                |
| `npm run build`       | Build app for production and puts files to the `dist` folder, default to `development` mode and `local-dev` config |
| `npm run analyze`     | Analyze dependencies sizes and opens report in the browser                                                         |
| `npm run lint`        | Check code for lint errors                                                                                         |
| `npm run format`      | Format code using prettier                                                                                         |
| `npm run test`        | Run unit tests                                                                                                     |
| `npm run watch-tests` | Watch for file changes and run unit tests on changes                                                               |
| `npm run coverage`    | Generate test code coverage report                                                                                 |

## Local Deployment

Inside the project folder run:

- `nvm use 10.22.1;` - to use npm version: 10.22.1
- `npm i` - install dependencies
- `npm run local` - run app in `development` mode and `local-dev` config
- As this app can be loaded only inside a frame single-spa, you have to run a `mfe-core` frame app and configure it to use the URL `http://localhost:8009/profile-app/topcoder-micro-frontends-profile-app.js`.

## Deployment to Production

- `npm i` - install dependencies
- `APPMODE=production APPENV=prod npm run build` - build code to `dist/` folder
- Now you can host `dist/` folder using any static server. For example, you may run a simple `Express` server by running `npm start`.

### Deploying to Heroku

Make sure you have [Heroky CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you have a Heroku account. And then inside the project folder run the next commands:

- If there is not Git repository inited yet, create a repo and commit all the files:

  - `git init`
  - `git add .`
  - `git commit -m'inital commit'`

- `heroku apps:create` - create Heroku app

- `git push heroku master` - push changes to Heroku and trigger deploying

- Now you have to configure frame app to use the URL provided by Heroku like `https://<APP-NAME>.herokuapp.com/profile-app/topcoder-micro-frontends-profile-app.js` to load this microapp.
