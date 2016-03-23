
//var contrModule = angular.module('myNotePad', ['ngRoute','ui.bootstrap','service']);
 var contrModule = angular.module('myNotePad');
contrModule.controller('profileController',['$scope','$rootScope','$log','$http','ProfileService','LocationService','sheduleService','$modal','$filter',
                                            function($scope,$rootScope,$log,$http,ProfileService,LocationService,sheduleService,$modal,$filter) {
	$log.debug('profileController called');  
	  $scope.profileRecords=[];
	  $scope.countryRecords=[];
	  $scope.currentSortField='';
	  $scope.isCollapsed = true;
	  $scope.profileSchduleRecords=[];
	  $scope.profileSeachForm={currentSearchField:'',searchQuery:''};
	  
	    var defaultProfileFormData={id:null,candidateName:"",contactNumber:"",eMail:"",skypeId:""
			,currentLocation:{city:"",state:{},country:{}},visaSelectedStatus:{},workAvailSelectedStatus:{}
	        ,interviewAvailability:{date:"",time:""},interviewAvailTime:"",profile:{id:0,resumeLink:""
	        ,showDownloadLink:false},myFile:"",fileSizeFromat:"",validMsg:"",isFormOpen:false,formTitle:'Add Profile'
	        ,scheduleList:[]};
	    $scope.profileFormData=angular.copy(defaultProfileFormData);
		
	    $scope.loadProfiles=function(sortField){
			$log.debug('profileController:loadProfiles called:'+sortField.name);  
			ProfileService.profileList(sortField)
				   .then(
						   function(profileRecords){
							   $log.debug('profileController:loadProfiles:success'); 
			                   $scope.profileRecords = profileRecords;
    			               profilePaginate1();
			                   
			                },
			                
			                function(err) {
			                	$log.error('profileController:loadProfiles:error'+err); 
			                	
			        });         	
				   
		};
		
	
		  
		  

		$scope.delProfileRecord=function(record){
			  $log.debug('profileController:delProfileRecord: '+record._id);
			  ProfileService.setProfileRecord(record);
			  ProfileService.delProfileRecord()
				   .then(
						   function(data){
							   $log.debug('profileController:delProfileRecord:sucess:'+data);
			                  
			                  for(var i=0; i<$scope.profileRecords.length; i++){
			                	  
			                	  if($scope.profileRecords[i]._id==data._id){
			                		  $scope.profileRecords.splice(i,1);
			                	  }
			                	  
			                  }
		                      for(var i=0; i<$scope.profilePagedItems.length; i++){
			                	  
			                	  if($scope.profilePagedItems[i]._id==data._id){
			                		  $scope.profilePagedItems.splice(i,1);
			                	  }
			                	  
			                  }
			                  $scope.profileFormData.validMsg="Successfully Deleted :"+data._id;
						   },
			               function(err) {
							   $log.error('profileController:delProfileRecord:error:'+err);
			               	$scope.profileFormData.validMsg="Error:";
			       });  
				  
		   };
		   $scope.editProfile=function(record){
				  
			      $log.debug('profileController:editProfile-record id is:'+record._id);
			      
			      $scope.profileFormData.formTitle='Edit Profile';
				  $scope.profileFormData.isFormOpen=true;
			      
			      $scope.profileFormData.id=record._id;
				  $scope.profileFormData.candidateName=record.candidateName;
				  $scope.profileFormData.validMsg="";
				  $scope.profileFormData.contactNumber=record.contactNumber;
				  $scope.profileFormData.eMail=record.eMail;
				  $scope.profileFormData.skypeId=record.skypeId;
				  $log.debug('visa selected status: '+record.visaSelectedStatus.name);
				  $scope.profileFormData.scheduleList=record.scheduleList;
				  for (var i=0; i<$rootScope.gData.visaStatusList.length; i++){
					  if($rootScope.gData.visaStatusList[i].id == record.visaSelectedStatus.id){
						  
						  $scope.profileFormData.visaSelectedStatus=$rootScope.gData.visaStatusList[i];
					  }
						  
				  }
				  for (var i=0; i<$rootScope.gData.workAvailStatusList.length; i++){
					  if($rootScope.gData.workAvailStatusList[i].id == record.workAvailSelectedStatus.id){
						  
						  $scope.profileFormData.workAvailSelectedStatus=$rootScope.gData.workAvailStatusList[i];
					  }
						  
				  }
				  for (var i=0; i<$rootScope.gData.countryList.length; i++){
					  if($rootScope.gData.countryList[i].id == record.currentLocation.country.id){
						  
						  $scope.profileFormData.currentLocation.country=$rootScope.gData.countryList[i];
					  }
						  
				  }
				  if(record.currentLocation.state==null){
					  $log.debug('profileController:editProfile- selected state is not valid'); 
					  $scope.profileFormData.currentLocation.state={};
				  }
				  else{
					  
					  for (var i=0; i<$rootScope.gData.stateList.length; i++){
						  if($rootScope.gData.stateList[i].id == record.currentLocation.state.id){
							  isVaildState=true;
							  $scope.profileFormData.currentLocation.state=$rootScope.gData.stateList[i];
						  }
					  }

					  
				  }
				  //$log.debug('date is: '+new Date(record.interviewAvailability.date));
				  $scope.profileFormData.interviewAvailability.date=new Date(record.interviewAvailability.date);
				  $scope.profileFormData.interviewAvailability.time=new Date(record.interviewAvailability.time);
				  $scope.profileFormData.currentLocation.city=record.currentLocation.city;
				  $scope.profileFormData.profile=record.profile;
			};
		
		 var profilePaginate1=function(){
			  
			$log.debug('profileController:profilePaginate1 called'); 
			$scope.profilePaginationData = { maxSize: 5, currentPage: 1, numPerPage: 10, total: $scope.profileRecords.length};
		    $scope.$watch('profilePaginationData.currentPage', function() {
		    	$log.debug('profileController:currentPage  watch called :');
		        var begin = (($scope.profilePaginationData.currentPage - 1) * $scope.profilePaginationData.numPerPage)
		        , end = begin + $scope.profilePaginationData.numPerPage;
		    $scope.profilePagedItems = $scope.profileRecords.slice(begin, end);
		    });
		};
	    
		$scope.$watch('profileSeachForm.searchQuery', function (newVal, oldVal) {

			$filter('paginationSearch')($scope.profileSeachForm.currentSearchField,newVal,$scope.profileRecords);
			
			
		}, true);

		
	    $scope.openAddProfileForm = function (size) {
            
	    	$log.debug('profileController:openAddProfileForm called'); 
	    	$scope.profileFormData.isFormOpen=true;
	    	$scope.profileFormData.formTitle="Add Profile";
	    	$scope.profileFormData.validMsg="";
	    	$scope.profileFormData.scheduleList=[];
	        var modalInstance = $modal.open({
	          templateUrl: 'templates/profile/profileModalWindow.html',
	          controller: 'ModalProfileController',
	          size: size,
	          resolve: {
	             profileFormData: function () {
	              return $scope.profileFormData;
	            }
	          }
	        });

	        modalInstance.result.then(function (result) {
	        	resetProfileForm();
	        	$scope.loadProfiles($scope.currentSortField);
		    	$scope.profileFormData.validMsg=result.msg;
	        }, function () {
	        	resetProfileForm();	
	            $log.info('Modal dismissed at: ' + new Date());
	        });
	    };
	    
        $scope.openEditProfileForm = function (size,record) {
            
	    	$log.debug('profileController:openEditProfileForm called'); 
	    	$scope.editProfile(record);
	        var modalInstance = $modal.open({
	          templateUrl: 'templates/profile/profileModalWindow.html',
	          controller: 'ModalProfileController',
	          size: size,
	          resolve: {
	             profileFormData: function () {
	              return $scope.profileFormData;
	            }
	          }
	        });

	        modalInstance.result.then(function (result) {
	        	resetProfileForm();
	        	$scope.loadProfiles($scope.currentSortField);
		    	$scope.profileFormData.validMsg=result.msg;
		    	$scope.editInterviewRecord(result.data.scheduleList,result.data.candidateName);


	        }, function () {
	            resetProfileForm();
	            $log.info('Modal dismissed at: ' + new Date());
	        });
	    };
	    
		$scope.openAddInterviewForm = function (size,record) {
	        
	    	$log.debug('profileController:openAddInterviewForm called'); 
	    	var sheduleFormData={formTitle:'Add Interview',validMsg:'',interviewee:record.candidateName
	    			,date:new Date(record.interviewAvailability.date),time:new Date(record.interviewAvailability.time)
	    	        ,selectedStatus:$rootScope.gData.interviewStatusList[0]
	    	        ,interviewer:$rootScope.gData.interviewerList[0]
	    	        ,profile:{id:1,resumeLink:'',showDownloadLink:false,pRecordId:record._id}
	    	};
	        var modalInstance = $modal.open({
	          templateUrl: 'templates/interview/interviewModalWindow.html',
	          controller: 'ModalInterviewController',
	          size: size,
	          resolve: {
	        	  sheduleFormData: function () {
	              return sheduleFormData;
	            }
	          }
	        });

	        modalInstance.result.then(function (result) {
	        	
	        	$scope.profileFormData.validMsg=result.msg;
	        	$scope.updateProfileScheduleRecord(result.data,false);
                
	        }, function () {
	          $log.info('profileController  modal dismissed at: ' + new Date());
	        });
	    };
	    
	    $scope.openEditInterviewForm = function(size,record){
	        
	    	$log.debug('profileController:openEditInterviewForm called:   '+record.status.name); 
	    	var sheduleFormData={
	    			 id:record._id
	    			,formTitle:'Edit Interview'
	    			,validMsg:''
	    			,isFormOpen:true
	    			,interviewer:record.interviewer
	    			,interviewee:record.interviewee
	    			,comments:record.comments
	    			,selectedStatus:record.status
	    			,date:new Date(record.date)
	    	        ,time:new Date(record.time)
	    	        ,feedback:record.feedback
	    	        ,profile:record.profile
	    	        
	    	};
	  	    for (var i=0; i<$rootScope.gData.interviewStatusList.length; i++){
		 	  if($rootScope.gData.interviewStatusList[i].id == record.status.id){
				  sheduleFormData.selectedStatus=$rootScope.gData.interviewStatusList[i];
			  }
		   }
	  	   for (var i=0; i<$rootScope.gData.interviewerList.length; i++){
			  if($rootScope.gData.interviewerList[i].eMail == record.interviewer.eMail){
				  sheduleFormData.interviewer=$rootScope.gData.interviewerList[i];
			  }
		   }

	        var modalInstance = $modal.open({
	          templateUrl: 'templates/interview/interviewModalWindow.html',
	          controller: 'ModalInterviewController',
	          size: size,
	          resolve: {
	        	  sheduleFormData: function () {
	              return sheduleFormData;
	            }
	          }
	        });

	        modalInstance.result.then(function (result){
	            $scope.profileFormData.validMsg=result.msg;
	            $scope.updateProfileScheduleRecord(result.data,false);

	        }, function () {
	          $log.info('profileController:Modal dismissed at: ' + new Date());
	        });
	    };

	    
	    $scope.updateProfileScheduleRecord = function (interviewRecord,delFlag) {
	    	
	   	     $log.debug('profileController:updateProfileScheduleRecord called'+interviewRecord.profile.pRecordId);
			 ProfileService.updateProfileScheduleList(interviewRecord,delFlag)
			   .then(
					   function(data){
		                  $log.debug('profileController:updateProfileScheduleRecord:fetch:success: '+data);
		                  $scope.loadProfiles($scope.currentSortField);
					   },
		               function(err) {
						$log.error('profileController:updateProfileScheduleRecord:fetch:error: '+err);
						$scope.profileFormData.validMsg=err;
		       }); 
	   	
	   };

		$scope.editInterviewRecord=function(scheduleRecordList,newName){
			     $log.debug('profileController:editInterviewRecord called:'+newName);
				  for (var i=0; i<scheduleRecordList.length; i++){
					  
					  scheduleRecordList[i].interviewee=newName;
					  scheduleRecordList[i].id=scheduleRecordList[i]._id;
					  sheduleService.setSheduleRecord(scheduleRecordList[i]);
						  sheduleService.editRecord()
						   .then(
								   function(data){
					                  $log.debug('profileController:editInterviewRecord:success: '+data);
								   },
					               function(err) {
									$log.error('profileController:editInterviewRecord:error: '+err);
					               	$scope.profileFormData.validMsg="Error:";
					       });  
				 }
		  };
		  

	    function resetProfileForm(){
	    	$log.debug('profileController:resetProfileForm called'); 
	    	$scope.profileFormData=angular.copy(defaultProfileFormData);

	    }
	    $rootScope.$on('ProfileButtonClicked', function () {
	    	init1();
	    });
	    var init1 = function (){
	    	$scope.currentSortField=$rootScope.gData.activeProfileSortFileds[0];
	    	$scope.profileSeachForm.currentSearchField=$rootScope.gData.activeProfileSearchFileds[0];
			$scope.loadProfiles($scope.currentSortField);

	   };
	   init1();
	  
	
	
}]);



