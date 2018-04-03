/**
 * 產生auto post 智付通 form all filed are hidden
 * @param {*} payInfoModel
 */
module.exports = function genPayForm(payModel, url) {
    let html = [];
    let formId = `_auto_pay_Form_${new Date().getTime()}`;
    html.push(`<form id="${formId}" method="post" action="${url}">`);

    for (let key in payModel) {
        let value = payModel[key];
        html.push(`<input type="hidden" name="${key}" value="${value}" />`);
    }

    html.push("</form>");
    html.push("<script>");
    html.push(`document.getElementById("${formId}").submit();`);
    html.push("</script>");
    return html.join("\n");
};