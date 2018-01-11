const assert = require('assert');

const spgateway = require("./spgateway.provider");

const perRes = require("./resource/periodical.creditcard");

describe('validation', function () {
  const periodicalService = spgateway.createPeriodicalService();

  describe('periodical pay form', function () {

    describe("periodical parse notification", function () {
      it('should be the same', function () {
        let model = perRes.responseBody;

        periodicalService
          .parseNotification(model)
          .then((notify) => {
            assert.equal(notify.Result.PeriodAmt, "250");
          })
          .catch((err) => {
            assert.fail(err);
          })

      });

    })
  });

});