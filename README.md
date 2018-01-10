# 智付通API

  簡化實作智付通付款流程與相關功能串接

---

## 已實作功能

  * MPG API (v1.2)
  * Periodical API (v1.0)
  * Creditcard Collect Refund API (v1.0)
  * Creditcard Deauthorize API (v1.0)
  * Transaction API
  
## 範例

### MPG Service

  * 付款(建立付款表單)
  
        const SpGateway = require("spgateway");

        const spgateway = new SpGateway(
            true, //(true for a dry run)
            your MerchantID,
            your HashKey,
            your HashIV,
            true // if you want to print info in console to debug. default is false
        );

        // crate payModel
        let payModel = mpgService.createMpgPayModel();
        // set
        payModel.MerchantOrderNo = "myordernohere";
        payModel.NotifyURL = "http://mysite.com/api/spgateway/notify";
        payModel.ReturnURL = "http://mysite.com/api/spgateway/return";
        payModel.ClientBackURL = "http://mysite.com/shop";
        payModel.Amt = 928;
        payModel.ItemDesc = "ProductX";

        // create payform
        let payFormHtml = mpgService.getAutoPayForm(payModel);
        
        
  * 接收通知(notify & return)
        
        // take express request as example
        let JSONData = request.body.JSONData;
        
        mpgService.parseNotification(JSONData)
               .then((notify)=>{
                    // update your order here
                })
                .catch((err)=>{
                    // exception or checkCode validation fails
                })

### Debug Logger

    const spgateway = new SpGateway(
            true, //(true for a dry run)
            your MerchantID,
            your HashKey,
            your HashIV,
            true // if you want to print info to debug, default is false
        );
    

## 關於
  
  歡迎 fork & pull request    
