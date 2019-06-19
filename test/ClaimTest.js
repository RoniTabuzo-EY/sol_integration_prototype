var Claim = artifacts.require("./Claim.sol");
const assert = require('assert')

let claimInstance;
contract('Claim' , (accounts)  => {

  beforeEach(async () => {
    claimInstance = await Claim.deployed()
  })

  it('Register Course' , async() => {
    await claimInstance.registerCourse("CA-N-2019-945361", 1, 2, "COMAT", 1000.00);
    const caseIdKey = await claimInstance.convertStringToBytes32("CA-N-2019-945361");
    const registration = await claimInstance.courseRegistrations(caseIdKey);
    assert.equal(registration[0], "CA-N-2019-945361");
    assert.equal(registration[1].toNumber(), 1);
    assert.equal(registration[2].toNumber(), 2);
    assert.equal(registration[3], "COMAT");
    assert.equal(registration[4].toNumber(), 1000.00);
  });

  it('Register Course Applicant' , async() => {
    await claimInstance.registerCourseApplicant("CA-N-2019-945361", 1, "Applicant_XXX", "NRIC_XXX", "Singaporean", "2019-06-17", "1991-04-24");
    const applicant = await claimInstance.courseApplicants(1);
    assert.equal(applicant[0] , "CA-N-2019-945361");
    assert.equal(applicant[1].toNumber() , 1);
    assert.equal(applicant[2], "Applicant_XXX");
    assert.equal(applicant[3], "NRIC_XXX");
    assert.equal(applicant[4], "Singaporean");
    assert.equal(applicant[5], "2019-06-17");
    assert.equal(applicant[6], "1991-04-24");
  });

  it('Update Disbursement Details' , async() => {
    await claimInstance.updateCourseAssessment("CA-N-2019-945361", 1000.00, 83.00, 85.00);
    const caseIdKey = await claimInstance.convertStringToBytes32("CA-N-2019-945361");
    const assessment = await claimInstance.courseAssessments(caseIdKey);
    assert.equal(assessment[0], "CA-N-2019-945361");
    assert.equal(assessment[1].toNumber(), 1000.00);
    assert.equal(assessment[2].toNumber(), 83.00);
    assert.equal(assessment[3].toNumber(), 85.00);
  });

  it('Update Estimated Grant' , async() => {
    await claimInstance.updateEstimatedGrant("CA-N-2019-945361", 1000.00);
    const caseIdKey = await claimInstance.convertStringToBytes32("CA-N-2019-945361");
    const assessment = await claimInstance.courseAssessments(caseIdKey);
    assert.equal(assessment[0], "CA-N-2019-945361");
    assert.equal(assessment[1].toNumber(), 1000.00);
  });

  it('Update Exception Status' , async() => {
    await claimInstance.updateExceptionStatus("CA-N-2019-945361", true);
    const caseIdKey = await claimInstance.convertStringToBytes32("CA-N-2019-945361");
    const assessment = await claimInstance.courseAssessments(caseIdKey);
    assert.equal(assessment[0], "CA-N-2019-945361");
    assert.equal(assessment[1].toNumber(), true);
  });

})
