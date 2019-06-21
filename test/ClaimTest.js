var Claim = artifacts.require("./Claim.sol");
const assert = require('assert');
const web3Utils = require('web3-utils');

let claimInstance;
contract('Claim' , (accounts)  => {

  beforeEach(async () => {
    claimInstance = await Claim.deployed()
  })

  it('Register Course' , async() => {
    await claimInstance.registerCourse("CA-N-2019-945361", 1, 2, "COMAT", 1000.00,"2019-06-17");
    const registration = await claimInstance.courseRegistrations(web3Utils.toHex("CA-N-2019-945361"));
    assert.equal(registration[0], "CA-N-2019-945361");
    assert.equal(registration[1].toNumber(), 1);
    assert.equal(registration[2].toNumber(), 2);
    assert.equal(registration[3], "COMAT");
    assert.equal(registration[4].toNumber(), 1000.00);
    assert.equal(applicant[5], "2019-06-17");
  });

  it('Register Course Applicant' , async() => {
    await claimInstance.registerCourseApplicant("CA-N-2019-945361", 1, "Applicant_XXX", "NRIC_XXX", "Singaporean", "1991-04-24",  5000.00);
    const applicant = await claimInstance.courseApplicants(1);
    assert.equal(applicant[0] , "CA-N-2019-945361");
    assert.equal(applicant[1].toNumber() , 1);
    assert.equal(applicant[2], "Applicant_XXX");
    assert.equal(applicant[3], "NRIC_XXX");
    assert.equal(applicant[4], "Singaporean");
    assert.equal(applicant[5], "1991-04-24");
    assert.equal(applicant[6].toNumber(), 5000);
  });

  it('Update Estimated Grant' , async() => {
    await claimInstance.updateEstimatedGrant(1, 1000.00);
    const applicant = await claimInstance.courseApplicants(1);
    assert.equal(applicant[0], "CA-N-2019-945361");
    assert.equal(applicant[7].toNumber(), 1000.00);
  });

  it('Update Disbursement Details' , async() => {
    await claimInstance.updateDisbursementDetails("CA-N-2019-945361", 1000.00, 83.00, 85.00);
    const registration = await claimInstance.courseRegistrations(web3Utils.toHex("CA-N-2019-945361"));
    assert.equal(registration[0], "CA-N-2019-945361");
    assert.equal(registration[5].toNumber(), 1000.00);
    assert.equal(registration[6].toNumber(), 83.00);
    assert.equal(registration[7].toNumber(), 85.00);
  });

  it('Update Exception Status' , async() => {
    await claimInstance.updateExceptionStatus("CA-N-2019-945361", true);
    const registration = await claimInstance.courseRegistrations(web3Utils.toHex("CA-N-2019-945361"));
    assert.equal(registration[0], "CA-N-2019-945361");
    assert.equal(registration[8], true);
  });

})
