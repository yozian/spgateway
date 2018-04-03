const BaseModel = require("./base.model");

module.exports = class tradeInfoModel extends BaseModel {

    constructor(data) {
        super();

        this.MerchantID = "";
        this.Version = "";
        this.RespondType = "JSON";
        this.CheckValue = "";
        this.TimeStamp = 0;
        this.MerchantOrderNo = "";
        this.Amt = 0;

        this.mappingFrom(data);
    }
};