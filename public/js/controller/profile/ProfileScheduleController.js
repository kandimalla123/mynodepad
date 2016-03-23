var contrModule = angular.module('myNotePad');

contrModule.controller('ProfileScheduleController',['$scope','$log','$http','profileScheduleService','$modal',function($scope,$log,$http,profileScheduleService,$modal) {
	
	
	 $scope.addProfileSchduleRecord=function(profileId){
		   $log.debug('ProfileScheduleController:addProfileSchduleRecord called'); 
		   var prfoileScheduleRcord={profileId:"55df92744ab716ea10dc542b",scheduleList:[{id:"55df92ba4ab716ea10dc542c"}] };
		   profileScheduleService.setProfileSchduleRecord(prfoileScheduleRcord);
		   profileScheduleService.add()
			   .then(
					   function(data){
						  $log.debug('ProfileScheduleController:addProfileSchduleRecord:sucess'+data); 
					   },
		               function(err) {
						 $log.error('ProfileScheduleController:addProfileSchduleRecord:error'+err); 
		               	 $scope.profileFormData.validMsg="Error";
		       });  
			  
	  };

	
}]);
