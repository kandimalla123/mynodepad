 var contrModule = angular.module('myNotePad');
contrModule.controller('ModalProfileController', function ($rootScope,$scope, $modalInstance,profileFormData,ProfileService,fileMgmtService,LocationService,$log) {
	  
	
	  $log.debug('ModalProfileController called'); 
	
	  $scope.lData={countryList:[],stateList:[],visaStatusList:[],workAvailStatusList:[]};
	  $scope.selectedCountryStates = [];
	  $scope.profileFormData=profileFormData;
	  $scope.cancel = function () {
		  $log.debug('ModalProfileController:cancel called');
		  $modalInstance.dismiss('cancel');
	  };
	  $scope.ok = function (result) {
		  
		  $log.debug('ModalProfileController:ok called here'+profileFormData.eMail);
		  $modalInstance.close(result);
	 };
	 $scope.submitProfileForm = function(){
		   $log.debug('ModalProfileController:submitProfileForm called:'+$scope.profileFormData.candidateName);
	   	   var link='/downloadFile?fileId=';
		  var showLink=false;
		  //alert('link'+$scope.sheduleFormData.profile.showLink);
		  if($scope.profileFormData.myFile==""){
			 if($scope.profileFormData.profile.showDownloadLink){
				//alert('here');
				link=$scope.profileFormData.profile.resumeLink;
				showLink=true;
			 }
			 else{
				link=link+'empty';
				showLink=false;
			 }
	 	  }
		  else{
			 link=link+$scope.profileFormData.myFile.name;
			 showLink=true;
			 $log.debug('ModalProfileController:upload file name:'+link);
			 fileMgmtService.uploadFileToUrl($scope.profileFormData.myFile);
		  }
		
		  var prfoileRecord={id:$scope.profileFormData.id,
		              candidateName:$scope.profileFormData.candidateName,
		              contactNumber:$scope.profileFormData.contactNumber,
		              eMail:$scope.profileFormData.eMail,
		              skypeId:$scope.profileFormData.skypeId,
		              currentLocation:$scope.profileFormData.currentLocation,
		              visaSelectedStatus:$scope.profileFormData.visaSelectedStatus,
		              workAvailSelectedStatus:$scope.profileFormData.workAvailSelectedStatus,
		              interviewAvailability:$scope.profileFormData.interviewAvailability,
		              profile:{id:1,resumeLink:link,showDownloadLink:showLink},
		              scheduleList:$scope.profileFormData.scheduleList
	              };

			    ProfileService.setProfileRecord(prfoileRecord);
			    if(prfoileRecord.id==null){
			    	 $scope.addProfileRecord();
			   }
			    else{
			    	$scope.editProfileRecord();
			   }
	   };
	   $scope.addProfileRecord=function(){
		   $log.debug('ModalProfileController:addProfileRecord called');  
		   ProfileService.add()
			   .then(
					   function(data){
						  $log.debug('ModalProfileController:addProfileRecord:sucess'+data); 
		                  $scope.profileFormData.validMsg="Successfully Added :"+data._id;
		                  $scope.ok({data:data,msg:$scope.profileFormData.validMsg});
		                  
					   },
		               function(err) {
						 $log.error('ModalProfileController:addProfileRecord:error'+err); 
		               	 $scope.profileFormData.validMsg="Error";
		       });  
			  
	  };
	  
	  
	  $scope.editProfileRecord=function(){
			 $log.debug('ModalProfileController:editProfileRecord called');
			 ProfileService.editProfileRecord()
			   .then(
					   function(data){
		                  $log.debug('ModalProfileController:editProfileRecord:success: '+data);
		                  $scope.profileFormData.validMsg="Successfully Edited :"+data._id;
		                  $scope.ok({data:data,msg:$scope.profileFormData.validMsg});
					   },
		               function(err) {
						$log.error('ModalProfileController:editProfileRecord:error: '+err);
		               	$scope.profileFormData.validMsg="Error:";
		       });  
			  
	  };

	  $scope.setFile=function(element){
		  $log.debug('ModalProfileController:setFile called'); 
		  if(element.files[0]!=null){
	        $scope.profileFormData.myFile=element.files[0];
	        fileMgmtService.getFileSize($scope.profileFormData.myFile).then(
					   function(data){
						   $log.debug('ModalProfileController:setFile:sucess'+data);
						   $scope.profileFormData.fileSizeFromat=data;
					   },
					   function(err){
						   $log.debug('ModalProfileController:setFile:error'+err);    
		        });
		    $log.debug('ModalProfileController:setFile:file size : '+$scope.profileFormData.fileSizeFromat);
		  }
	  };

	  $scope.updateStates = function(){
		  $log.debug('ModalProfileController:updateStates called');
		  LocationService.getStateByCountry($scope.lData.stateList,profileFormData.currentLocation.country)
			.then(
				   function(stateRecords){
					   $log.debug('ModalProfileController:getStateByCountry:success');
					   $scope.selectedCountryStates=stateRecords;
			  },
			 
			 function(err) {
			 	$log.error('ModalProfileController:getStateByCountry:error'+err); 
			  	
			});  
	  }
     
	  
    var init=function(){
    	$log.debug('ModalProfileController:init called');
    	$scope.lData.countryList=$rootScope.gData.countryList;
    	profileFormData.currentLocation.country=$scope.lData.countryList[0];
    	$scope.lData.stateList=$rootScope.gData.stateList;	
    	$scope.updateStates();
    	$scope.lData.visaStatusList=$rootScope.gData.visaStatusList;
    	$scope.profileFormData.visaSelectedStatus=$scope.lData.visaStatusList[0];
    	$scope.lData.workAvailStatusList=$rootScope.gData.workAvailStatusList;
    	$scope.profileFormData.workAvailSelectedStatus=$rootScope.gData.workAvailStatusList[0];
    	
	   
    }
   init();
});
