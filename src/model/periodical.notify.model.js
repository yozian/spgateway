const BaseModel = require("./base.model");

/**
 * 僅限form 回前端 post 使用
 */
module.exports = class PeriodicalNotifyModel extends BaseModel {

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
};

class PayResultModel extends BaseModel {

    constructor(data) {
        super();

        this.MerchantID = "";
        this.MerchantOrderNo = "";
        /**
         * 委託單週期。 W=每週 M=每月 Y=每年
         */
        this.PeriodType = "";

        /**
         * 授權次數
         */
        this.AuthTimes = 0;

        /**
         * 授權時間
         */
        this.AuthTime = "";

        /**
         * 1.顯示委託單所有授權日期排程。 2.格式為YYYY-MM-DD，若該參數有多個授權排程日期時，以半形逗號分隔。
         */
        this.DateArray = "";

        /**
         *
         */
        this.TradeNo = "";

        /**
         * 卡號前六與後四碼
         */
        this.CardNo = "";

        /**
         * 委託單的每期金額。
         */
        this.PeriodAmt = 0;

        /**
         * 銀行回覆當下該筆交易的授權碼
         */
        this.AuthCode = "";

        /**
         *  銀行回應碼 00 代表刷卡成功，其餘為刷卡失敗
         */
        this.RespondCode = "";

        /**
         *1. 該筆交易履約保證銀行。 該筆交易履約保證銀行。 該筆交易履約保證銀行。 該筆交易履約保證銀行。
          2. 如商店是直接與銀行簽約的信用卡特約商店，當使用信用卡支付時，本欄位的值會以空值回傳。
          3. 履保銀行英文代碼與中文名稱對應如下：
            ［Esun ]：玉山銀行
            ［Taishin］：台新銀行
         */
        this.EscrowBank = "";

        /**
         * 收單機構
         * 1.該筆交易的收單機構。
           2.收單機構英文代碼與中文名稱對應如下：
            ［Esun ]：玉山銀行
            ［Taishin］：台新銀行
         */
        this.AuthBank = "";

        /**
         * 委託單號
         * 定期定額委託單號
         */
        this.PeriodNo = "";

        this.mappingFrom(data);
    }

}