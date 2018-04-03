const logger = require("../lib/logger");
const log = logger.createLog("CreditCardCloseService");
const querystring = require("querystring");
const https = require("../lib/https.client");
const ValidationHelper = require("../lib/validation.helper");
const AES256 = require("../lib/aes256");
const modelPivot = require("../model/model.pivot");
const CreditCardCancelModel = modelPivot.CreditCard.CreditCardCancelModel;

const spApiVersion = "1.0";

/**
 * 信用卡取消授權
 */
class CreditCardCloseService {

    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.config = config;
        this.aes = new AES256(config.HashKey, config.HashIV);
        this.validationHelper = new ValidationHelper(config);
    }

    /**
     *
     * @param {*} merchantOrderNo
     * @param {*} amt
     * @returns {Promise} {"Status":"SUCCESS","Message":"放棄授權成功","Result":{"MerchantID":"MS11237061","Amt":101,"MerchantOrderNo":"1491382414278","TradeNo":"17040516534170290","CheckCode":"9E7352F54980364B1E212B6106CC2968CD72862A6EB594509E6D26D3814780A4"}}
     */
    CancelTransaction(merchantOrderNo, amt) {
        let self = this;
        let host = this.config.host;
        let merchantId = this.config.MerchantID;
        let aes = this.aes;

        let data = new CreditCardCancelModel();
        data.Version = spApiVersion;
        data.setMerchantOrderNo(merchantOrderNo);
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
                let model = JSON.parse(result);
                // validate checkCode
                let resultModel = model.Result;
                
                if (model.Status !== "SUCCESS") {
                    return model;
                }
                
                let checkCode = self.validationHelper.genCreditCardCancelCheckCode(resultModel.Amt, resultModel.MerchantOrderNo, resultModel.TradeNo);
                if (checkCode === resultModel.CheckCode) {
                    return model;
                } else {
                    return Promise.reject("CheckCode Validation Failed");
                }
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
        path: "/API/CreditCard/Cancel",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    };
}


module.exports = CreditCardCloseService;