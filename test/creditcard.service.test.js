const assert = require("assert");

const spgateway = require("./spgateway.provider");

describe("credit card service", function () {

    describe("mpg checkValue", function () {
        it("response should have Status field", function (done) {
            let cardCancelService = spgateway.createCreditCardCancelService();

            cardCancelService
                .CancelTransaction("SB180111154208JIVO33", 200)
                .then((model) => {
                    assert.equal(model.Status !== "", true);
                    done();
                })
                .catch((err) => {
                    done(err);
                });

        });

        it("response should have Status field", function (done) {

            let cardCloseService = spgateway.createCreditCardCloseService();

            cardCloseService
                .refund("SB180111154208JIVO33", 200)
                .then((model) => {
                    assert.equal(model.Status !== "", true);
                    done();
                })
                .catch((err) => {
                    done(err);
                });

        });

        it("response should have Status field", function (done) {

            let cardCloseService = spgateway.createCreditCardCloseService();

            cardCloseService
                .requestPayment("SB180111154208JIVO33", 200)
                .then((model) => {
                    assert.equal(model.Status !== "", true);
                    done();
                })
                .catch((err) => {
                    done(err);
                });

        });
    });

});