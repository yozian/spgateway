module.exports = class BaseModel {

    /**
     *  mapping properties if model has the property
     * @param {*} data
     */
    mappingFrom(data) {
        let self = this;
        if (!data) return self;
        Object.getOwnPropertyNames(data).filter((prop) => {
            return self.hasOwnProperty(prop);
        }).forEach((prop) => {
            self[prop] = data[prop];
        });
        return self;
    }

};