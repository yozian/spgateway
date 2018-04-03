const BaseModel = require("./base.model");

module.exports = class MpgAsyncPayModel extends BaseModel {

    constructor(data) {
        super();
        this.RawResponse = data ? JSON.stringify(data) : "";
        // SUCCESS
        this.Status = "";
        // 授權成功
        this.Message = "";
        this.mappingFrom(data);
        this.Result = new ResultModel(data ? data.Result : {});
    }
};

class ResultModel extends BaseModel {

    constructor(data) {

        super();
        this.MerchantID = "";
        this.Amt = 0;
        this.TradeNo = "";
        this.MerchantOrderNo = "";
        this.PaymentType = "";
        this.ExpireDate = "";
        // ATM轉帳回傳參數
        this.BankCode = "";
        this.CodeNo = "";
        // 超商代碼繳費回傳參數
        //  this.CodeNo = "";
        // 超商條碼繳費回傳參數
        this.Barcode_1 = "";
        this.Barcode_2 = "";
        this.Barcode_3 = "";
        this.mappingFrom(data);
    }
}