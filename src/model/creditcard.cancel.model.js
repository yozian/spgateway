const BaseModel = require("./base.model");

module.exports = class CreditCardCancelModel extends BaseModel {

    constructor(data) {
        super();
        /**
         *String或是JSON
         */
        this.RespondType = "JSON";
        /**
         *
         */
        this.Version = "1.0";
        /**
         *  純數字不含符號，需與授權金額相同
         */
        this.Amt = 0;
        /**
            1.同一商店中此編號不可重覆 2.只接受英文或數字與底線
         */
        this.MerchantOrderNo = "";
        /**
         * 智付通平台交易序號
         */
        this.TradeNo = "";

        /**
         *1.只能填數字1或2 1代表選用商店訂單編號 2代表選用智付通交易序號 2.當選用其中一種單號類別時，該種單號不可空白
         */
        this.IndexType = "";

        this.TimeStamp = new Date().getTime().toString();

        /**
         * 若此交易的取消授權為批次處理方式，系統在接收金融機構處理結果之後，以幕後方式回傳給商店結果。
         */
        this.NotifyURL = "";

        this.mappingFrom(data);
    }

    /**
     *
     * @param {*} orderNo
     */
    setMerchantOrderNo(orderNo) {
        this.MerchantOrderNo = orderNo;
        this.IndexType = "1";
        return this;
    }

    /**
     *
     * @param {*} tradeNo
     */
    setSpOrderNo(tradeNo) {
        this.TradeNo = tradeNo;
        this.IndexType = "2";
        return this;
    }

}