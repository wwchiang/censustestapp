# Census Test Project
Test project for front end development that starts with a basic prebuilt backend that serves some census data through a REST API.

## Description
The Node back end pulls data from the [US Census American Community Survey API](http://api.census.gov/data/2014/acs1/profile.html) and serves it in a more user-friendly format.

## Getting started
1. Run `npm install` or `yarn install`
2. Request an API key from http://api.census.gov/data/key_signup.html
3. Find this line in server/index.js (not to be confused with client/scripts/index.js):

        const APIkey = require('./apikey_local');

      and replace the second part with your API key

        const APIkey = 'myapikey12345';

4. Run `grunt dev`
5. Navigate to `http://localhost:3000` in your browser.

## API
### Get counties for a state
```
http://localhost:3000/counties?state=[STATE_CODE]
```
example:
```
http://localhost:3000/counties?state=06
```
will get a list of counties in California, returned in JSON format.

The first element of the list is a description of the fields - each county is represented as a 3 element array where the first element is the county name, the second is the state code, and the last is the county code.

**NOTE: State codes are provided in `client/data/state-codes.js`.**


### Get income brackets for a state, county, or the U.S.
```
http://localhost:3000/incomes?state=[STATE_CODE]&county=[COUNTY_CODE]
```
example:
```
http://localhost:3000/incomes?state=06&county=001
```
will get income data from Alameda County, California.

Both state and county parameters are optional (although if you include county, you must include state).  Omitting the county parameter returns results for the entire state.  Omitting both returns results for the entire United States.

Each bracket looks something like this:
```
{
"code": "DP03_0052E",
"min": 0,
"max": 9999,
"households": 24702.75
},
```

Min is the minimum income for that bracket, max is the maximum, and households is the total number of households whose income falls between those.

- **incomeDataAll** includes all types of households
- **incomeDataFamilies** only includes family households
- **incomeDataNonFamilies** only includes non-family households

The returned JSON object also contains median incomes (a single value) for all 3 groups.

## Instructions

Come up with a UI to allow users to easily browse and interpret as much of this data as possible.  You don't have to use every option in the API and can focus on what would be most useful or interesting.