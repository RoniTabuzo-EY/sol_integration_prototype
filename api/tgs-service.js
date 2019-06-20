const request = require('request');
const rp = require('request-promise');
const config = require('config/api-config');

const tgsEndpoint = config.getTGSProperties.endpoint;
const tgsCreateGrantRequestEndpoint = tgsEndpoint + 'CreateGrantRequest';
const tgsUpdateGrantRequestEndpoint = tgsEndpoint + 'UpdateGrantRequest';

function getOptions(url, reqMethod, obj){
    var options = {
        method: reqMethod,
        uri: url,
        auth: {
            username: 'Dltuser',
            password: 'Dltuserpassword'
        },
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({obj})
    };
    return options;
};

module.exports = {
 
    fnTGSCreateGrantRequest : (param, obj) => {
        var url = tgsCreateGrantRequestEndpoint + param;

        return rp(getOptions(url, 'POST', obj))
        .then(function (res) {
            console.log(res);
            return estimatedGrant = res;
        })
        .catch(function (err) {
            console.log(err);
        });
    },

    fnTGSUpdateGrantRequest : (param, obj) =>{
        var url = tgsUpdateGrantRequestEndpoint + param;

        return rp(getOptions(url, 'PUT', obj))
        .then(function (res) {
            console.log(res);
            return res;
        })
        .catch(function (err) {
            console.log(err);
        });
    },
}

