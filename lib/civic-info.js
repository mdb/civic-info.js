var request = require('request');
var _ = require('underscore');

function CivicInfo(opts) {
  var defaultSettings = {
    apiKey: process.env.GOOGLE_API_KEY
  };

  this.settings = opts ? _.defaults(opts, defaultSettings) : defaultSettings;
}

CivicInfo.prototype.elections = function (callback) {
  var options = {
    key: this.settings.apiKey
  };

  request(buildRequestURL('elections'), {qs: options}, function (error, response, body) {
    if (error) return callback(error);
    callback(null, JSON.parse(body));
  });
};

CivicInfo.prototype.voterInfo = function (opts, callback) {
  var options = _.defaults(opts, {
    electionID: '4000'
  });

  if (!options.address) {
    throw new Error("You must specify an address");
  } else {
    request.post(
      {
        url: buildRequestURL('voterinfo/' + options.electionID + '/lookup') + '?key='+ this.settings.apiKey,
        body: JSON.stringify({address: options.address}),
        headers: {'Content-Type': 'application/json'}
      },
      function (error, response, body) {
        if (error) return callback(error);
        callback(null, JSON.parse(body));
      }
    );
  }
};

module.exports = function(opts) {
  return new CivicInfo(opts);
};

function buildRequestURL(path) {
  return 'https://www.googleapis.com/civicinfo/us_v1/' + path;
}
