var contrModule = angular.module('myNotePad');
contrModule.controller('ModalSkillController', function ($scope,$rootScope,$modalInstance,skillFormData,SkillService,$log) {
	
	
	  $scope.skillFormData=skillFormData;
	  $scope.skills=skillFormData.skills;
	  $scope.cancel = function () {
		  
		  $log.debug('ModalSkillController:cancel called');
		  
		  $modalInstance.dismiss('cancel');
	  };
	  $scope.ok = function (result) {
		  
		  $log.debug('ModalSkillController:ok called');
			  $modalInstance.close(result);
	 };
     
	 $scope.updateSkill = function(record){
	    	$log.debug('ModalSkillController:submitForm called');
			$scope.updateSkillById(record);
 	};
	$scope.updateSkillById=function(record){
		$log.debug('ModalSkillController:updateSkillById called');
		SkillService.setSkillRecord(record);
		SkillService.updateSkillById()
			.then(
				 function(data){
		             $log.debug('ModalSkillController:updateSkillById:success: '+data);
		             $scope.skillFormData.validMsg="Successfully Edited"+data._id;
		             
				  },
		          function(err) {
					$log.error('ModalSkillController:updateSkillById:error: '+err);
		            $scope.skillFormData.validMsg="Error:";
		    });  
	};
	$scope.addSkillOne = function() {
		$log.debug('ModalSkillController:addSkill called'+$scope.skillFormData.inputSkill);
	};
	$scope.addSkill = function() {
		  $log.debug('ModalSkillController:addSkill called');
		  SkillService.setSkillRecord({name:$scope.skillFormData.inputSkill,code:'',isDisplay:true});
		  SkillService.add()
				 .then(
						function(data){
							 $log.debug('ModalSkillController:addSkill:success:'+data); 
							 $scope.skills.push(data);
							 $scope.skillFormData.validMsg="Successfully Added"+data._id;     
				        },
				        function(err) {
				            $log.error('ModalSkillController:addSkill:error'+err); 
				            $scope.skillFormData.validMsg="Error:";    	
				});         	
	};

	
});