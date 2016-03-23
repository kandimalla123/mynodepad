//var contrModule = angular.module('myNotePad', ['ngRoute','ui.bootstrap','service']);
var contrModule = angular.module('myNotePad');
contrModule.controller('interviewController',['$scope','$rootScope','$log','$http','sheduleService','ProfileService','InterviewerService','$modal',
                                              function($scope,$rootScope,$log,$http,sheduleService,ProfileService,InterviewerService,$modal) {
	
    $scope.sheduleRecords=[];
	$scope.feedback=[];
	var statusList=[];
	$scope.dInterviewerList=[];
	var defaultSheduleFormData={id:null,interviewer:{},interviewee:"",date:"",time:"",comments:"",selectedStatus:{}
	                       ,validMsg:"",sheduleRecords:[],feedback:[],animationsEnabled:true,myFile:"",fileSizeFromat:"",profile:{}
	                       ,isFormOpen:false,formTitle:'Add Interview'};
	
	$scope.sheduleFormData=angular.copy(defaultSheduleFormData);
    $scope.edit=function(record){
	  
	  $scope.sheduleFormData.formTitle='Edit Interview';
	  $scope.sheduleFormData.isFormOpen=true;
	  
	  $scope.sheduleFormData.id=record._id;
	  $scope.sheduleFormData.validMsg="";
	  $scope.sheduleFormData.interviewer=record.interviewer;
	  for (var i=0; i<$rootScope.gData.interviewerList.length; i++){
		  if($rootScope.gData.interviewerList[i].eMail == record.interviewer.eMail){
			  $scope.sheduleFormData.interviewer=$rootScope.gData.interviewerList[i];
		  }
	  }
	  $scope.sheduleFormData.interviewee=record.interviewee;
	  $scope.sheduleFormData.comments=record.comments;
	  for (var i=0; i<$rootScope.gData.interviewStatusList.length; i++){
		  if($rootScope.gData.interviewStatusList[i].id == record.status.id){
			  
			  $scope.sheduleFormData.selectedStatus=$rootScope.gData.interviewStatusList[i];
			  $log.debug('interviewController:'+$scope.sheduleFormData.selectedStatus.name);
			  
		  }
			  
	  }
	  $scope.sheduleFormData.date=new Date(record.date);
	  $scope.sheduleFormData.time=new Date(record.time);
	  $scope.sheduleFormData.feedback=record.feedback;
	  $scope.sheduleFormData.profile=record.profile;
	 
	  
  };
  
  
 
  $scope.deleteRecord=function(record){
	  $log.debug('interviewController:deleteRecord'+record._id);
		 sheduleService.setId(record._id);
		  sheduleService.deleteRecord()
		   .then(
				   function(data){
					   $log.debug('interviewController:deleteRecord:sucess:'+data);
                       $scope.load();
	                  $scope.sheduleFormData.validMsg="Successfully Deleted :"+data._id;
	                  $scope.updateProfileScheduleRecord(data,true);
				   },
	               function(err) {
					   $log.error('interviewController:deleteRecord:error:'+err);
	               	$scope.sheduleFormData.validMsg="Error:";
	       });  
		  
   };
   $scope.load=function(){
	    $log.debug('interviewController:load called');
		sheduleService.list()
		   .then(
				   function(sheduleRecords){
					   $log.debug('interviewController:load:sucess:');
	                   $scope.sheduleRecords = sheduleRecords;
	                   paginate1();
	                   
	                },
	                
	                function(err) {
	                	$log.error('interviewController:load:error:'+err);
	                	
	        });         	
		   
	};
	
	$scope.openAddInterviewForm = function (size) {
        
    	$log.debug('interviewController:openAddInterviewForm called:'); 
    	$scope.sheduleFormData.isFormOpen=true;
    	$scope.sheduleFormData.formTitle="Add Interview";
    	$scope.sheduleFormData.validMsg="";
    	$scope.sheduleFormData.selectedStatus=$rootScope.gData.interviewStatusList[0];
    	$scope.sheduleFormData.interviewer=$rootScope.gData.interviewerList[0];
        var modalInstance = $modal.open({
          templateUrl: 'templates/interview/interviewModalWindow.html',
          controller: 'ModalInterviewController',
          size: size,
          resolve: {
        	  sheduleFormData: function () {
              return $scope.sheduleFormData;
            }
          }
        });

        modalInstance.result.then(function (result) {
        	
            resetSheduleForm();
            $scope.load();
            $scope.sheduleFormData.validMsg=result.msg;


        }, function () {
            resetSheduleForm();
            $log.info('interviewController modal dismissed at: ' + new Date());
        });
    };
    
    $scope.openEditInterviewForm = function(size,record){
        
    	$log.debug('interviewController:openEditInterviewForm called'); 
    	$scope.edit(record);
        var modalInstance = $modal.open({
          templateUrl: 'templates/interview/interviewModalWindow.html',
          controller: 'ModalInterviewController',
          size: size,
          resolve: {
        	  sheduleFormData: function () {
              return $scope.sheduleFormData;
            }
          }
        });

        modalInstance.result.then(function (result){
        	
            resetSheduleForm();
            $scope.load();
            $scope.sheduleFormData.validMsg=result.msg;
            $scope.updateProfileScheduleRecord(result.data,false);

        }, function () {
          resetSheduleForm();
          $log.info('interviewController:Modal dismissed at: ' + new Date());
        });
    };
   
    $scope.updateProfileScheduleRecord = function (interviewRecord,delFlag) {
    	
   	     $log.debug('interviewController:updateProfileScheduleRecord called'+interviewRecord.profile.pRecordId);
		 ProfileService.updateProfileScheduleList(interviewRecord,delFlag)
		   .then(
				   function(data){
	                  $log.debug('interviewController:updateProfileScheduleRecord:fetch:success: '+data);
				   },
	               function(err) {
					$log.error('interviewController:updateProfileScheduleRecord:fetch:error: '+err);
					$scope.profileFormData.validMsg=err;
	       }); 
   	
   };

    
	$scope.open = function (size,record) {
        $scope.feedback=record.feedback;
	    var modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'templates/interview/feedbackModalWindow.html',
	      controller: 'ModalFeedbackCtrl',
	      size: size,
	      resolve: {
	    	  feedback: function () {
	          return $scope.feedback;
	        }
	      }
	   });
   };
  
   $scope.toggleAnimation = function () {
		  // alert('toggle');
	  $scope.animationsEnabled = !$scope.animationsEnabled;
   };
	


   var paginate1=function(){
	   $log.debug('interviewController:paginate1 called'); 
	$scope.data = { maxSize: 5, currentPage: 1, numPerPage: 10, total: $scope.sheduleRecords.length};
    $scope.$watch('data.currentPage', function() {
    	//alert('watch'+$scope.data.currentPage);
        var begin = (($scope.data.currentPage - 1) * $scope.data.numPerPage)
        , end = begin + $scope.data.numPerPage;
        //alert($scope.sheduleRecords.length);
    $scope.pagedItems = $scope.sheduleRecords.slice(begin, end);
    });
  };

   $scope.sheduleInterview = function(profile){
	  
	  $log.debug('interviewController:sheduleInterview called'); 
	  $scope.sheduleFormData.isFormOpen=true;
	  $scope.sheduleFormData.validMsg="";
	  $scope.sheduleFormData.interviewee=profile.candidateName;
	  $scope.sheduleFormData.date=new Date(profile.interviewAvailability.date);
	  $scope.sheduleFormData.time=new Date(profile.interviewAvailability.time);
  } ;
   
   function resetSheduleForm(){
	   
	   $scope.sheduleFormData=angular.copy(defaultSheduleFormData);
   }
  
   $rootScope.$on('InterviewButtonClicked', function () {
   	init();
   });

   
   var init = function (){
		$scope.load();
   };
   init();
   
   
    
}]);




