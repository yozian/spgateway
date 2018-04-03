const https = require("https");

/**
 * @returns {Promise<string>}
 */
function post(requestOption, postData) {
    return new Promise((rs, rj) => {
        let httpRequest = https.request(requestOption, function(resp) {
            resp.setEncoding("utf8");
            let result = "";
            if (resp.statusCode !== 200) {
                rj(`${resp.statusCode}:${resp.statusMessage}`);
                return;
            }
            resp.on("data", function(chuck) {
                result += chuck.toString();
            });

            resp.on("end", function() {
                rs(result);
            });
        });
        // send post data
        httpRequest.write(postData);
        httpRequest.end();
    });
}

module.exports = {
    post: post

};