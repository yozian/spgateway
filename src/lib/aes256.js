const crypto = require("crypto");

class AES256Crypto {

    constructor(key, iv) {
        this.key = key;
        this.iv = iv;
    }

    encrypt(plainText) {
        let encrypt = crypto.createCipheriv("aes256", this.key, this.iv);
        let enc = encrypt.update(plainText, "utf8", "hex");
        return enc + encrypt.final("hex");
    }

    decrypt(encryptedText) {
        let decrypt = crypto.createDecipheriv("aes256", this.key, this.iv);
        decrypt.setAutoPadding(false);
        let text = decrypt.update(encryptedText, "hex", "utf8");
        let plainText = text + decrypt.final("utf8");
        // erase ascii 0-32  都要清掉
        let result = plainText.replace(/[\x00-\x20]+/g, "");
        return result;
    }
}

module.exports = AES256Crypto;