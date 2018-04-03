module.exports = class DataChainGenerator {

    constructor() {
        this.kvs = [];
    }

    addKeyValue(key, value) {
        this.kvs.push({ key: key, value: value });
    }

    genDataChain() {
        let results = [];
        for (let kv of this.kvs) {
            results.push(`${kv.key}=${kv.value}`);
        }
        return results.join("&");
    }

};