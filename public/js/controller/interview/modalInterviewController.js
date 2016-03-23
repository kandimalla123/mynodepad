var contrModule = angular.module('myNotePad');
contrModule.controller('ModalInterviewController', function ($scope,$rootScope,$modalInstance,sheduleFormData,sheduleService,InterviewerService,$log) {
	
	$log.debug('ModalInterviewController called'); 
	
	  $scope.lData={interviewStatusList:[],interviewerList:[]};
	  $scope.sheduleFormData=sheduleFormData;
	  $scope.cancel = function () {
		  
		  $log.debug('ModalInterviewController:cancel called');
		  
		  $modalInstance.dismiss('cancel');
	  };
	  $scope.ok = function (result) {
		  
		  $log.debug('ModalInterviewController:ok called');
			  $modalInstance.close(result);
	 };
	 $scope.submitForm = function(){
	    	
	    	$log.debug('ModalInterviewController:submitForm called');
	     	sheduleService.setInterviewer($scope.sheduleFormData.interviewer);
	    	sheduleService.setInterviewee($scope.sheduleFormData.interviewee);
	    	sheduleService.setDate($scope.sheduleFormData.date);
	    	sheduleService.setTime($scope.sheduleFormData.time);
	    	sheduleService.setStatus($scope.sheduleFormData.selectedStatus);
	    	sheduleService.setComments($scope.sheduleFormData.comments);
	    	sheduleService.setProfile($scope.sheduleFormData.profile);
	      	
	    	if($scope.sheduleFormData.id==null){
	       	  sheduleService.setId(null);
	       	  $scope.addRecord();
	      	}
	      	else{
	      		sheduleService.setId($scope.sheduleFormData.id);
	      		$scope.editRecord();
	      	}
	       
	    	
	  };
	  $scope.addRecord=function(){
		  sheduleService.add()
		   .then(
				   function(data){
	                  $log.debug('ModalInterviewController:addRecord:success'+data);
	                  $scope.sheduleFormData.validMsg="Successfully Added :"+data._id;
	                  $scope.ok({data:data,msg:$scope.sheduleFormData.validMsg});
	                  
				   },
	               function(err) {
	               	$log.error('ModalInterviewController:addRecord:error'+err);
	               	$scope.sheduleFormData.validMsg="Error";
	       });  
		  
	  };
	  $scope.editRecord=function(){
			 $log.debug('ModalInterviewController:editRecord called');
			  sheduleService.editRecord()
			   .then(
					   function(data){
		                  $log.debug('ModalInterviewController:editRecord:success: '+data);
		                  $scope.sheduleFormData.validMsg="Successfully Edited :"+data._id;
		                  $scope.ok({data:data,msg:$scope.sheduleFormData.validMsg});
					   },
		               function(err) {
						$log.error('ModalInterviewController:editRecord:error: '+err);
		               	$scope.sheduleFormData.validMsg="Error:";
		       });  
			  
	  };


      var init=function(){
    	  
    	   $scope.lData.interviewStatusList=$rootScope.gData.interviewStatusList;
           //$scope.sheduleFormData.selectedStatus=$scope.lData.interviewStatusList[0];
      };
	  init();
});