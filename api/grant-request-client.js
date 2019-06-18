//import contract from 'truffle-contract';
//import web3 from '../web3';
const contract = require('truffle-contract');
const Web3 = require('web3');
const path = require('path');

const claimJSON  = require(path.join(__dirname, '../build/contracts/Claim.json'));

var claimContract = contract(claimJSON);
claimContract.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
let claimInstance;

(async () => {
    const account = (await web3.eth.getAccounts())[0];      
    claimInstance = await claimContract.deployed();
    console.log('Connected to Claim contract.');
})().catch(err => {  
    console.error('Failed to connect to Claim contract.');  
    console.error(err);
});

module.exports = {
    fnRegisterCourse : async (tokenId, data, user) => {
        let response = await claimInstance.registerCourse(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.tpId, req.body.GrantRequest.tpName, req.body.GrantRequest.courseFee);
        if (response.err) { console.log('error');}
        else { console.log('fetched response')};
        return response;
    }
      


    // fnRegisterCourse : async function registerCourse(req){
    //     let claimInstance = await Claim.deployed();
    //     let response = await claimInstance.registerCourse(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.tpId, req.body.GrantRequest.tpName, req.body.GrantRequest.courseFee);
    //     if (response.err) { console.log('error');}
    //     else { console.log('fetched response')};
    // }

    // fnRegisterCourse : function registerCourse(req){
        
    //     Claim.deployed().then(function(instance) {
    //         return instance.registerCourse(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.tpId, req.body.GrantRequest.tpName, req.body.GrantRequest.courseFee)
        
    //      }).then(function(result) {
    //            console.log(result);
    //            isSuccess = true;             
    //      }, function(error) {
    //            console.log(error);
    //      }); 

    //      return isSuccess;
    // }

}
