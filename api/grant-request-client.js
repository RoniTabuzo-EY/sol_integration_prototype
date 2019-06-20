const contract = require('truffle-contract');
const Web3 = require('web3');
const path = require('path');
const dateFormat = require('dateformat');
const config = require('config/api-config');

const claimJSON  = require(path.join(__dirname, '../build/contracts/Claim.json'));

const web3Provider = new Web3.providers.HttpProvider(config.getGrantRequestClientProperties.provider);
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
        var isSuccess = false;

        let response = await claimInstance.registerCourse(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.tpId, req.body.GrantRequest.tpName, req.body.GrantRequest.courseFee);
        if (response.err) {
            console.log('Error in Register Course.' + err);
        }
        else {
            console.log('Fetched Register Course Response.');
            var applicantDOB = dateFormat(req.body.GrantRequest.applicantDOB, "isoDate");   
            var dateOfApplication = dateFormat(req.body.GrantRequest.dateOfApplication, "isoDate");

            response = await claimInstance.registerCourseApplicant(req.body.GrantRequest.caseId, req.body.GrantRequest.courseId, req.body.GrantRequest.applicantName, req.body.GrantRequest.applicantNRIC,
                req.body.GrantRequest.applicantCitizenship, dateOfApplication, applicantDOB);

            if (response.err) {
                console.log('Error in Register Course Applicant.' + err);
            }
            else {
                console.log('Fetched Register Course Applicant Response.');
                isSuccess = true;
            }
        }
        return Promise.resolve(isSuccess);
    },

    updateDisbursementDetails : async (req) => {
        console.log('Start Update Course Assessment.');
        let response = await claimInstance.updateDisbursementDetails(req.body.GrantRequest.caseId, req.body.GrantRequest.nettFee, 
            req.body.GrantRequest.attendance, req.body.GrantRequest.assessment);
    
        if (response.err) {
            console.log('Error in Update Disbursement Details.' + err);
        }
        else {
            console.log('Fetched Update Disbursement Details Response.');
        }
    },

    updateEstimatedGrant : async (courseId, estimatedGrant) => {
        console.log('Start Update Estimated Grant.');
        let response = await claimInstance.updateEstimatedGrant(courseId, estimatedGrant);
    
        if (response.err) {
            console.log('Error in Update Estimated Grant.' + err);
        }
        else {
            console.log('Fetched Update Estimated Grant Response.');
        }
    },

    updateExceptionStatus : async (caseId, exceptionStatus) => {
        console.log('Start Update Exception Status.');
        let response = await claimInstance.updateExceptionStatus(caseId, exceptionStatus);
    
        if (response.err) {
            console.log('Error in Update Exception Status.' + err);
        }
        else {
            console.log('Fetched Update Exception Status.');
        }
    }
}