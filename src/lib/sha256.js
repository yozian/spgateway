const crypto = require("crypto");

class SHA256 {
    constructor() {

    }

    encrypt(plainText) {
        let sha = crypto.createHash("sha256");
        return sha.update(plainText).digest("hex");
    }
}

module.exports = SHA256;