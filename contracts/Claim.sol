pragma solidity ^0.4.0;

contract Claim{
    struct CourseRegistration{
      string caseId;
      uint courseId;
      uint tpId;
      string tpName;
      uint courseFee;
      uint netfee;
      uint attendancePercentage;
      uint assessmentPercentage;
      bool isExceptionFlow;
    }
    
    struct CourseApplicant{
      string caseId;
      uint courseId;
      string applicantName;
      string applicantNRIC;
      string applicantCitizenship;
      string dateOfApplication;
      string applicantDateOfBirth;
      uint estimatedGrant;
    }

    mapping(bytes32 => CourseRegistration) public courseRegistrations;
    mapping(uint => CourseApplicant) public courseApplicants;
    
    bytes32 caseIdKey;
    
    function registerCourse
        (string _caseId,
          uint _courseId,
          uint _tpId,
          string _tpName,
          uint _courseFee) 
    public{
         caseIdKey = convertStringToBytes32(_caseId); 
         courseRegistrations[caseIdKey] = CourseRegistration({
           courseId: _courseId,
           caseId: _caseId,
           tpId: _tpId,
           tpName: _tpName,
           courseFee: _courseFee,
           netfee: 0,
           attendancePercentage: 0,
           assessmentPercentage: 0,
           isExceptionFlow: false
         });
    }
    
    function registerCourseApplicant
        (string _caseId,
          uint _courseId,
          string _applicantName,
          string _applicantNRIC,
          string _applicantCitizenship,
          string _dateOfApplication,
          string _applicantDateOfBirth) 
    public{
          courseApplicants[_courseId] = CourseApplicant({
          caseId: _caseId,
          courseId: _courseId,
          applicantName: _applicantName,
          applicantNRIC: _applicantNRIC,
          applicantCitizenship: _applicantCitizenship,
          dateOfApplication: _dateOfApplication,
          applicantDateOfBirth: _applicantDateOfBirth,
          estimatedGrant: 0
         });
    }

    function updateDisbursementDetails
        (string _caseId, uint _netfee, uint _attendancePercentage, uint _assessmentPercentage) public{
            caseIdKey = convertStringToBytes32(_caseId);
            CourseRegistration storage courseRegistration = courseRegistrations[caseIdKey];
            courseRegistration.netfee = _netfee;    
            courseRegistration.attendancePercentage = _attendancePercentage;    
            courseRegistration.assessmentPercentage = _assessmentPercentage;    
    }
    
    function updateEstimatedGrant(uint _courseId, uint _estimatedGrant) public{
        CourseApplicant storage courseApplicant = courseApplicants[_courseId];
        courseApplicant.estimatedGrant = _estimatedGrant;
    }
    
    function updateExceptionStatus(string _caseId, bool _isExceptionFlow) public{
        caseIdKey = convertStringToBytes32(_caseId);
        CourseRegistration storage courseRegistration = courseRegistrations[caseIdKey];
        courseRegistration.isExceptionFlow = _isExceptionFlow;
    }
    
    function convertStringToBytes32(string key) returns (bytes32 ret) {
        if (bytes(key).length > 32) {
          throw;
        }
    
        assembly {
          ret := mload(add(key, 32))
        }
    }
}
