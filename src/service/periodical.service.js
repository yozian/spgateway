const logger = require("../lib/logger");
const log = logger.createLog("PeriodicalService");
const AES256 = require("../lib/aes256");
const ValidationHelper = require("../lib/validation.helper");
const payFormGenerator = require("../lib/payform.generator");

const modelPivot = require("../model/model.pivot");
const PeriodicalFormPayModel = modelPivot.Periodical.PeriodicalFormPayModel;
const PeriodicalPayModel = modelPivot.Periodical.PeriodicalPayModel;
const PeriodicalNotifyModel = modelPivot.Periodical.PeriodicalNotifyModel;

const spApiVersion = "1.0";

class PeriodicalService {

    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.config = config;
        this.apiUrl = `https://${config.host}/MPG/period`;
        this.aes256 = new AES256(config.HashKey, config.HashIV);
        this.validationHelper = new ValidationHelper(config);
    }

    createPeriodicalPayModel() {
        return new PeriodicalPayModel();
    }

    /**
     * 定期定額付款
     */
    getAutoPayForm(payModel) {
        let model = new PeriodicalNotifyModel();

        model = Object.assign(model, payModel);

        model.Version = model.Version || spApiVersion;
        model.TimeStamp = new Date().getTime();
        model.RespondType = model.RespondType || "JSON";
        //
        let plainDataChain = this.validationHelper.genPeriodicalPlainPostData(model);
        let formModel = new PeriodicalFormPayModel();
        formModel.MerchantID_ = this.config.MerchantID;
        formModel.PostData_ = this.aes256.encrypt(plainDataChain);

        log.debug("payModel", payModel);

        let html = payFormGenerator(formModel, this.apiUrl);

        log.debug("payFormHtml", html);
        return html;
    }

    /**
     *
     * @param {*} jsonString
     * @returns {Promise<PeriodicalNotifyModel>}
     * {"Status":"SUCCESS","Message":"\u59d4\u8a17\u55ae\u6210\u7acb\uff0c\u4e14\u9996\u6b21\u6388\u6b0a\u6210\u529f","Result":{"MerchantID":"MS11237061","MerchantOrderNo":"wtfvar21493044547363","PeriodType":"M","PeriodAmt":"100","AuthTimes":12,"DateArray":"2017-05-01,2017-06-01,2017-07-01,2017-08-01,2017-09-01,2017-10-01,2017-11-01,2017-12-01,2018-01-01,2018-02-01,2018-03-01,2018-04-01","TradeNo":"17042422355946059","AuthCode":"930637","RespondCode":"00","AuthTime":"20170424223559","CardNo":"400022******1111","EscrowBank":"KGI","AuthBank":"KGI","PeriodNo":"P170424223558pfFygT"}}
     *
     */
    parseNotification(model) {
        let self = this;

        return Promise
            .resolve()
            .then(() => {
                let encryptedText = (model.Result || model.Period);
                let rtnModel = {
                    Status: "",
                    Message: "",
                    Result: {}
                };
                try {
                    rtnModel = JSON.parse(self.aes256.decrypt(encryptedText));
                } catch (e) {
                    rtnModel.Status = "-1";
                    rtnModel.Message = "parse Failed";
                    rtnModel.Result = { rawResp: encryptedText };
                }
                return rtnModel;
            });
    }

    /**
     * @returns {modelPivot.Periodical}
     */
    get Models() {
        return modelPivot.Periodical;
    }
}




module.exports = PeriodicalService;