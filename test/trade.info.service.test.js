const assert = require('assert');

const spgateway = require("./spgateway.provider");


describe('trade info service', function () {

  describe("query", function () {
    it('should pass without error', function (done) {
      let tradeInfoService = spgateway.createTradeInfoService();

      tradeInfoService
        .queryOrder("SB180111171102STJN83", 250)
        .then((model) => {
          assert.equal(model.Status !== "", true);
          done();
        })
        .catch((err)=>{
          done(err);
        })

    });

  })

});