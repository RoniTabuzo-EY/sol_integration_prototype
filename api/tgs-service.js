const request = require('request');
const rp = require('request-promise');
const config = require('api-config');

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
        var url = tgsCreateGrantRequestEndpoint + param;
        rp(getOptions(url, 'POST', obj))
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
    },

    fnTGSUpdateGrantRequest : function updateGrantRequestService(param, obj){
        var url = tgsUpdateGrantRequestEndpoint + param;
        rp(getOptions(url, 'PUT', obj))
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
    },
}

