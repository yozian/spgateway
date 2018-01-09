const Sha256 = require("./sha256");
const DataChainGenerator = require("./data.chain.generator");

class ValidationHelper {

    constructor(config) {
        this.config = config;
        this.sha256 = new Sha256(config.HashKey);
    }

    /**
     * 上行 Qry check value 建立
     * @param {*} Amt
     * @param {*} MerchantOrderNo
     */
    genQryTrdInfoChkValue(Amt, MerchantOrderNo) {
        let dcg = new DataChainGenerator();
        dcg.addKeyValue("IV", this.config.HashIV);
        dcg.addKeyValue("Amt", Amt);
        dcg.addKeyValue("MerchantID", this.config.MerchantID);
        dcg.addKeyValue("MerchantOrderNo", MerchantOrderNo);
        dcg.addKeyValue("Key", this.config.HashKey);
        let dataChain = dcg.genDataChain();
        return this.sha256.encrypt(dataChain).toUpperCase();
    }


    /**
     * 下行 Qry check code 建立
     * @param {*} Amt
     * @param {*} MerchantOrderNo
     */
    genQryTrdInfoChkCode(Amt, MerchantOrderNo, TradeNo) {
        let dcg = new DataChainGenerator();
        dcg.addKeyValue("HashIV", this.config.HashIV);
        dcg.addKeyValue("Amt", Amt);
        dcg.addKeyValue("MerchantID", this.config.MerchantID);
        dcg.addKeyValue("MerchantOrderNo", MerchantOrderNo);
        dcg.addKeyValue("TradeNo", TradeNo);
        dcg.addKeyValue("HashKey", this.config.HashKey);
        let dataChain = dcg.genDataChain();
        return this.sha256.encrypt(dataChain).toUpperCase();
    }

    /**
     * 上行 MPG check value 建立
     * @param {*} Amt
     * @param {*} MerchantOrderNo
     * @param {*} TimeStamp
     * @param {*} Version
     */
    genMpgCheckValue(Amt, MerchantOrderNo, TimeStamp, Version) {
        let dcg = new DataChainGenerator();
        dcg.addKeyValue("HashKey", this.config.HashKey);
        dcg.addKeyValue("Amt", Amt);
        dcg.addKeyValue("MerchantID", this.config.MerchantID);
        dcg.addKeyValue("MerchantOrderNo", MerchantOrderNo);
        dcg.addKeyValue("TimeStamp", TimeStamp);
        dcg.addKeyValue("Version", Version);
        dcg.addKeyValue("HashIV", this.config.HashIV);
        let dataChain = dcg.genDataChain();
        return this.sha256.encrypt(dataChain).toUpperCase();
    }

    /**
     * MPG 回傳check code 檢驗
     * @param {*} Amt
     * @param {*} MerchantOrderNo
     * @param {*} TradeNo
     */
    genMpgCheckCode(Amt, MerchantOrderNo, TradeNo) {
        let dcg = new DataChainGenerator();
        dcg.addKeyValue("HashIV", this.config.HashIV);
        dcg.addKeyValue("Amt", Amt);
        dcg.addKeyValue("MerchantID", this.config.MerchantID);
        dcg.addKeyValue("MerchantOrderNo", MerchantOrderNo);
        dcg.addKeyValue("TradeNo", TradeNo);
        dcg.addKeyValue("HashKey", this.config.HashKey);
        let dataChain = dcg.genDataChain();
        return this.sha256.encrypt(dataChain).toUpperCase();
    }

    /**
     * CreditCard Cancel 回傳check code 檢驗
     * @param {*} Amt
     * @param {*} MerchantOrderNo
     * @param {*} TradeNo
     */
    genCreditCardCancelCheckCode(Amt, MerchantOrderNo, TradeNo) {
        let dcg = new DataChainGenerator();
        dcg.addKeyValue("HashIV", this.config.HashIV);
        dcg.addKeyValue("Amt", Amt);
        dcg.addKeyValue("MerchantID", this.config.MerchantID);
        dcg.addKeyValue("MerchantOrderNo", MerchantOrderNo);
        dcg.addKeyValue("TradeNo", TradeNo);
        dcg.addKeyValue("HashKey", this.config.HashKey);
        let dataChain = dcg.genDataChain();
        return this.sha256.encrypt(dataChain).toUpperCase();
    }

    genPeriodicalPlainPostData(model) {
        let dcg = new DataChainGenerator();

        dcg.addKeyValue("RespondType", model.RespondType);
        dcg.addKeyValue("TimeStamp", model.TimeStamp);
        dcg.addKeyValue("Version", "1.0");
        dcg.addKeyValue("MerOrderNo", model.MerOrderNo);
        dcg.addKeyValue("ProdDesc", model.ProdDesc);
        dcg.addKeyValue("PeriodAmt", model.PeriodAmt);
        dcg.addKeyValue("PeriodType", model.PeriodType);
        dcg.addKeyValue("PeriodPoint", model.PeriodPoint);
        dcg.addKeyValue("PeriodStartType", model.PeriodStartType);
        dcg.addKeyValue("PeriodTimes", model.PeriodTimes);
        dcg.addKeyValue("ReturnURL", model.ReturnURL);
        dcg.addKeyValue("PeriodMemo", model.PeriodMemo);
        dcg.addKeyValue("PayerEmail", model.PayerEmail);
        dcg.addKeyValue("EmailModify", model.EmailModify);
        dcg.addKeyValue("PaymentInfo", model.PaymentInfo);
        dcg.addKeyValue("OrderInfo", model.OrderInfo);
        dcg.addKeyValue("NotifyURL", model.NotifyURL);
        dcg.addKeyValue("BackURL", model.BackURL);

        return dcg.genDataChain();
    }

}


module.exports = ValidationHelper;