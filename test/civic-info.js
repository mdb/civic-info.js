var nock = require('nock');
var expect = require('expect.js');

describe("CivicInfo", function() {
  var civicInfo;

  describe("#settings", function () {

    it("exists as a public object on a CivicInfo instance", function () {
      civicInfo = require('../civic-info')();
      expect(typeof civicInfo.settings).to.eql('object');
    });

    describe("#apiKey", function () {
      it("defaults to the value of a GOOGLE_API_KEY environment variable", function () {
        var oldGoogleApiKey = process.env.GOOGLE_API_KEY;
        process.env.GOOGLE_API_KEY = 'temporaryFakeKey';

        civicInfo = require('../civic-info')();
        expect(civicInfo.settings.apiKey).to.eql('temporaryFakeKey');

        process.env.GOOGLE_API_KEY = oldGoogleApiKey;
      });
      
      it("can be overridden on instantiation", function () {
        civicInfo = require('../civic-info')({apiKey: 'BLAH'});
        expect(civicInfo.settings.apiKey).to.eql('BLAH');
      });
    });
  });

  describe("#elections", function () {
    it("exists as a public method on a CivicInfo instance", function () {
      civicInfo = require('../civic-info')();
      expect(typeof civicInfo.elections).to.eql('function');
    });

    it("performs a get request to the proper Google civic info URL", function (done) {
      civicInfo = require('../civic-info')({apiKey: 'Foo'});

      nock('https://www.googleapis.com')
        .get('/civicinfo/us_v1/elections?key=Foo')
        .reply(200, {'some_key': 'some_value'});
      
      civicInfo.elections(function (data) {
        expect(data).to.eql({'some_key': 'some_value'});
        done();
      });
    });
  });
  
  describe("#voterInfo", function () {
    it("exists as a public method on a CivicInfo instance", function () {
      civicInfo = require('../civic-info')();
      expect(typeof civicInfo.voterInfo).to.eql('function');
    });
  });
});
