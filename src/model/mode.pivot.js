exports.MPG = {
  MpgPayModel: require("./mpg.pay.model"),
  MpgAsyncPayModel: require("./mpg.async.pay.model"),
  MpgNotifyModel: require("./mpg.notify.model")
}

exports.CreditCard = {
  CreditCardCancelModel: require("./creditcard.cancel.model"),
  CreditCardCloseModel: require("./creditcard.close.model")
};

exports.Periodical = {
  PeriodicalFormPayModel: require("./periodical.form.pay.model"),
  PeriodicalPayModel: require("./periodical.pay.model"),
  PeriodicalNotifyModel: require("./periodical.notify.model")
}

exports.TradeInfo = {
  TradeInfoModel: require("./trade.info.model")
}