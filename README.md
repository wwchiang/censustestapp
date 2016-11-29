# Census Test Project
Test project for front end development that starts with a basic prebuilt backend that serves some census data through a REST API.

## Description
The Node back end pulls data from the [US Census American Community Survey API](http://api.census.gov/data/2014/acs1/profile.html) and serves it in a more user-friendly format.

## Getting started
1. Run `npm install` or `yarn install`
2. Request an API key from http://api.census.gov/data/key_signup.html
3. Find this line in server/index.js (not to be confused with client/scripts/index.js):
```
const APIkey = require('./apikey_local');
```
and replace the second part with your API key
```
const APIkey = 'myapikey12345';
```
4. Run `grunt dev`