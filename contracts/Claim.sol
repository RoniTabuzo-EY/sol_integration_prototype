pragma solidity >=0.4.21 <0.6.0;

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
      string dateOfApplication;
    }
    
    struct CourseApplicant{
      string caseId;
      uint courseId;
      string applicantName;
      string applicantNRIC;
      string applicantCitizenship;
      string applicantDateOfBirth;
      uint grossMonthlyIncome;
      uint estimatedGrant;
    }
    
    mapping(bytes32 => CourseRegistration) public courseRegistrations;
    mapping(uint => CourseApplicant) public courseApplicants;
    
    bytes32 caseIdKey;
    
    function registerCourse
        (string memory _caseId,
          uint _courseId,
          uint _tpId,
          string memory _tpName,
          uint _courseFee,
          string memory _dateOfApplication) 
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
           isExceptionFlow: false,
           dateOfApplication: _dateOfApplication
         });
    }
    
    function registerCourseApplicant
        (string memory _caseId,
          uint _courseId,
          string memory _applicantName,
          string memory _applicantNRIC,
          string memory _applicantCitizenship,
          string memory _applicantDateOfBirth,
          uint _grossMonthlyIncome) 
    public{
          courseApplicants[_courseId] = CourseApplicant({
          caseId: _caseId,
          courseId: _courseId,
          applicantName: _applicantName,
          applicantNRIC: _applicantNRIC,
          applicantCitizenship: _applicantCitizenship,
          applicantDateOfBirth: _applicantDateOfBirth,
          grossMonthlyIncome: _grossMonthlyIncome,
          estimatedGrant: 0
         });
    }

    function updateDisbursementDetails
        (string memory _caseId, uint _netfee, uint _attendancePercentage, uint _assessmentPercentage) public{
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
    
    function updateExceptionStatus(string memory _caseId, bool _isExceptionFlow) public{
        caseIdKey = convertStringToBytes32(_caseId);
        CourseRegistration storage courseRegistration = courseRegistrations[caseIdKey];
        courseRegistration.isExceptionFlow = _isExceptionFlow;
    }
    
    function convertStringToBytes32(string memory key) public returns (bytes32 ret) {
        require (bytes(key).length <= 32); 
    
        assembly {
          ret := mload(add(key, 32))
        }
    }
}
