const request = require('request');
const rp = require('request-promise');

const tgsEndpoint = 'https://tgsdemo.sakurasystem.cloud/TGS/rest/TGS/';
const tgsCreateGrantRequestEndpoint = tgsEndpoint + 'CreateGrantRequest';
const tgsUpdateGrantRequestEndpoint = tgsEndpoint + 'UpdateGrantRequest';

function getOptions(url, reqMethod){
    var options = {
        method: reqMethod,
        uri: url,
        auth: {
            username: 'Dltuser',
            password: 'Dltuserpassword'
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

