const BaseModel = require("./base.model");

module.exports = class CreditCardCloseModel extends BaseModel {

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
         *  1.純數字不含符號 2.一次刷卡請款金額需小於或等於授權金額 3. 一次刷卡退款金額需小於或等於請款金額 4.分期付款請款金額須等於授權金額 5.分期付款退款金額須等於請款金額 6.紅利折抵請款金額須等於授權金額 7.紅利折抵退款金額須等於請款金額
         */
        this.Amt = 0;
        /**
            1.同一商店中此編號不可重覆 2.只接受英文或數字與底線
         */
        this.MerchantOrderNo = "";
        /**
         *
         */
        this.TimeStamp = new Date().getTime().toString();
        /**
         *1.只能填數字1或2 1代表選用商店訂單編號 2代表選用智付通交易序號 2.當選用其中一種單號類別時，該種單號不可空白
         */
        this.IndexType = "";
        /**
         * 智付通平台交易序號
         */
        this.TradeNo = "";
        /**
         * 請款交易時請填1，退款交易時請填2
         */
        this.CloseType = "";

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

    /**
     *設定成 [請款交易]
     */
    setCloseTypeAsPayment() {
        this.CloseType = "1";
        return this;
    }

    /**
     * 設定成 [退款交易]
     */
    setCloseTypeAsRefund() {
        this.CloseType = "2";
        return this;
    }

};