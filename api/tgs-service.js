const request = require('request');
const rp = require('request-promise');
const config = require('api-config');

const tgsEndpoint = config.tgs.endpoint;
const tgsCreateGrantRequestEndpoint = tgsEndpoint + 'CreateGrantRequest';
const tgsUpdateGrantRequestEndpoint = tgsEndpoint + 'UpdateGrantRequest';

function getOptions(url, reqMethod){
    var options = {
        method: reqMethod,
        uri: url,
        auth: {
            username: config.tgs.username,
            password: config.tgs.password
        }
    };
    return options;
};

module.exports = {
 
    fnTGSCreateGrantRequest : function createGrantRequestService(param){
        var url = tgsCreateGrantRequestEndpoint + param;
        rp(getOptions(url, 'POST'))
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
    },

    fnTGSUpdateGrantRequest : function updateGrantRequestService(param){
        var url = tgsUpdateGrantRequestEndpoint + param;
        rp(getOptions(url, 'PUT'))
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
    },
}

