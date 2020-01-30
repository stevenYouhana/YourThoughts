const {defaults} = require('jest-config');
module.exports = {
  "modulePaths": [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ],
    "globals": {
        "NODE_ENV": "test"
    },
    "verbose": true,
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    "transform": {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "transformIgnorePatterns": ["/node_modules/(?!lodash-es)"], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
    "testRegex": "test/.*\\.spec\\.ts$",
    "setupFiles": [
        "<rootDir>/test/jest-pretest.ts"
    ],
    "testEnvironment": "node",
    "moduleNameMapper": {
        "aurelia-(.*)": "<rootDir>/node_modules/$1"
    },
}
