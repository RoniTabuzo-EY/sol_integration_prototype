'use strict'

let tgsProps = {
    endpoint: "https://tgsdemo.sakurasystem.cloud/TGS/rest/TGS/",
    username: "Dltuser",
    password: "Dltuserpassword"
};

let grantRequestClientProps = {
    provider = "http://127.0.0.1:8545"
}

let grantRequestServiceProps = {
    port = "http://127.0.0.1:8545"
}

module.exports.getTGSProperties = tgsProps;
module.exports.getGrantRequestClientProperties = grantRequestClientProps;
module.exports.getGrantRequestServiceProperties = grantRequestServiceProps;