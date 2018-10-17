This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
  - [npm run styleguide](#npm-run-style-guide)
  

## Available Scripts

In the project directory, you can run:

### `npm start`

There are two possible ways to run the app in development mode. 

**Proxy** the JSON model from AEM:

1. Update `.env.development`:

    ```
    #Request the JSON from AEM at http://localhost:4502
    REACT_APP_PAGE_MODEL_PATH=/content/wknd-events/react.model.json
    ```
2. Start the development server:

    ```
    $ npm start
    ```

3. Open a browser window and login to AEM at http://localhost:4502
4. Open a new tab in the same browser and navigate to [http://localhost:3000/content/wknd-events/react/home.html](http://localhost:3000/content/wknd-events/react/home.html)

**Mock** the JSON model locally:

1. Update `.env.development`:

    ```
    # Request the JSON from Mock JSON
    #REACT_APP_PAGE_MODEL_PATH=mock.model.json
    ```
2. Start the development server:

    ```
    $ npm start
    ```
4. Open the browser and navigate to [http://localhost:3000/content/wknd-events/react/home.html](http://localhost:3000/content/wknd-events/react/home.html)

In both setups the page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run styleguide`

Runs the app with [React Styleguidist](https://react-styleguidist.js.org/)
Open [http://localhost:6060](http://localhost:6060) to view it in the browser.

See all of the components in isolation with various states.


