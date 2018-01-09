const assert = require('assert');

const spgateway = require("./spgateway.provider");

describe('validation', function () {
  const mpgService = spgateway.createMpgService();

  describe('mpg checkValue', function () {
    it('should be the same', function () {
      let payModel = mpgService.createMpgPayModel();
      payModel.MerchantOrderNo = "1515501989";
      payModel.TimeStamp = "1515501989";
      payModel.Amt = 81;

      let checkValue = mpgService.validationHelper.genMpgCheckValue(payModel.Amt,
        payModel.MerchantOrderNo,
        payModel.TimeStamp,
        payModel.Version);

      let actual = "0121EB7392CDCC05872CBC283AB7794754DCF112C4492E643E4D79FB8B6294BB";

      assert.equal(checkValue, actual);
    });
  });

});