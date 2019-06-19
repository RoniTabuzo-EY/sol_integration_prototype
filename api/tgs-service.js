const request = require('request');
const rp = require('request-promise');

const tgsEndpoint = 'https://tgsdemo.sakurasystem.cloud/TGS/rest/TGS/';
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
 
    fnTGSCreateGrantRequest : function createGrantRequestService(param, obj){
        var estimatedGrant = 0;
        var url = tgsCreateGrantRequestEndpoint + param;

        rp(getOptions(url, 'POST', obj))
        .then(function (res) {
            console.log(res);
            estimatedGrant = res;
        })
        .catch(function (err) {
            console.log(err);
        });

        return estimatedGrant;
    },

    fnTGSUpdateGrantRequest : function updateGrantRequestService(param, obj){
        var isExceptionFlow = false;
        var url = tgsUpdateGrantRequestEndpoint + param;

        rp(getOptions(url, 'PUT', obj))
        .then(function (res) {
            console.log(res);
            isExceptionFlow = res;
        })
        .catch(function (err) {
            console.log(err);
        });
        
        return isExceptionFlow;
    },
}

