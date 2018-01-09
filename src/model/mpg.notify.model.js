const BaseModel = require("./base.model");

module.exports = class MpgNotifyModel extends BaseModel {

    constructor(data) {
        super();
        this.RawResponse = "";
        // SUCCESS
        this.Status = "";
        // 授權成功
        this.Message = "";
        this.Result = new PayResultModel();
        this.mappingFrom(data);
    }
}

class PayResultModel extends BaseModel {

    constructor(data) {

        super();
        this.MerchantID = "";
        this.Amt = 0;
        this.TradeNo = "";
        this.MerchantOrderNo = "";
        this.RespondType = "";
        this.CheckCode = "";
        this.IP = "";
        this.EscrowBank = "";
        this.PaymentType = "";
        this.RespondCode = "";
        this.Auth = "";
        this.Card6No = "";
        this.Card4No = "";
        this.Exp = "";
        this.TokenUseStatus = "";
        this.InstFirst = 0;
        this.InstEach = 0;
        this.Inst = 0;
        this.ECI = "";
        this.PayTime = "";
        this.mappingFrom(data);
    }
}