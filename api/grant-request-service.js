const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const basicAuth =  require('basic-auth');
const dateFormat = require('dateformat'); 

var grantRequestClient = require('./grant-request-client');
var tgsService = require('./tgs-service');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/createGrantRequest', function (req, res) {
   
   //call smart contract 
   var isSuccess = false;
   grantRequestClient.register(req)
   .then(function (res) {
      console.log(res);
      isSuccess = true;  
   })
   .catch(function (err) {
         console.log(err);
   });
   res.end("isSuccess:" + isSuccess);

   //call TGS
   var applicantDOB = dateFormat(req.body.GrantRequest.applicantDOB, "isoDate");   
   var dateOfApplication = dateFormat(req.body.GrantRequest.dateOfApplication, "isoDate");
   
   var param = "?CourseID=" + req.body.GrantRequest.courseId + "&CaseID=" + req.body.GrantRequest.caseId + "&Name=" + req.body.GrantRequest.applicantName 
      +"&NRIC=" + req.body.GrantRequest.applicantNRIC + "&DateOfBirth=" + applicantDOB + "&TpID="+ req.body.GrantRequest.tpId
      +"&TpName=" + req.body.GrantRequest.tpName + "&DateOfApplication=" + dateOfApplication +"&CourseFee=" + req.body.GrantRequest.courseFee
      +"&Citizenship=" + req.body.GrantRequest.applicantCitizenship;
   
   tgsService.fnTGSCreateGrantRequest(param);
})

app.put('/updateGrantRequest', function (req, res) {

   //call smart contract 
   var isSuccess = false;
   grantRequestClient.updateCourseAssessment(req)
   .then(function (res) {
      console.log(res);
      isSuccess = true;  
   })
   .catch(function (err) {
         console.log(err);
   });
   res.end("isSuccess:" + isSuccess);

   //call TGS
   var param = "?CaseID="+ req.body.GrantRequest.caseId + "&NettFee=" + req.body.GrantRequest.nettFee 
   + "&Attendance=" + req.body.GrantRequest.attendance + "&Assessment=" + req.body.GrantRequest.assessment;

   tgsService.fnTGSUpdateGrantRequest(param);
})

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = 8082
   console.log("App listening at http://%s:%s", host, port)
})
