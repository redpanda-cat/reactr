This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Application to take existing webpages and render a dynamic directory-based navigation bar with React.

## Getting Started

### Prerequisites

* Node
* yarn or npm

### Dependencies

* Node
* Express
* React
* React Bootstrap
* React Burger Menu

### Installing

Clone the existing repository, and then install the necessary dependencies

```
yarn install

or

npm install
```

Build, then start the Express server

```
yarn build
yarn start:ssr

or

npm run build
npm run start:ssr
```

Go to `http://localhost:3000` to view your site.

### Adding Pages

To add pages, insert the appropriate HTML pages in the `pages` directory. The navigation bar structure will mirror the structure in that directory, and the names will be derived from the names of the directories and html pages.
