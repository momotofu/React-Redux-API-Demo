React / Redux sample code
=========================

Complexity distilled into pleasing design and elegant functionality.

## Product description

This app pulls from a mock/stubbed API using Apiary and populates a list with the mock data. The UI morphs into several states depending on the recieved props, and has realtime update capability. In production this app would require a websocket connection to provide realtime updates to the bars and charts. The update changelist button demonstrate asyncronous redux and redux-thunk features.

## Technologies used

Redux, React, Webpack, Jest, Babel, ES6, JavaScript, Stylus, Node, JSX, isomorphic-fetch

## Getting started

Make sure you have [npm](http://npmjs.com/) package manager installed, then run the following commands.

```
npm install
```

Open a browser window and go to the following url
```
localhost:9000
```
Simulate production mode

```
npm run prod
```

Ren developer mode. This enables developer tools which show live updates to the redux state tree.

```
npm run dev
```

# Run Tests

```
npm test
```

## Example API Stub
An array of objects similiar to the one below is consumed by the UI.

```
  {
    "build_id": "Tenrox-R1_1235",
    "state": "pending",
    "owner": "samy",
    "time_started": 1478128607000,
    "percentage_complete": 77.1,
    "metrics": {
      "test": 64,
      "maintainability": 53,
      "security": 64,
      "workmanship": 72,
      "is_completed": true
    },
    "build": {
      "time_stamp": 1478128607000,
      "is_completed": true
    },
    "unit_test": {
      "passed": 142,
      "failed": 10,
      "covered_percentage": 76,
      "tests_passed": 73,
      "is_completed": true
    },
    "functional_test": {
      "passed": 142,
      "failed": 10,
      "covered_percentage": 76,
      "tests_passed": 68,
      "is_completed": true
    },
    "result": {
      "status": "find_issue"
    }
  }
```
