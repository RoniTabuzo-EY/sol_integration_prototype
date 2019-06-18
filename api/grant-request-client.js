import contract from 'truffle-contract';
import web3 from '../web3';

ClaimJSON  = require(path.join(__dirname, 'build/contracts/Claim.json'));

//set provider
const provider    = new Web3.providers.HttpProvider("http://localhost:8545");
var Claim = contract(ClaimJSON);
Claim.setProvider(provider);

module.exports = {

    fnRegisterCourse : async function registerCourse(req){
        let claimInstance = await Claim.deployed();
        let response = await claimInstance.registerCourse(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.tpId, req.body.GrantRequest.tpName, req.body.GrantRequest.courseFee);
        if (response.err) { console.log('error');}
        else { console.log('fetched response')};
    }

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

