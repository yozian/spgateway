const crypto = require("crypto");

class Sha256 {
    constructor(key) {
        this.key = key;
    }

    encrypt(plainText) {
        let sha = crypto.createHash("sha256", this.key);
        return sha.update(plainText).digest("hex");
    }
}

module.exports = Sha256;