'use strict';

const _ = require('lodash');
const express = require('express');
const codes = require('./lookup_codes');
const app = express();

const request = require('request');
const bodyParser = require('body-parser');

const APIkey = 'require('./apikey_local')';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function getCountiesFromAPI(stateCode, stateName, res) {
  request({
    url: 'http://api.census.gov/data/2013/acs1/profile',
    qs: {
      'get': 'NAME',
      'for': 'county:*',
      'in': 'state:' + stateCode,
      'key': APIkey
    },
    json: true
  }, function (error, response) {
    if (error) {
      console.error(error);
      res.send(error);
    } else if (response.statusCode !== 200) {
      res.send(response);
    } else { // success
      res.send(response.body);
    }
  });
}

function getIncomeDataFromAPI(stateCode, countyCode, res) {
  let queryString;
  if (countyCode) {
    queryString = {
      'for': 'county:' + countyCode,
      'in': 'state:' + stateCode,
      'key': APIkey
    };
  } else if (stateCode) {
    queryString = {
      'for': 'state:' + stateCode,
      'key': APIkey
    };
  } else {
    queryString = {
      'for': 'us:*',
      'key': APIkey
    }
  }
  const allBrackets = codes.ALL_HOUSEHOLDS.concat(codes.FAMILIES);
  const codeHashMap = _.reduce(allBrackets, function(obj, item) {
    obj[item.code] = 0;
    return obj;
  }, {});
  const mediansHashMap = _.reduce(codes.MEDIAN_CODES, function(obj, item) {
    obj[item.code] = 0;
    return obj;
  }, {});
  const totalBrackets = allBrackets.length;
  let bracketsSoFar = 0;
  let mediansSoFar = 0;
  _.forEach(codes.MEDIAN_CODES, function(code, key) {
    request({
      url: 'http://api.census.gov/data/2013/acs1/profile',
      qs: _.extend({}, queryString, {'get': code}),
      json: true
    }, function (error, censusResponse) {
      mediansSoFar++;
      if (error) {
        console.error(error);
      } else if (censusResponse.statusCode !== 200) {
        console.error(censusResponse.statusCode);
      } else {
        mediansHashMap[key] = censusResponse.body[1][0];
        if (bracketsSoFar === totalBrackets && mediansSoFar === 3) {
          onRequestsDone(res, censusResponse, codeHashMap, mediansHashMap, countyCode, stateCode);
        }
      }
    });
  });
  _.forEach(codeHashMap, function(code, key) {
    request({
      url: 'http://api.census.gov/data/2013/acs1/profile',
      qs: _.extend({}, queryString, {'get': (key + ',NAME')}),
      json: true
    }, function (error, response) {
      bracketsSoFar++;
      if (error) {
        console.error(error);
        codeHashMap[key] = error;
        if (bracketsSoFar === totalBrackets) {
          res.send(codeHashMap);
        }
      } else if (response.statusCode !== 200) {
        console.error(response.statusCode);
        codeHashMap[key] = response.statusCode;
        if (bracketsSoFar === totalBrackets) {
          res.send(codeHashMap);
        }
      } else {
        codeHashMap[key] = parseInt(response.body[1][0]);
        if (bracketsSoFar === totalBrackets && mediansSoFar === 3) {
          onRequestsDone(res, response, codeHashMap, mediansHashMap, countyCode, stateCode);
        }
      }
    });
  });
}

function onRequestsDone(res, data, codeHashMap, mediansHashMap, countyCode, stateCode) {
  const allHouseholds = _.map(codes.ALL_HOUSEHOLDS, function(item) {
    return _.extend({}, item, {households: codeHashMap[item.code]});
  });
  const familyHouseholds = _.map(codes.FAMILIES, function(item) {
    return _.extend({}, item, {households: codeHashMap[item.code]});
  });
  const nonFamilyHouseholds = _.map(codes.NONFAMILIES, function(item) {
    return _.extend({}, item, {households: codeHashMap[item.code1]
    - codeHashMap[item.code2]});
  });

  const documentData = {
    incomeDataAll: allHouseholds,
    incomeDataFamilies: familyHouseholds,
    incomeDataNonFamilies: nonFamilyHouseholds,
    medianAll: mediansHashMap.all,
    medianFamilies: mediansHashMap.family,
    medianNonFamilies: mediansHashMap.nonfamily
  };
  res.set('Content-Type', 'application/json');
  res.send(documentData);
}

app.get('/counties', function (req, res) {
  getCountiesFromAPI(req.query.state, req.query.stateName, res);
});

app.get('/incomes', function (req, res) {
  const state = req.query.state || null;
  const county = req.query.county || null;
  getIncomeDataFromAPI(state, county, res);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port ' + port);
