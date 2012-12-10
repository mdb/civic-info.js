[![Build Status](https://secure.travis-ci.org/mdb/civic-info.js.png)](http://travis-ci.org/mdb/civic-info.js)

# civic-info.js

A thin Node.js wrapper for working with Google's [Civic Info API](https://developers.google.com/civic-information).

It's heavily inspired by Joanne Cheng's [civic_info](https://github.com/joannecheng/civic_info) Ruby gem.

## Getting Started

Secure a Google API key.

Install civic-info.js:
    
    npm install civic-info

Require and instantiate civic-info.js with your API key:

    var civicInfo = require("civic-info")({apiKey: 'YOUR KEY HERE'});

    // Alternatively, you can set a GOOGLE_API_KEY environment variable and instantiate like so:
    var civicInfo = require("civic-info")();

## Example Usage

### Elections

Get election info and election IDs:

    civicInfo.elections(function(error, data) {
      console.log(data);
    });

### Voter Info

Get 2012 presidential election info for a voter address:

    civicInfo.voterInfo({address: 'SOME ADDRESS'}, function(error, data) {
      console.log(data);
    });

Get election info related to a specific election and address:

    // NOTE: electionIDs can be retrieved from the elections API
    civicInfo.voterInfo({electionID: 'SOME ID', address: 'SOME ADDRESS'}, function(error, data) {
      console.log(data);
    });
