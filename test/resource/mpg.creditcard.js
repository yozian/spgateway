let result = { "MerchantID": "MS13034418", "Amt": 2487, "TradeNo": "18011115432225613", "MerchantOrderNo": "SB180111154208JIVO33", "RespondType": "JSON", "CheckCode": "8AD3EA0B26E33696C6069F28F7FAA1A2043D88D4828BC71936859495F21934C7", "IP": "1.34.131.143", "EscrowBank": "HNCB", "PaymentType": "CREDIT", "PayTime": "2018-01-11 15:43:22", "RespondCode": "00", "Auth": "930637", "Card6No": "400022", "Card4No": "1111", "Exp": "2004", "TokenUseStatus": 1, "InstFirst": 0, "InstEach": 0, "Inst": 0, "ECI": "" };


let response = { "Status": "SUCCESS", "Message": "授權成功", "Result": JSON.stringify(result) };


module.exports = {
  form: ``,

  responseBody: { JSONData: JSON.stringify(response) }

};
