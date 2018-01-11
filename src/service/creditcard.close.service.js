const logger = require("../lib/logger");
const log = logger.createLog("CreditCardCloseService");
const querystring = require("querystring");
const https = require("../lib/https.client");
const AES256 = require("../lib/aes256");

const modelPivot = require("../model/model.pivot");
const CreditCardCloseModel = modelPivot.CreditCard.CreditCardCloseModel;

const spApiVersion = "1.0";

/**
 * 請款與退款使用
 */
class CreditCardCloseService {

    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.config = config;
        this.aes = new AES256(config.HashKey, config.HashIV);
    }

    /**
     *
     * @param {*} merchantOrderNo
     * @param {*} amt
     * @returns {Promise} {"Status":"SUCCESS","Message":"退款資料新增成功","Result":{"MerchantID":"MS11237061","Amt":101,"MerchantOrderNo":"1491382445612","TradeNo":"17040516541391125"}}
     *
     */
    requestPayment(merchantOrderNo, amt) {
        let host = this.config.host;
        let merchantId = this.config.MerchantID;
        let aes = this.aes;

        let data = new CreditCardCloseModel();
        data.Version = spApiVersion;
        data.setCloseTypeAsPayment()
            .setMerchantOrderNo(merchantOrderNo);

        data.Amt = amt;
        // query string => aes encrypt
        let plainData = querystring.stringify(data);
        log.debug("request plain", plainData);

        let encryptData = aes.encrypt(plainData);
        log.debug("request encrypt data", encryptData);

        let postData = querystring.stringify({
            MerchantID_: merchantId,
            PostData_: encryptData
        });

        let reqOption = getRequestOption(host, postData);
        return https
            .post(reqOption, postData)
            .then((result) => {
                log.debug("raw response", result);
                return JSON.parse(result);
            });
    }

    /**
     *
     * @param {*} merchantOrderNo
     * @param {*} amt
     * @returns {Promise} {"Status":"TRA10045","Message":"該筆交易正在退款中或退款失敗","Result":{"MerchantID":"MS11237061","Amt":101,"MerchantOrderNo":"1491382445612","TradeNo":"17040516541391125"}}
     */
    refund(merchantOrderNo, amt) {
        let host = this.config.host;
        let merchantId = this.config.MerchantID;
        let aes = this.aes;
        let data = new CreditCardCloseModel();
        data.Version = spApiVersion;
        data.setCloseTypeAsRefund()
            .setMerchantOrderNo(merchantOrderNo);
        data.Amt = amt;
        // query string => aes encrypt
        let plainData = querystring.stringify(data);
        log.debug("request plain", plainData);

        let encryptData = aes.encrypt(plainData);
        log.debug("request encrypt data", encryptData);

        let postData = querystring.stringify({
            MerchantID_: merchantId,
            PostData_: encryptData
        });

        let reqOption = getRequestOption(host, postData);

        return https
            .post(reqOption, postData)
            .then((result) => {
                return JSON.parse(result);
            });
    }

    /**
     * @returns {modelPivot.CreditCard}
     */
    get Models() {
        return modelPivot.CreditCard;
    }
}

function getRequestOption(host, postData) {
    return {
        host: host,
        port: 443,
        path: "/API/CreditCard/Close",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
}


module.exports = CreditCardCloseService;