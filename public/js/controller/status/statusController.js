var contrModule = angular.module('myNotePad');

contrModule.controller('statusController',['$scope','$log','$http','StatusService','$modal',function($scope,$log,$http,StatusService,$modal) {

	var visaStatusList=[{id:0,name:'H1B'},{ id:1,name:'EAD' },{ id:2,name:'GC' },{ id:3,name:'L1B EAD' }];
	var workAvailList=[{id:0,name:'Immediately'},{ id:1,name:'1 week' },{ id:2,name:'2 weeks' },{ id:3,name:'3 weeks' }];
	var interviewStatusList=[{id:0,name:'Scheduled'},{ id:1,name:'Inprogress' },{ id:2,name:'Completed' },{ id:3,name:'Canceled' },{id:4,name:'Available'}];
	$scope.visaStatusRecords=[];
	$scope.workAvailStatusRecords=[];
	$scope.interviewStatusRecords=[];
	
	$scope.addVisaStatus=function(){
		   
		   for(var i=0; i<visaStatusList.length; i++){
			   
			   //$scope.addVisaStatus1(visaStatusList[i]);
		   }
	};
	   
	$scope.addWorkAvailStatus=function(){
		   
			   for(var i=0; i<workAvailList.length; i++){
				   
				  // $scope.addWorkAvailStatus1(workAvailList[i]);
			   }
	};
	$scope.addInterviewStatus=function(){
		   
		   for(var i=0; i<interviewStatusList.length; i++){
			   
			   //$scope.addInterviewStatus1(interviewStatusList[i]);
		   }
	};
	
	$scope.addVisaStatus1=function(record){
		   $log.debug('statusController:addVisaStatus1 called');
		   var visaStatusRecord=record;
		   StatusService.setVisaStatusRecord(visaStatusRecord);
		   StatusService.addVisaStatus()
			   .then(
					   function(countryRecord){
						   $log.debug('statusController:addVisaStatus1:success:'+countryRecord); 
		                   
		                },
		                
		                function(err) {
		                	$log.error('statusController:addVisaStatus1:error'+err); 
		                	
		    });         	
	   }
	   
		$scope.loadVisaStatus=function(){
			$log.debug('statusController:loadVisaStatus called');  
			StatusService.listVisaStatus()
				   .then(
						   function(visaStatusRecords){
							   $log.debug('statusController:loadVisaStatus:success'); 
							   $scope.visaStatusRecords = visaStatusRecords;
			                   
			                },
			                
			                function(err) {
			                	$log.error('statusController:loadVisaStatus:error'+err); 
			                	
			        });         	
				   
		};
		
		$scope.addWorkAvailStatus1=function(record){
			   $log.debug('statusController:addWorkAvailStatus1 called');
			   var workAvailStatusRecord=record;
			   StatusService.setWorkAvailStatusRecord(workAvailStatusRecord);
			   StatusService.addWorkAvailStatus()
				   .then(
						   function(data){
							   $log.debug('statusController:addWorkAvailStatus1:success:'+data); 
			                   
			                },
			                
			                function(err) {
			                	$log.error('statusController:addWorkAvailStatus1:error'+err); 
			                	
			    });         	
		 }
		$scope.getWorkAvailStatusList=function(){
			$log.debug('statusController:getWorkAvailStatusList called');  
			StatusService.getWorkAvailStatusList()
				   .then(
						   function(workAvailStatusRecords){
							   $log.debug('statusController:getWorkAvailStatusList:success'); 
							   $scope.workAvailStatusRecords = workAvailStatusRecords;
			                   
			                },
			                
			                function(err) {
			                	$log.error('statusController:getWorkAvailStatusList:error'+err); 
			                	
			        });         	
				   
		};
		
		$scope.addInterviewStatus1=function(record){
			   $log.debug('statusController:addInterviewStatus1 called');
			   var interviewStatusRecord=record;
			   StatusService.setInterviewStatusRecord(interviewStatusRecord);
			   StatusService.addInterviewStatus()
				   .then(
						   function(data){
							   $log.debug('statusController:addInterviewStatus1:success:'+data); 
			                   
			                },
			                
			                function(err) {
			                	$log.error('statusController:addInterviewStatus1:error'+err); 
			                	
			    });         	
		 }
		$scope.getInterviewStatusList=function(){
			$log.debug('statusController:getInterviewStatusList called');  
			StatusService.getInterviewStatusList()
				   .then(
						   function(interviewStatusRecords){
							   $log.debug('statusController:getInterviewStatusList:success'); 
							   $scope.interviewStatusRecords = interviewStatusRecords;
			                   
			                },
			                
			                function(err) {
			                	$log.error('statusController:getInterviewStatusList:error'+err); 
			                	
			        });         	
				   
		};
		var init1 = function (){
			
			//$scope.loadVisaStatus();
			//$scope.getWorkAvailStatusList();
			//$scope.getInterviewStatusList();

	   };
	   init1();
	
}]);
