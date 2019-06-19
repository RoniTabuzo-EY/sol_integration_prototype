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
   grantRequestClient.register(req)
   .then(function (isSuccess) {
      console.log(isSuccess);

      if(isSuccess){
         res.end("isSuccess:" + isSuccess);

         //call TGS
         var applicantDOB = dateFormat(req.body.GrantRequest.applicantDOB, "isoDate");   
         var dateOfApplication = dateFormat(req.body.GrantRequest.dateOfApplication, "isoDate");
         
         var param = "?CourseID=" + req.body.GrantRequest.courseId + "&CaseID=" + req.body.GrantRequest.caseId;
         
         var registrationObj = {
            Name: req.body.GrantRequest.applicantName,
            NRIC: req.body.GrantRequest.applicantNRIC,
            DateOfBirth: applicantDOB,
            Citizenship: req.body.GrantRequest.applicantCitizenship,
            TpID: req.body.GrantRequest.tpId,
            TpName: req.body.GrantRequest.tpName,
            DateOfApplication: dateOfApplication,
            CourseFee: req.body.GrantRequest.courseFee
        };

         async() => {
            var estimatedGrant = await tgsService.fnTGSCreateGrantRequest(param, registrationObj);

            //call smart contract to update estimated grant
            if(estimatedGrant > 0){
               grantRequestClient.updateEstimatedGrant(req.body.GrantRequest.courseId, estimatedGrant)
               .then(r => (console.log(r)))
               .catch(e => (console.log(e)))
            }
         };
      }
   })
   .catch(function (err) {
      console.log(err);
      res.end(err);
   });
})

app.put('/updateGrantRequest', function (req, res) {

   //call smart contract 
   grantRequestClient.updateDisbursementDetails(req)
   .then(function (isSuccess) {
      console.log(isSuccess);

      if(isSuccess){
         res.end("isSuccess:" + isSuccess);

         //call TGS
         var param = "?CaseID="+ req.body.GrantRequest.caseId;
         + "&NettFee=" + req.body.GrantRequest.nettFee 
         + "&Attendance=" + req.body.GrantRequest.attendance + "&Assessment=" + req.body.GrantRequest.assessment;

         var dibursementDetailsObj = {
            NettFee: req.body.GrantRequest.nettFee,
            Attendance: req.body.GrantRequest.attendance,
            Assessment: assessment
        };

        async() => {
            var isExceptionFlow = await tgsService.fnTGSUpdateGrantRequest(param, dibursementDetailsObj);

            if(isExceptionFlow){
               grantRequestClient.updateExceptionStatus(req.body.GrantRequest.caseId, isExceptionFlow)
               .then(r => (console.log(r)))
               .catch(e => (console.log(e)))
            }
         }
      }
   })
   .catch(function (err) {
      console.log(err);
      res.end(err);
   });
})

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = 8082
   console.log("App listening at http://%s:%s", host, port)
})
