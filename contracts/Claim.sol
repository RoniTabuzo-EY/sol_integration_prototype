pragma solidity ^0.4.0;

contract Claim{
    struct CourseRegistration{
      uint caseId;
      uint courseId;
      uint tpId;
      string tpName;
      uint courseFee;
    }
    
    struct CourseApplicant{
      uint caseId;
      string applicantName;
      string applicantNRIC;
      string applicantCitizenship;
      string dateOfApplication;
      string applicantDateOfBirth;
    }

    struct CourseAssessment{
      uint caseId;
      uint netfee;
      uint attendancePercentage;
      uint assessmentPercentage;
    }

    mapping(uint => CourseRegistration) public courseRegistrations;
    mapping(uint => CourseApplicant) public courseApplicants;
    mapping(uint => CourseAssessment) public courseAssessments;

    function registerCourse
        (uint _caseId,
          uint _courseId,
          uint _tpId,
          string _tpName,
          uint _courseFee) 
    public{
         courseRegistrations[_caseId] = CourseRegistration({
           courseId: _courseId,
           caseId: _caseId,
           tpId: _tpId,
           tpName: _tpName,
           courseFee: _courseFee
         });
    }
    
    function registerCourseApplicant
        (uint _caseId,
          string _applicantName,
          string _applicantNRIC,
          string _applicantCitizenship,
          string _dateOfApplication,
          string _applicantDateOfBirth) 
    public{
         courseApplicants[_caseId] = CourseApplicant({
          caseId: _caseId,
          applicantName: _applicantName,
          applicantNRIC: _applicantNRIC,
          applicantCitizenship: _applicantCitizenship,
          dateOfApplication: _dateOfApplication,
          applicantDateOfBirth: _applicantDateOfBirth
         });
    }

    function updateCourseAssessment
        (uint _caseId, uint _netfee, uint _attendancePercentage, uint _assessmentPercentage)
        public{
         courseAssessments[_caseId] = CourseAssessment({
          caseId: _caseId,
          netfee: _netfee,
          attendancePercentage: _attendancePercentage,
          assessmentPercentage: _assessmentPercentage
         });

    }
}
