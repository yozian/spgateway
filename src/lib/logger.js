let isDebug = true;

function log() {
    if (isDebug)
        console.log(new Date().toJSON(), ...arguments);
}

module.exports = {
    createLog: function () {
        const storedArgs = [].slice.call(arguments);
        return {
            debug: function () {
                const args = storedArgs.concat(...arguments);
                log.apply(null, args);
            }
        };
    },
    switchLog: function (status) {
        isDebug = status === true;
    }
};