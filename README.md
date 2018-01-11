# 智付通API

  簡化實作智付通付款流程與相關功能串接

---

## 已實作功能

  * [MPG API (v1.2)](https://www.spgateway.com/dw_files/info_api/spgateway_gateway_MPGapi_V1_0_3.pdf)
  * [Periodical API (v1.0)](https://www.spgateway.com/dw_files/info_api/spgateway_gateway_periodical_api_V1_0_6.pdf)
  * [Creditcard Collect Refund API (v1.0)](https://www.spgateway.com/dw_files/info_api/gateway_creditcard_collect_refund_api_V1_0_0.pdf)
  * [Creditcard Deauthorize API (v1.0)](https://www.spgateway.com/dw_files/info_api/gateway_creditcard_deauthorize_api_V1_0_0.pdf)
  * [Transaction API](https://www.spgateway.com/dw_files/info_api/spgateway_gateway_Transaction_api_V1_0_1.pdf)
  
## 範例

### MPG Service

  * 付款(建立付款表單)
  
```javascript
const SpGateway = require("spgateway-api");

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

``` 
        
  * 接收通知(notify & return)
  
```javascript
// take express request as example
let JSONData = request.body.JSONData;

mpgService.parseNotification(JSONData)
        .then((notify)=>{
            // update your order here
        })
        .catch((err)=>{
            // exception or checkCode validation fails
        })
```   
### Debug Logger

```javascript

const spgateway = new SpGateway(
        true, //(true for a dry run)
        your MerchantID,
        your HashKey,
        your HashIV,
        true // if you want to print info to debug, default is false
    );
        
```        
        

## 關於
  
  歡迎 fork & pull request    
