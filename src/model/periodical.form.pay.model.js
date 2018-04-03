const BaseModel = require("./base.model");

/**
 * 僅限form 回前端 post 使用
 */
module.exports = class PeriodicalFormPayModel extends BaseModel {

    constructor(data) {
        super();

        /**
            商店代號
            V
            Varchar(15)
            智付通商店代號。
         */
        this.MerchantID_ = "";
        /**
            pay 資料用aes 加密
         */
        this.PostData_ = "";

        this.mappingFrom(data);
    }
};