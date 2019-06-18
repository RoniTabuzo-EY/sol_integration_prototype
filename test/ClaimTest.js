var Claim = artifacts.require("./Claim.sol");
const assert = require('assert')

let claimInstance;
contract('Claim' , (accounts)  => {

  beforeEach(async () => {
    claimInstance = await Claim.deployed()
  })

  it('Register Course' , async() => {
    await claimInstance.registerCourse(1, 1, 1, "XXX", 1000);
    const registration = await claimInstance.courseRegistrations(1);
    assert.equal(registration.caseId , 1);
  
  })
})