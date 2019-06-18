const contract = require('truffle-contract');
const Web3 = require('web3');
const path = require('path');
const dateFormat = require('dateformat');

const claimJSON  = require(path.join(__dirname, '../build/contracts/Claim.json'));

const web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
web3 = new Web3(web3Provider);

var claimContract = contract(claimJSON);
claimContract.setProvider(web3Provider);
let claimInstance;

(async () => {
    var account = web3.eth.accounts[0]; 
    claimContract.defaults({from: account});
    claimInstance = await claimContract.deployed();
    console.log('Connected to Claim contract.');
})().catch(err => {  
    console.error('Failed to connect to Claim contract.');  
    console.error(err);
});

module.exports = {
    register : async (req) => {
        console.log('Start Register Course.');
        let response = await claimInstance.registerCourse(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.tpId, req.body.GrantRequest.tpName, req.body.GrantRequest.courseFee);
        if (response.err) {
            throw new Error("Error in Register Course.");
        }
        
            console.log('Fetched Register Course Response.');
            var applicantDOB = dateFormat(req.body.GrantRequest.applicantDOB, "isoDate");   
            var dateOfApplication = dateFormat(req.body.GrantRequest.dateOfApplication, "isoDate");

            response = await claimInstance.registerCourseApplicant(req.body.GrantRequest.caseId, req.body.GrantRequest.applicantName, req.body.GrantRequest.applicantNRIC,
                req.body.GrantRequest.applicantCitizenship, dateOfApplication, applicantDOB);

            if (response.err) {
                throw new Error("Error in Register Course Applicant.");
            }
                console.log('Fetched Register Course Applicant Response.');
    },

    updateCourseAssessment : async (req) => {
        console.log('Start Update Course Assessment.');
        let response = await claimInstance.updateCourseAssessment(req.body.GrantRequest.caseId, req.body.GrantRequest.nettFee, 
            req.body.GrantRequest.attendance, req.body.GrantRequest.assessment);
    
        if (response.err) {
            throw new Error("Error in Update Course Assessment Response.");
        }
            console.log('Fetched Update Course Assessment Response.');
    }
}
