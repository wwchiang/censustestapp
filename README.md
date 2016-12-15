# Census Test Project

To get a sense of your coding style and ability, without the pressure of coding on a whiteboard during an interview, we have a take-home coding assignment for you. We'd like to see what you can get done in around 2 or 3 hours on the following project.

## Requirements
  1) Create a single page where the user can input their state, county, and income.
  2) When the user submits the form, produce a visualization of the user's income compared to the income brackets of all others within the county.
  3) The client html file can be found here: `client/index.html` and the script here: `client/scripts/index.js`.
  4) Don't spend much time tweaking CSS. For an assignment of this length we expect the result to be more functional than beautiful.
  5) The page must work on the latest Chrome (you don't need to worry about older browsers)
  6) JQuery and Lodash libraries are included for your convenience in `client/scripts/index.js`. You can use other libraries if you wish, just make sure that they referenced in the `package.json` and play nice with browserify.

Sample mockup form:

```
              +------------------+
      State:  |                ▽ |
              +------------------+

              +------------------+
      County: |                ▽ |
              +------------------+

              +------------------+
      Income: |                  |
              +------------------+

                        +--------+
                        |   OK   |
                        +--------+

Results:

+---------------------------------------------+
|                                             |
|                                             |
|                                             |
|                                             |
|                                             |
|                                             |
|          [Visualization goes here]          |
|                                             |
|                                             |
|                                             |
|                                             |
|                                             |
|                                             |
|                                             |
+---------------------------------------------+


```


## Getting started
0. Download/Install nodejs 6.9.2 or newer: https://nodejs.org/en/download/
1. Download/clone this repo (https://github.com/pepperdata/censustestapp) and complete your work on your local copy.
2. Run `npm install` or `yarn install`
3. Request an API key from [http://api.census.gov/data/key_signup.html](http://api.census.gov/data/key_signup.html). (Be sure to activate your key by clicking on the link in the email).
4. Find this line in server/index.js (not to be confused with client/scripts/index.js):

        const APIkey = require('./apikey_local');

      and replace the second part with your API key

        const APIkey = 'myapikey12345';

5. Run `npm start`
6. Navigate to `http://localhost:3000` in your browser.


## API

This repo comes with an existing Node back end that pulls data from the [US Census American Community Survey API](http://api.census.gov/data/2014/acs1/profile.html) and serves it in a more user-friendly format.  See below for more details.

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

## Submission

To submit your assignment, mail us your diff: `git diff HEAD`, zip up your project: `npm run-script compress`, and mail us the zipped result: `public/census-app.zip`. Feel free to include any comments you wish like what's working/what's not working, what you would do if you had more time, or any issues you ran into on this assignment.
