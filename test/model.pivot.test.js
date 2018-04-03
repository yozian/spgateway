const spgateway = require("./spgateway.provider");

describe("model pivot", function () {
    const mpgService = spgateway.createMpgService();

    describe("mpg models", function () {
        it("should have mappingFrom method & load correctly", function () {
            Object.getOwnPropertyNames(mpgService.Models)
                .forEach((m) => {
                    let type = mpgService.Models[m];
                    let model = new type();
                    if (typeof model.mappingFrom !== "function") {
                        throw new Error(`${type.toString()}: failed`);
                    }
                });
        });
    });
  
    const periodicalService = spgateway.createPeriodicalService();
    describe("periodical models", function () {
        it("should have mappingFrom method & load correctly", function () {
            Object.getOwnPropertyNames(periodicalService.Models)
                .forEach((m) => {
                    let type = periodicalService.Models[m];
                    let model = new type();
                    if (typeof model.mappingFrom !== "function") {
                        throw new Error(`${type.toString()}: failed`);
                    }
                });
        });
    });
  
    const creditCardService = spgateway.createCreditCardCancelService();
    describe("creditCard models", function () {
        it("should have mappingFrom method & load correctly", function () {
            Object.getOwnPropertyNames(creditCardService.Models)
                .forEach((m) => {
                    let type = creditCardService.Models[m];
                    let model = new type();
                    if (typeof model.mappingFrom !== "function") {
                        throw new Error(`${type.toString()}: failed`);
                    }
                });
        });
    });
  
  
    const tradeInfoService = spgateway.createTradeInfoService();
    describe("tradeInfo models", function () {
        it("should have mappingFrom method & load correctly", function () {
            Object.getOwnPropertyNames(tradeInfoService.Models)
                .forEach((m) => {
                    let type = tradeInfoService.Models[m];
                    let model = new type();
                    if (typeof model.mappingFrom !== "function") {
                        throw new Error(`${type.toString()}: failed`);
                    }
                });
        });
    });
  

});