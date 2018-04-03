const logger = require("./lib/logger");
const log = logger.createLog("spgateway");
const MpgService = require("./service/mpg.service");
const PeriodicalService = require("./service/periodical.service");
const TradeInfoService = require("./service/trade.info.service");
const CreditCardCloseService = require("./service/creditcard.close.service");
const CreditCardCancelService = require("./service/creditcard.cancel.service");

module.exports = class SpGateway {

    constructor(dryRun, merchantID, hashKey, hashIV, debug) {
        this.configuration = {
            host: (dryRun ? "c" : "") + "core.spgateway.com",
            MerchantID: merchantID,
            HashKey: hashKey,
            HashIV: hashIV
        };
        logger.switchLog(debug);
        log.debug("configuration applied", this.configuration);
    }

    createMpgService() {
        return new MpgService(this.configuration);
    }

    createPeriodicalService() {
        return new PeriodicalService(this.configuration);
    }

    createTradeInfoService() {
        return new TradeInfoService(this.configuration);
    }

    createCreditCardCloseService() {
        return new CreditCardCloseService(this.configuration);
    }

    createCreditCardCancelService() {
        return new CreditCardCancelService(this.configuration);
    }

};