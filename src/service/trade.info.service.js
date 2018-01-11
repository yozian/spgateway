const logger = require("../lib/logger");
const log = logger.createLog("TradeInfoService");
const querystring = require("querystring");
const https = require("../lib/https.client");
const ValidationHelper = require("../lib/validation.helper");


const modelPivot = require("../model/mode.pivot");
const TradeInfoModel = modelPivot.TradeInfo.TradeInfoModel;

const tradeModelProps = Object.getOwnPropertyNames(new TradeInfoModel());

const spApiVersion = "1.2";

class TradeInfoService {

    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.config = config;
        this.host = config.host;
        this.validationHelper = new ValidationHelper(config);
    }

    /**
     *
     * @param {*} MerchantOrderNo
     * @param {*} Amt
     * @param {*} options
     * @returns {Promise}
     * VACC:{"Status":"SUCCESS","Message":"查詢成功","Result":{"MerchantID":"MS11237061","Amt":101,"TradeNo":"17040614064744695","MerchantOrderNo":"1491458785907","TradeStatus":"0","PaymentType":"VACC","CreateTime":"2017-04-06 14:06:47","PayTime":"0000-00-00 00:00:00","FundTime":"0000-00-00","CheckCode":"62190C43436AF42B742DA00BBB3771F239BC45A717D077D0287AF0E2EAAFB071","PayInfo":"(808)TestAccount12345"}}
     * WEBATM:{"Status":"SUCCESS","Message":"查詢成功","Result":{"MerchantID":"MS11237061","Amt":101,"TradeNo":"17040614031716236","MerchantOrderNo":"1491458579886","TradeStatus":"1","PaymentType":"WEBATM","CreateTime":"2017-04-06 14:03:17","PayTime":"2017-04-06 14:03:17","FundTime":"2017-04-13","CheckCode":"657D5D18875FD7221E9ACFBE6931854698FC56B926B5AA9A57F4AA216A2F8A31"}}
     * CreditCard:{"Status":"SUCCESS","Message":"查詢成功","Result":{"MerchantID":"MS11237061","Amt":101,"TradeNo":"17040516534170290","MerchantOrderNo":"1491382414278","TradeStatus":"3","PaymentType":"CREDIT","CreateTime":"2017-04-05 16:53:41","PayTime":"2017-04-05 16:53:41","FundTime":"0000-00-00","CheckCode":"9E7352F54980364B1E212B6106CC2968CD72862A6EB594509E6D26D3814780A4","RespondCode":"00","Auth":"930637","ECI":null,"CloseAmt":null,"CloseStatus":"0","BackBalance":null,"BackStatus":"0","RespondMsg":"授權成功","Inst":"0","InstFirst":"101","InstEach":"0"}}
     */
    queryOrder(MerchantOrderNo, Amt, options) {
        let self = this;
        let data = new TradeInfoModel();
        data.MerchantID = this.config.MerchantID;
        data.Version = spApiVersion;
        // 額外欄位binding
        if (options) {
            let optionProps = Object.getOwnPropertyNames(options);
            for (let prop of optionProps) {
                if (undefined !== option[prop] &&
                    null !== option[prop] &&
                    tradeModelProps.indexOf(prop) !== -1) {
                    model[prop] = options[prop];
                }
            }
        }
        data.MerchantOrderNo = MerchantOrderNo;
        data.Amt = Amt;
        data.CheckValue = self.validationHelper.genQryTrdInfoChkValue(data.Amt, data.MerchantOrderNo);
        log.debug("data", data);
        let postData = querystring.stringify(data);
        let reqOption = getRequestOption(self.host, postData);

        return https
            .post(reqOption, postData)
            .then((result) => {
                log.debug("raw response", result);
                let model = JSON.parse(result);
                let resultModel = model.Result;
                if (resultModel === "") {
                    return Promise.reject(new Error(model.Message));
                }
                let checkCode = self.validationHelper.genQryTrdInfoChkCode(resultModel.Amt, resultModel.MerchantOrderNo, resultModel.TradeNo);
                if (checkCode === resultModel.CheckCode) {
                    return model;
                } else {
                    return Promise.reject(new Error("CheckCode Validation Failed"));
                }
            });
    }
    
    get Models() {
        return modelPivot.TradeInfo;
    }
}

function getRequestOption(host, postData) {
    return {
        host: host,
        port: 443,
        path: "/API/QueryTradeInfo",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
}


module.exports = TradeInfoService;