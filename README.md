# 智付通API ![](https://img.shields.io/npm/dm/spgateway-api.svg?style=flat) ![](https://img.shields.io/npm/v/spgateway-api.svg?style=flat) ![](https://travis-ci.org/yozian/spgateway.svg?branch=master)

  簡化實作智付通付款流程與相關功能串接

---

## 已實作功能

  * [MPG API (v1.2)](https://www.spgateway.com/dw_files/info_api/spgateway_gateway_MPGapi_V1_0_3.pdf)
  * [Periodical API (v1.0)](https://www.spgateway.com/dw_files/info_api/spgateway_gateway_periodical_api_V1_0_6.pdf)
  * [CreditCard Collect Refund API (v1.0)](https://www.spgateway.com/dw_files/info_api/gateway_creditcard_collect_refund_api_V1_0_0.pdf)
  * [CreditCard DeAuthorize API (v1.0)](https://www.spgateway.com/dw_files/info_api/gateway_creditcard_deauthorize_api_V1_0_0.pdf)
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

const mpgService = spgateway.createMpgService();

// crate payModel
let payModel = mpgService.createMpgPayModel();
// set properties
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

mpgService
  .parseNotification(JSONData)
  .then((notify) => {
      // update your order here
  })
  .catch((err) => {
      // exception or checkCode validation fails
  })
```   

### Period Service (定期定額)

 * 付款(建立付款表單)
 
```javascript

let periodService = spgateway.createPeriodicalService();
let payModel = periodService.createPeriodicalPayModel();

// set properties
payModel.PeriodAmt = 829;

// create pay form html
let payFormHtml = periodService.getAutoPayForm(payModel);


```

  * 接收通知(notify & return)
  
```javascript
// take express request as example
let body = request.body; // it would be { "Period": "xxxxx..." }

periodService
  .parseNotification(body)
  .then((notify) => {
      // update your order here
  })
  .catch((err) => {
      // exception or checkCode validation fails
  })
```   

### 交易查詢

```javascript
let tradeInfoService = spgateway.createTradeInfoService();

tradeInfoService.queryOrder("yourOrderNoHere", 200)
  .then((model) => {
    // success

  })
  .catch((err) => {
    // if check value validation fails or exception
  })
  
```   

### 信用卡取消授權

```javascript
let cardCancelService = spgateway.createCreditCardCancelService();

cardCancelService
  .CancelTransaction("yourOrderNoHere", 200)
  .then((model) => {
      // success
      
  })
  .catch((err) => {
     // if status !== success or exception
  })
  
```

### 信用卡請/退款

```javascript
let cardloseService = spgateway.createCreditCardCloseService();

// 請款
cardloseService
  .requestPayment("yourOrderNoHere", 200)
  .then((model) => {
    
  })
  .catch((err) => {
    
  })
  
// 退款
cardloseService
  .refund("yourOrderNoHere", 200)
  .then((model) => {
    
  })
  .catch((err) => {
    
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
