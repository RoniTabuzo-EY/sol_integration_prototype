var Claim = artifacts.require("./Claim.sol");
const assert = require('assert')

let claimInstance;
contract('Claim' , (accounts)  => {

  beforeEach(async () => {
    claimInstance = await Claim.deployed()
  })

  it('Register Course' , async() => {
    await claimInstance.registerCourse(1, 2, 3, "TP_XXX", 1000.00);
    const registration = await claimInstance.courseRegistrations(1);
    assert.equal(registration[0].toNumber(), 1);
    assert.equal(registration[1].toNumber(), 2);
    assert.equal(registration[2].toNumber(), 3);
    assert.equal(registration[3], "TP_XXX");
    assert.equal(registration[4].toNumber(), 1000.00);
  })

  it('Register Course Applicant' , async() => {
    await claimInstance.registerCourseApplicanr(1, "Applicant_XXX", "NRIC_XXX", "Singaporean", "2019-06-17", "1991-04-24");
    const applicant = await claimInstance.courseRegistrations(1);
    assert.equal(applicant[0].toNumber() , 1);
    assert.equal(applicant[1], "Applicant_XXX");
    assert.equal(applicant[2], "NRIC_XXX");
    assert.equal(applicant[3], "Singaporean");
    assert.equal(applicant[4], "2019-06-17");
    assert.equal(applicant[5], "1991-04-24");
  })

  it('Update Course Assessment' , async() => {
    await claimInstance.updateCourseAssessment(1, 1000.00, 83.00, 85.00);
    const registration = await claimInstance.courseRegistrations(1);
    assert.equal(registration[0].toNumber(), 1);
    assert.equal(registration[1].toNumber(), 1000.00);
    assert.equal(registration[2].toNumber(), 83.00);
    assert.equal(registration[3].toNumber(), 85.00);
  })

})
