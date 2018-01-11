const assert = require('assert');

const spgateway = require("./spgateway.provider");

const perRes = require("./resource/periodical.creditcard");

describe('periodical service', function () {
  const periodicalService = spgateway.createPeriodicalService();


    describe("periodical parse notification", function () {
      it('should be the same', function (done) {
        let model = perRes.responseBody;

        periodicalService
          .parseNotification(model)
          .then((notify) => {
            assert.equal(notify.Result.PeriodAmt, "250");
            done();
          })
          .catch((err) => {
            done(err)
          })

      });

    })

});