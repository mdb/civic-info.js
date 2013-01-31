var nock = require("nock");
var expect = require("expect.js");

describe("CivicInfo", function() {
  var civicInfo;

  describe("#settings", function () {

    it("exists as a public object on a CivicInfo instance", function () {
      civicInfo = require("../lib/civic-info")();
      expect(typeof civicInfo.settings).to.eql("object");
    });

    describe("#apiKey", function () {
      it("defaults to the value of a GOOGLE_API_KEY environment variable", function () {
        var oldGoogleApiKey = process.env.GOOGLE_API_KEY;
        process.env.GOOGLE_API_KEY = "temporaryFakeKey";

        civicInfo = require("../lib/civic-info")();
        expect(civicInfo.settings.apiKey).to.eql("temporaryFakeKey");

        process.env.GOOGLE_API_KEY = oldGoogleApiKey;
      });
      
      it("can be overridden on instantiation", function () {
        civicInfo = require("../lib/civic-info")({apiKey: "BLAH"});
        expect(civicInfo.settings.apiKey).to.eql("BLAH");
      });
    });
  });

  describe("#elections", function () {
    it("exists as a public method on a CivicInfo instance", function () {
      civicInfo = require("../lib/civic-info")();
      expect(typeof civicInfo.elections).to.eql("function");
    });

    it("performs a get request to the proper Google civic info URL", function (done) {
      civicInfo = require("../lib/civic-info")({apiKey: "Foo"});
      var fakeResp = {"someKey": "someVal"};

      nock("https://www.googleapis.com")
        .get("/civicinfo/us_v1/elections?key=Foo")
        .reply(200, fakeResp);
      
      civicInfo.elections(function (err, data) {
        expect(data).to.eql(fakeResp);
        done();
      });
    });
  });
  
  describe("#voterInfo", function () {
    it("exists as a public method on a CivicInfo instance", function () {
      civicInfo = require("../lib/civic-info")();
      expect(typeof civicInfo.voterInfo).to.eql("function");
    });

    it("makes the properly formatted post to the Google Civic Info API with the options it's passed", function (done) {
      civicInfo = require("../lib/civic-info")({apiKey: "Foo"});
      var addr = "fakeAddress";
      var fakeResp = {"fakeKey":"fakeVal"};

      nock('https://www.googleapis.com')
        .post("/civicinfo/us_v1/voterinfo/fakeElectionID/lookup?key=Foo", {address: addr})
        .reply(200, fakeResp);

      civicInfo.voterInfo({address: addr, electionID: "fakeElectionID"}, function (err, data) {
        expect(data).to.eql(fakeResp);
        done();
      });
    });

    context("no electionID is specified in the options object it's passed", function () {
      it("defaults to an electionID of '4000'", function (done) {
        civicInfo = require("../lib/civic-info")({apiKey: "Foo"});
        var addr = "fakeAddress";
        var fakeResp = {"fakeKey":"fakeVal"};

        nock("https://www.googleapis.com")
          .post("/civicinfo/us_v1/voterinfo/4000/lookup?key=Foo", {address: addr})
          .reply(200, fakeResp);

        civicInfo.voterInfo({address: addr}, function (err, data) {
          expect(data).to.eql(fakeResp);
          done();
        });
      });
    });

    context("no address is specified in the options object it's passed", function () {
      it("throws an error", function (done) {
        civicInfo = require("../lib/civic-info")();
        expect(function () {
          civicInfo.voterID({}, function(err, data) {});
        }).to.throwError();
        done();
      });
    });
  });
});
