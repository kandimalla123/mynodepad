var contrModule = angular.module('myNotePad');
contrModule.controller('ModalInterviewerController', function ($scope,$rootScope,$modalInstance,interviewerFormData,InterviewerService,$log) {
	
	  $scope.interviewerFormData=interviewerFormData;
	  $scope.interviewers=interviewerFormData.interviewers;
	  $scope.cancel = function () {
		  
		  $log.debug('ModalInterviewerController:cancel called');
		  
		  $modalInstance.dismiss('cancel');
	  };
	  $scope.ok = function (result) {
		  
		  $log.debug('ModalInterviewerController:ok called');
			  $modalInstance.close(result);
	 };
     
	 $scope.updateInterviewerById=function(record){
			$log.debug('ModalInterviewerController:updateInterviewerById called');
			InterviewerService.setInterviewRecord(record);
			InterviewerService.updateInterviewerById()
				.then(
					 function(data){
			             $log.debug('ModalInterviewerController:updateInterviewerById:success: '+data);
			             $scope.interviewerFormData.validMsg="Successfully Edited"+data._id;
			             
					  },
			          function(err) {
						$log.error('ModalInterviewerController:updateInterviewerById:error: '+err);
			            $scope.interviewerFormData.validMsg="Error:";
			    });  
	 };

	 $scope.addInterviewer = function() {
			  $log.debug('ModalInterviewerController:addSkill called');
			  InterviewerService.setInterviewRecord({name:$scope.interviewerFormData.inputName
				                                     ,eMail:$scope.interviewerFormData.inputEmail
				                                     ,isDisplay:true
				                                     ,requirements:[{}]
			                                       });
			  InterviewerService.add()
					 .then(
							function(data){
								 $log.debug('ModalInterviewerController:addSkill:success:'+data); 
								 $scope.interviewers.push(data);
								 $scope.interviewerFormData.validMsg="Successfully Added"+data._id;     
					        },
					        function(err) {
					            $log.error('ModalInterviewerController:addSkill:error'+err); 
					            $scope.interviewerFormData.validMsg="Error:";    	
					});         	
	 };


	
});