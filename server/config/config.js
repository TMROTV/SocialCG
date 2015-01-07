module.exports = function(_){
    var config = {
        name: require('./../../package.json').name,
        mode: "development",
        port: 8080
    };

    _.assign(config, require('./'+config.mode));
    return config;
};