var contrModule = angular.module('myNotePad');

contrModule.controller('interviewerController',['$scope','$rootScope','$log','$http','InterviewerService','$modal',function($scope,$rootScope,$log,$http,InterviewerService,$modal) {
	
	var interviewersList=[
	                       {id:0,name:'Srinivasa Rao',eMail:'SrinivasaRao.Kandimalla@cognizant.com',isDisplay:true,requirements:[{}]}
	                      ,{ id:1,name:'Sanjay Devarajan',eMail:'Sanjay.Devarajan@cognizant.com',isDisplay:true,requirements:[{}] }
	                      ,{ id:2,name:'Ajit Panicker',eMail:'Ajit.Panicker@cognizant.com',isDisplay:true,requirements:[{}] }
	                    ];
	
	$scope.interviewerRecordsAll=[];
	$scope.interviewerRecords=[];
	$scope.addInterviewer=function(){
		   
		   for(var i=0; i<interviewersList.length; i++){
			   
			  //$scope.addInterviewer1(interviewersList[i]);
		   }
	};
	
	$scope.addInterviewer1=function(record){
		   $log.debug('interviewerController:addInterviewer1 called');
		   var interviewerRecord=record;
		   InterviewerService.setInterviewRecord(interviewerRecord);
		   InterviewerService.add()
			   .then(
					   function(data){
						   $log.debug('interviewerController:addInterviewer1:success:'+data); 
		                   
		                },
		                
		                function(err) {
		                	$log.error('interviewerController:addInterviewer1:error'+err); 
		                	
		    });         	
	  };
	  
	  $scope.loadInterviewers=function(){
			$log.debug('interviewerController:loadInterviewers called');  
			InterviewerService.list()
				   .then(
						   function(interviewerRecords){
							   $log.debug('interviewerController:loadInterviewers:success'); 
							   $scope.interviewerRecordsAll = interviewerRecords;
			                },
			                
			                function(err) {
			                	$log.error('interviewerController:loadInterviewers:error'+err); 
			                	
			        });         	
				   
		};
		 $scope.openInterviewerFormModal = function (size) {
		        
		    	$log.debug('interviewerController:openInterviewerFormModal called'); 
		    	var interviewerFormData={formTitle:'Add/Edit Interviewer',validMsg:'',interviewers:$scope.interviewerRecordsAll};
		        var modalInstance = $modal.open({
		          templateUrl: 'templates/interview/interviewerModalWindow.html',
		          controller: 'ModalInterviewerController',
		          size: size,
		          resolve: {
		        	  interviewerFormData: function () {
		              return interviewerFormData;
		            }
		          }
		        });

		        modalInstance.result.then(function (result) {
		        	
		        	$log.debug('interviewerController:openInterviewerFormModal : rturn from modal window'); 
	                
		        }, function () {
		          $log.info('interviewerController  modal dismissed at: ' + new Date());
		        });
		};
	    var init=function(){
	    	$scope.loadInterviewers();
	    };
		init();


}]);
