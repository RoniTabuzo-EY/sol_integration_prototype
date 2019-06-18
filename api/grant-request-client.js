const web3 = require('web3');
ClaimJSON  = require(path.join(__dirname, 'build/contracts/Claim.json'));

//set provider
const provider    = new Web3.providers.HttpProvider("http://localhost:8545");
var Claim = contract(ClaimJSON);
Claim.setProvider(provider);

module.exports = {
    fnRegisterCourse : function registerCourse(req){
        var isSuccess = false;
        
        Claim.deployed().then(function(instance) {
            return instance.registerCourse(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.tpId, req.body.GrantRequest.tpName, req.body.GrantRequest.courseFee)
        
         }).then(function(result) {
               console.log(result);
               isSuccess = true;             
         }, function(error) {
               console.log(error);
         }); 

         return isSuccess;
    }

}

