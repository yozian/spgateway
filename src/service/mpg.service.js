const logger = require("../lib/logger");
const log = logger.createLog("PeriodicalService");

const ValidationHelper = require("../lib/validation.helper");
const payFormGenerator = require("../lib/payform.generator");

const SHA256 = require("../lib/sha256");
const shaEncrypt = new SHA256("MyTokenSecrete");

const modelPivot = require("../model/model.pivot");
const MpgPayModel = modelPivot.MPG.MpgPayModel;
const MpgNotifyModel = modelPivot.MPG.MpgNotifyModel;


const spApiVersion = "1.1";

class MpgService {
    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.config = config;
        this.apiUrl = `https://${config.host}/MPG/mpg_gateway`;
        this.validationHelper = new ValidationHelper(config);
    }
    
    
    /**
     * 
     * @returns {MpgPayModel}
     */
    createMpgPayModel() {
        return new MpgPayModel();
    }

    /**
     * 付款 html form
     * @returns {string}
     */
    getAutoPayForm(payModel) {
        let model = new MpgPayModel();
        model = Object.assign(model, payModel);
        model.Version = model.Version || spApiVersion;
        model.MerchantID = this.config.MerchantID;

        model.TokenTerm = shaEncrypt.encrypt(model.Email).toUpperCase();
        model.CheckValue = this.validationHelper.genMpgCheckValue(model.Amt, model.MerchantOrderNo, model.TimeStamp, model.Version);
        log.debug("payModel", payModel);
        let html = payFormGenerator(model, this.apiUrl);
        log.debug("payFormHtml", html);
        return html;
    }

    /**
     *
     * @param {string} jsonString
     * @returns {Promise<MpgNotifyModel>}
     * VACC: {"Status":"SUCCESS","Message":"取號成功","Result":{"MerchantID":"MS11237061","Amt":101,"TradeNo":"17040700413810767","MerchantOrderNo":"1491496889809","CheckCode":"91EAD5C8290BABAD4FB99024DBDB56C99336665BCBC117B2B04B9536EA528A6E","PaymentType":"VACC","ExpireDate":"2017-04-14","ExpireTime":"23:59:59","BankCode":"808","CodeNo":"TestAccount12345"}}
     * CREDIT :{ Status: 'SUCCESS', Message: '授權成功', Result: { MerchantID: 'MS11237061', Amt: 101, TradeNo: '17040612171797240', MerchantOrderNo: '1491452222783', RespondType: 'JSON', CheckCode: '626B373EEBE8AA4541D91B738477115B564361C4DC7C0E97516B8B4902C9B3CC', IP: '1.173.74.76', EscrowBank: 'KGI', PaymentType: 'CREDIT', RespondCode: '00', Auth: '930637', Card6No: '400022', Card4No: '1111', Exp: '2303', TokenUseStatus: '2', InstFirst: 101, InstEach: 0, Inst: 0, ECI: '', PayTime: '2017-04-06 12:17:17' } }
     */
    parseNotification(jsonString) {
        let model = JSON.parse(jsonString || "{}");
        model.Result = JSON.parse(model.Result || "{}");
        let resultModel = model.Result;
        let checkCode = this.validationHelper.genMpgCheckCode(resultModel.Amt, resultModel.MerchantOrderNo, resultModel.TradeNo);
        return Promise
            .resolve()
            .then(() => {
                if (checkCode === resultModel.CheckCode) {
                    return model;
                } else {
                    return Promise.reject(new Error("CheckCode Validation Failed"));
                }
            });
    }
    
    /**
     * @returns {modelPivot.MPG}
     */
    get Models() {
        return modelPivot.MPG;
    }
}

module.exports = MpgService;