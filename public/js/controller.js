var contrModule = angular.module('controller', ['ngRoute','ui.bootstrap','service']);

contrModule.config(function($logProvider){
	  $logProvider.debugEnabled(true);
	});

contrModule.controller('AddController',function($scope,$route,$http,sheduleService,fileMgmtService,ProfileService,PaginationService,$modal,$log,$filter) {
	
    $scope.sheduleRecords=[];
	$scope.feedback=[];
	var statusList=[{id:0,name:'Planned'},{ id:1,name:'Inprogress' },{ id:2,name:'Completed' },{ id:3,name:'Canceled' }];
	$scope.sheduleFormData={id:null,interviewer:"",interviewee:"",date:"",time:"",statusList:statusList,comments:"",selectedStatus:statusList[0]
	                       ,validMsg:"",sheduleRecords:[],feedback:[],animationsEnabled:true,myFile:"",fileSizeFromat:"",profile:{}
	                       ,isFormOpen:false,formTitle:'Add Shedule'};
	$scope.profileRecords=[];
	var visaStatusList=[{id:0,name:'H1B'},{ id:1,name:'EAD' },{ id:2,name:'GC' },{ id:3,name:'L1B EAD' }];
	var workAvailList=[{id:0,name:'Immediately'},{ id:1,name:'1 week' },{ id:2,name:'2 weeks' },{ id:3,name:'3 weeks' }];
	var countryList=[
	                 {id:0,code:'USA',name:'United States'},
	                 { id:1,code:'Canada',name:'Canada' }
	                ];
	var stateList=[
	                { id:0 , code:"AL"  ,name:'Alabama'  ,countryId:0  },
	            	{ id:1 , code:"AK"  ,name:'Alaska'  ,countryId:0  },
	            	{ id:2 , code:"AZ"  ,name:'Arizona'  ,countryId:0  },
	            	{ id:3 , code:"AR"  ,name:'Arkansas'  ,countryId:0  },
	            	{ id:4 , code:"CA"  ,name:'California'  ,countryId:0  },
	            	{ id:5 , code:"CO"  ,name:'Colorado'  ,countryId:0  },
	            	{ id:6 , code:"CT"  ,name:'Connecticut'  ,countryId:0  },
	            	{ id:7 , code:"DE"  ,name:'Delaware'  ,countryId:0  },
	            	{ id:8 , code:"DC"  ,name:'District of Columbia'  ,countryId:0  },
	            	{ id:9 , code:"FL"  ,name:'Florida'  ,countryId:0  },
	            	{ id:10 , code:"GA"  ,name:'Georgia'  ,countryId:0  },
	            	{ id:11 , code:"HI"  ,name:'Hawaii'  ,countryId:0  },
	            	{ id:12 , code:"ID"  ,name:'Idaho'  ,countryId:0  },
	            	{ id:13 , code:"IL"  ,name:'Illinois'  ,countryId:0  },
	            	{ id:14 , code:"IN"  ,name:'Indiana'  ,countryId:0  },
	            	{ id:15 , code:"IA"  ,name:'Iowa'  ,countryId:0  },
	            	{ id:16 , code:"KS"  ,name:'Kansas'  ,countryId:0  },
	            	{ id:17 , code:"KY"  ,name:'Kentucky'  ,countryId:0  },
	            	{ id:18 , code:"LA"  ,name:'Louisiana'  ,countryId:0  },
	            	{ id:19 , code:"ME"  ,name:'Maine'  ,countryId:0  },
	            	{ id:20 , code:"MD"  ,name:'Maryland'  ,countryId:0  },
	            	{ id:21 , code:"MA"  ,name:'Massachusetts'  ,countryId:0  },
	            	{ id:22 , code:"MI"  ,name:'Michigan'  ,countryId:0  },
	            	{ id:23 , code:"MN"  ,name:'Minnesota'  ,countryId:0  },
	            	{ id:24 , code:"MS"  ,name:'Mississippi'  ,countryId:0  },
	            	{ id:25 , code:"MO"  ,name:'Missouri'  ,countryId:0  },
	            	{ id:26 , code:"MT"  ,name:'Montana'  ,countryId:0  },
	            	{ id:27 , code:"NE"  ,name:'Nebraska'  ,countryId:0  },
	            	{ id:28 , code:"NV"  ,name:'Nevada'  ,countryId:0  },
	            	{ id:29 , code:"NH"  ,name:'New Hampshire'  ,countryId:0  },
	            	{ id:30 , code:"NJ"  ,name:'New Jersey'  ,countryId:0  },
	            	{ id:31 , code:"NM"  ,name:'New Mexico'  ,countryId:0  },
	            	{ id:32 , code:"NY"  ,name:'New York'  ,countryId:0  },
	            	{ id:33 , code:"NC"  ,name:'North Carolina'  ,countryId:0  },
	            	{ id:34 , code:"ND"  ,name:'North Dakota'  ,countryId:0  },
	            	{ id:35 , code:"OH"  ,name:'Ohio'  ,countryId:0  },
	            	{ id:36 , code:"OK"  ,name:'Oklahoma'  ,countryId:0  },
	            	{ id:37 , code:"OR"  ,name:'Oregon'  ,countryId:0  },
	            	{ id:38 , code:"PA"  ,name:'Pennsylvania'  ,countryId:0  },
	            	{ id:39 , code:"RI"  ,name:'Rhode Island'  ,countryId:0  },
	            	{ id:40 , code:"SC"  ,name:'South Carolina'  ,countryId:0  },
	            	{ id:41 , code:"SD"  ,name:'South Dakota'  ,countryId:0  },
	            	{ id:42 , code:"TN"  ,name:'Tennessee'  ,countryId:0  },
	            	{ id:43 , code:"TX"  ,name:'Texas'  ,countryId:0  },
	            	{ id:44 , code:"UT"  ,name:'Utah'  ,countryId:0  },
	            	{ id:45 , code:"VT"  ,name:'Vermont'  ,countryId:0  },
	            	{ id:46 , code:"VA"  ,name:'Virginia'  ,countryId:0  },
	            	{ id:47 , code:"WA"  ,name:'Washington'  ,countryId:0  },
	            	{ id:48 , code:"WV"  ,name:'West Virginia'  ,countryId:0  },
	            	{ id:49 , code:"WI"  ,name:'Wisconsin'  ,countryId:0  },
	            	{ id:50 , code:"WY"  ,name:'Wyoming'  ,countryId:0  },
	               ];
	$scope.profileFormData={id:null,candidateName:"",contactNumber:"",eMail:"",skypeId:"",countryList:countryList
			,stateList:stateList,currentLocation:{city:"",state:{},country:countryList[0]},visaStatusList:visaStatusList
			,visaSelectedStatus:visaStatusList[0],workAvailSelectedStatus:workAvailList[0]
	        ,workAvailList:workAvailList,interviewAvailability:{date:"",time:""},interviewAvailTime:""
	        ,profile:{id:0,resumeLink:"",showDownloadLink:false},myFile:"",fileSizeFromat:"",validMsg:""
	        ,isFormOpen:false,formTitle:'Add Profile'};
	
	var defaultProfileFormData = angular.copy($scope.profileFormData);
	$scope.submitForm = function(){
    	
    	$log.debug('controller:AddController:submitForm called');
     	sheduleService.setInterviewer($scope.sheduleFormData.interviewer);
    	sheduleService.setInterviewee($scope.sheduleFormData.interviewee);
    	sheduleService.setDate($scope.sheduleFormData.date);
    	sheduleService.setTime($scope.sheduleFormData.time);
    	sheduleService.setStatus($scope.sheduleFormData.selectedStatus);
    	sheduleService.setComments($scope.sheduleFormData.comments);
     	$scope.sheduleFormData.profile={id:1,resumeLink:'',showDownloadLink:false};
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
  $scope.downloadFile = function(record){
	  
	  $log.debug('controller:AddController:downloadFile called');
	  
	  fileMgmtService.downloadFile(record);
  }
  $scope.setFile=function(element){
	  
	  //alert('files:'+element.files[0]);
	  $scope.sheduleFormData.myFile=element.files[0];
	  $scope.sheduleFormData.fileSizeFromat=unitize($scope.sheduleFormData.myFile.size);
	  
	  $scope.profileFormData.myFile=element.files[0];
	  $scope.profileFormData.fileSizeFromat=unitize($scope.profileFormData.myFile.size);
	 

  };
  
  function unitize(num) {
	   //alert('unitize');
	    return unitizer(num,0);
	}

	function unitizer(num, level) {
		
		var units = ["Bytes", "KB", "MB", "GB", "TB"];
		
		//alert('unitize'+level);
	    if (num < 1024 || level > units.length - 1) {        
	        return num + " " + units[level];
	    } else {
	        return unitizer(num / 1024, level + 1);        
	    }
	}
   $scope.edit=function(record){
	  
	  $scope.sheduleFormData.formTitle='Edit Shedule';
	  $scope.sheduleFormData.isFormOpen=true;
	  
	  $scope.sheduleFormData.id=record._id;
	  $scope.sheduleFormData.validMsg="";
	  $scope.sheduleFormData.interviewer=record.interviewer;
	  $scope.sheduleFormData.interviewee=record.interviewee;
	  $scope.sheduleFormData.comments=record.comments;
	  for (var i=0; i<$scope.sheduleFormData.statusList.length; i++){
		  if($scope.sheduleFormData.statusList[i].id == record.status.id){
			  
			  $scope.sheduleFormData.selectedStatus=$scope.sheduleFormData.statusList[i];
		  }
			  
	  }
	  $scope.sheduleFormData.date=new Date(record.date);
	  $scope.sheduleFormData.time=new Date(record.time);
	  $scope.sheduleFormData.feedback=record.feedback;
	  $scope.sheduleFormData.profile=record.profile;
	  $scope.$broadcast('editRecord', { data: record.feedback });
	 
	  
  };
  $scope.addRecord=function(){
	  sheduleService.add()
	   .then(
			   function(data){
                  $log.debug('controller:addRecord:success'+data);
                  $scope.sheduleRecords.push(data);
				   //$scope.sheduleRecords.unshift(data);
                  $scope.sheduleFormData.validMsg="Successfully Added :"+data._id;
			   },
               function(err) {
               	$log.error('controller:addRecord:error'+err);
               	$scope.sheduleFormData.validMsg="Error";
       });  
	  
  };
  
 $scope.editRecord=function(){
	 $log.debug('controller:AddController:editRecord called');
	  sheduleService.editRecord()
	   .then(
			   function(data){
                  $log.debug('controller:editRecord:success: '+data);
                  for(var i=0; i<$scope.sheduleRecords.length; i++){
                	  
                	  if($scope.sheduleRecords[i]._id==data._id){
                		  //$scope.sheduleRecords.splice(i,1);
                		  //alert('here'+data.profile.showDownloadLink);
                		  $scope.sheduleRecords[i]=data;
                	  }
                	  
                  }
                  //$scope.sheduleRecords.push(data);
                  for(var i=0; i<$scope.pagedItems.length; i++){
                	  
                	  if($scope.pagedItems[i]._id==data._id){
                		  //$scope.sheduleRecords.splice(i,1);
                		  $scope.pagedItems[i]=data;
                	  }
                	  
                  }
                  $scope.sheduleFormData.validMsg="Successfully Edited :"+data._id;
			   },
               function(err) {
				$log.error('controller:AddController:editRecord:error: '+err);
               	$scope.sheduleFormData.validMsg="Error:";
       });  
	  
  };
  $scope.deleteRecord=function(record){
	  $log.debug('controller:AddController:deleteRecord'+record._id);
		 sheduleService.setId(record._id);
		  sheduleService.deleteRecord()
		   .then(
				   function(data){
					   $log.debug('controller:deleteRecord:sucess:'+data);
	                  
	                  for(var i=0; i<$scope.sheduleRecords.length; i++){
	                	  
	                	  if($scope.sheduleRecords[i]._id==data._id){
	                		  $scope.sheduleRecords.splice(i,1);
	                	  }
	                	  
	                  }
                      for(var i=0; i<$scope.pagedItems.length; i++){
	                	  
	                	  if($scope.pagedItems[i]._id==data._id){
	                		  $scope.pagedItems.splice(i,1);
	                	  }
	                	  
	                  }
	                  $scope.sheduleFormData.validMsg="Successfully Deleted :"+data._id;
				   },
	               function(err) {
					   $log.error('controller:AddController:deleteRecord:error:'+err);
	               	$scope.sheduleFormData.validMsg="Error:";
	       });  
		  
   };
  $scope.load=function(){
	    $log.debug('controller:AddController:load called');
		sheduleService.list()
		   .then(
				   function(sheduleRecords){
					   $log.debug('controller:AddController:load:sucess:');
	                   $scope.sheduleRecords = sheduleRecords;
	                   paginate1();
	                   
	                },
	                
	                function(err) {
	                	$log.error('controller:AddController:load:error:'+err);
	                	
	        });         	
		   
	};
	
	$scope.open = function (size,record) {
        $scope.feedback=record.feedback;
	    var modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'templates/feedbackModalWindow.html',
	      controller: 'ModalInstanceCtrl',
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
   /*******************profile methods begin*****************/
   
   $scope.submitProfileForm = function(){
	   $log.debug('controller:AddController:submitProfileForm called');
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
		//alert('uploading..'+$scope.sheduleFormData.myFile.name);
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
	              profile:{id:1,resumeLink:link,showDownloadLink:showLink}
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
	   $log.debug('controller:AddController:addProfileRecord called');  
	   ProfileService.add()
		   .then(
				   function(data){
					   $log.debug('controller:AddController:addProfileRecord:sucess'+data); 
	                  $scope.profileRecords.push(data);
	                  profilePaginate1();
	                  resetProfileForm();
	                  $scope.profileFormData.validMsg="Successfully Added :"+data._id;
				   },
	               function(err) {
					 $log.error('controller:AddController:addProfileRecord:error'+err); 
	               	 $scope.profileFormData.validMsg="Error";
	       });  
		  
	};
	$scope.loadProfiles=function(){
		$log.debug('controller:AddController:loadProfiles called');  
		ProfileService.profileList()
			   .then(
					   function(profileRecords){
						   $log.debug('controller:AddController:loadProfiles:success'); 
		                   $scope.profileRecords = profileRecords;
		                  profilePaginate1();
		                   
		                },
		                
		                function(err) {
		                	$log.error('controller:AddController:loadProfiles:error'+err); 
		                	
		        });         	
			   
	};
	$scope.delProfileRecord=function(record){
		  $log.debug('controller:AddController:delProfileRecord: '+record._id);
		  ProfileService.setProfileRecord(record);
		  ProfileService.delProfileRecord()
			   .then(
					   function(data){
						   $log.debug('controller:AddController:delProfileRecord:sucess:'+data);
		                  
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
						   $log.error('controller:AddController:delProfileRecord:error:'+err);
		               	$scope.profileFormData.validMsg="Error:";
		       });  
			  
	   };
	   $scope.editProfile=function(record){
			  
		      $log.debug('controller:AddController:editProfile-record id is:'+record._id);
		      
		      $scope.profileFormData.formTitle='Edit Profile';
			  $scope.profileFormData.isFormOpen=true;
		      
		      $scope.profileFormData.id=record._id;
			  $scope.profileFormData.candidateName=record.candidateName;
			  $scope.profileFormData.validMsg="";
			  $scope.profileFormData.contactNumber=record.contactNumber;
			  $scope.profileFormData.eMail=record.eMail;
			  $scope.profileFormData.skypeId=record.skypeId;
			  $log.debug('visa selected status: '+record.visaSelectedStatus.name);
			  for (var i=0; i<$scope.profileFormData.visaStatusList.length; i++){
				  if($scope.profileFormData.visaStatusList[i].id == record.visaSelectedStatus.id){
					  
					  $scope.profileFormData.visaSelectedStatus=$scope.profileFormData.visaStatusList[i];
				  }
					  
			  }
			  for (var i=0; i<$scope.profileFormData.workAvailList.length; i++){
				  if($scope.profileFormData.workAvailList[i].id == record.workAvailSelectedStatus.id){
					  
					  $scope.profileFormData.workAvailSelectedStatus=$scope.profileFormData.workAvailList[i];
				  }
					  
			  }
			  for (var i=0; i<$scope.profileFormData.countryList.length; i++){
				  if($scope.profileFormData.countryList[i].id == record.currentLocation.country.id){
					  
					  $scope.profileFormData.currentLocation.country=$scope.profileFormData.countryList[i];
				  }
					  
			  }
			  for (var i=0; i<$scope.profileFormData.stateList.length; i++){
				  if($scope.profileFormData.stateList[i].id == record.currentLocation.state.id){
					  
					  $scope.profileFormData.currentLocation.state=$scope.profileFormData.stateList[i];
				  }
					  
			  }
			  //$log.debug('date is: '+new Date(record.interviewAvailability.date));
			  $scope.profileFormData.interviewAvailability.date=new Date(record.interviewAvailability.date);
			  $scope.profileFormData.interviewAvailability.time=new Date(record.interviewAvailability.time);
			  $scope.profileFormData.currentLocation.city=record.currentLocation.city;
			  $scope.profileFormData.profile=record.profile;
		};
		$scope.editProfileRecord=function(){
			 $log.debug('controller:AddController:editProfileRecord called');
			 ProfileService.editProfileRecord()
			   .then(
					   function(data){
		                  $log.debug('controller:editProfileRecord:success: '+data);
		                  for(var i=0; i<$scope.profileRecords.length; i++){
		                	  
		                	  if($scope.profileRecords[i]._id==data._id){
		                		  //$scope.sheduleRecords.splice(i,1);
		                		  //alert('here'+data.profile.showDownloadLink);
		                		  $scope.profileRecords[i]=data;
		                	  }
		                	  
		                  }
		                  //$scope.sheduleRecords.push(data);
		                  for(var i=0; i<$scope.profilePagedItems.length; i++){
		                	  
		                	  if($scope.profilePagedItems[i]._id==data._id){
		                		  //$scope.sheduleRecords.splice(i,1);
		                		  $scope.profilePagedItems[i]=data;
		                	  }
		                	  
		                  }
		                  $scope.profileFormData.validMsg="Successfully Edited :"+data._id;
					   },
		               function(err) {
						$log.error('controller:AddController:editProfileRecord:error: '+err);
		               	$scope.profileFormData.validMsg="Error:";
		       });  
			  
		  };
	
    var resetProfileForm=function(){
    	
    	$log.debug('controller:AddController:resetProfileForm called');
       // $scope.profileForm.$setPristine();
       $scope.profileFormData=angular.copy(defaultProfileFormData);

    };
	var profilePaginate1=function(){
		$log.debug('controller:AddController:profilePaginate1 called'); 
		$scope.profilePaginationData = { maxSize: 5, currentPage: 1, numPerPage: 10, total: $scope.profileRecords.length};
	    $scope.$watch('profilePaginationData.currentPage', function() {
	    	//alert('watch'+$scope.profilePaginationData.currentPage);
	        var begin = (($scope.profilePaginationData.currentPage - 1) * $scope.profilePaginationData.numPerPage)
	        , end = begin + $scope.profilePaginationData.numPerPage;
	        //alert($scope.profileRecords.length);
	    $scope.profilePagedItems = $scope.profileRecords.slice(begin, end);
	    });
	};
   $scope.updateCountry = function(){
       availableStates = [];
       //alert($scope.profileFormData.currentLocation.country.id);
       angular.forEach(stateList, function(value){
         if(value.countryId == $scope.profileFormData.currentLocation.country.id){
           availableStates.push(value);
         }
       });
       
       $scope.profileFormData.stateList=availableStates;
     }
   
   
   /*****************profile methods ends**********************/
	
   /************ sheduled interviews pagination begins ******************/

   var paginate1=function(){
	   $log.debug('controller:AddController:paginate1 called'); 
	$scope.data = { maxSize: 5, currentPage: 1, numPerPage: 10, total: $scope.sheduleRecords.length};
    $scope.$watch('data.currentPage', function() {
    	//alert('watch'+$scope.data.currentPage);
        var begin = (($scope.data.currentPage - 1) * $scope.data.numPerPage)
        , end = begin + $scope.data.numPerPage;
        //alert($scope.sheduleRecords.length);
    $scope.pagedItems = $scope.sheduleRecords.slice(begin, end);
    });
  };

  /************ sheduled interviews pagination ends *******************/
  
  /************** sehdule interview  from profile tab begin ************************/
  
  $scope.sheduleInterview = function(profile){
	  
	  $log.debug('controller:sheduleInterview called'); 
	  $scope.sheduleFormData.isFormOpen=true;
	  $scope.sheduleFormData.validMsg="";
	  $scope.sheduleFormData.interviewee=profile.candidateName;
	  $scope.sheduleFormData.date=new Date(profile.interviewAvailability.date);
	  $scope.sheduleFormData.time=new Date(profile.interviewAvailability.time);
	  
	  
	  
  } 
  
  /************** sehdule interview  from profile tab end ************************/
   
   var init = function (){
		$scope.load();
		$scope.loadProfiles();

   };
   init();
   
   
    
});

contrModule.controller('ViewController',function($scope,$http,sheduleService,$modal,$log) {
	$scope.feedback="";//[{id:0,skill:'Core Java',rating:'7'},{id:1,skill:'Frameworks',rating:'3'}];
	$scope.animationsEnabled = true; 
	$scope.sheduleRecords=[];
	$scope.open = function (size,record) {
        $scope.feedback=record.feedback;
	    var modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'templates/feedbackModalWindow.html',
	      controller: 'ModalInstanceCtrl',
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
	
	$scope.load=function(){
		//alert('load');
		sheduleService.list()
		   .then(
				   function(sheduleRecords){
					   //alert('here:'+sheduleRecords);
	                   $scope.sheduleRecords = sheduleRecords;
	                },
	                
	                function(result) {
	                	console.log("error");
	        });         	
		   
	};
	
$scope.load();
	
	
     
});

contrModule.controller('ModalInstanceCtrl', function ($scope, $modalInstance, feedback) {

	  $scope.feedback = feedback;
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});




contrModule.controller('SkillCtrl',function($scope,sheduleService,$log) {
  
  // var skills = ['Core Java', 'Frontend Techlogies', 'Web Technologies','Frameworks'];
  $scope.skills=[{id:0,name:'Core Java'},
                 { id:1,name:'Frontend Techlogies' },
                 { id:2,name:'Web Technologies' },
                 { id:3,name:'Frameworks' },
                 { id:4,name:'Messaging' },
                 { id:5,name:'Web Services' },
                 { id:6,name:'Communication skills' }, 
                 { id:7,name:'Hibernate/JPA' }, 
                 { id:8,name:'PrimeFaces/JSF' },
                 { id:9,name:'Spring MVC Framework' },
                 { id:10,name:'Angular JS' },
                 { id:11,name:'JQuery' },
                 { id:12,name:'Boot Strap' },
                 { id:13,name:'HTML5' },
                 { id:14,name:'CSS 3' },
                 
                 ];
  $scope.selectedSkill=$scope.skills[0];
  $scope.ratingValue=1;
  $scope.rating = 5;
  $scope.rows = [];
  $scope.selectedSkills=[];
  var counter = 0;
  
 
  $scope.rateFunction = function(rating,index) {
	 $log.debug('controller:SkillCtrl:rateFunction called'); 
    sheduleService.putRatingSelected(index,rating);
  };
  $scope.addRow = function() {
	  $log.debug('controller:SkillCtrl:addRow called'); 
	  //alert($scope.selectedSkill);
	  $scope.rows.push({name:'Row ' + counter++});
  };
  $scope.removeRow = function(index) {
	  $log.debug('controller:SkillCtrl:removeRow called'); 
	  sheduleService.removeSkillSlected(index);
	  sheduleService.removeRatingSelected(index);
	  $scope.rows.splice(index,1);
  };
  $scope.updateSkillSlected = function(selectedSkill,index) {
	  
	  $log.debug('controller:SkillCtrl:updateSkillSlected called'); 
	  //alert(sheduleService);
	  sheduleService.putSkillSelected(index,selectedSkill.name);
  }
  
  $scope.$on('editRecord', function (event, args) {
	  $scope.rows = [];

	  for (var i=0; i<args.data.length; i++){
		  $scope.rows.push({name:'Row '+i});
		  
	  }
 });
 

});

contrModule.directive('skillDisplay', function($compile) {
	
			  return {
				  
				  
				  scope: {
				      //rowDisplay: "=", //import referenced model to our directives scope
				      rowSkills: "=",
				      onSkillSelected : '&',
				      selectedSkill: "="
				    	  
				  },
				  //scope:false,
				  //restrict: 'A',
				  templateUrl: 'templates/skillRatingsRow.html',
				  controller: function($scope, $element){
				      //alert('in controller');
				   },
				  link: function(scope, elem, attr,ngModel) {
					  
       			     scope.toggle = function() {
						//alert("toggle :"); 
					 };
					 
					 scope.$watch('selectedSkill',
								function(oldVal, newVal) {
								 //alert('watch:'+newVal.name);
								 //scope.selectedSkill=newVal;
								 scope.onSkillSelected({
										selectedSkill : scope.selectedSkill
									});
				     });
					 scope.$watch(attr.ngModel,function(){
 					 });
				  
				  },
				  
			  };
});


contrModule.directive('starRating',
	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					//alert('toggle:-starRating');
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if(newVal) {
							updateStars();
						}
					}
				);
			}
			
		};
	}
);





contrModule.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            //alert(model.assign);
            
            element.bind('change', function(){
                scope.$apply(function(){
                    //modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);



contrModule.directive('modalDialog', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      show: '=' ,
	    },
	    replace: true, // Replace with the template below
	    transclude: true, // we want to insert custom content inside the directive
	    templateUrl: 'templates/modalWindow.html',
	    link: function(scope, element, attrs) {
	        scope.dialogStyle = {};
	        //alert(scope.modelRecord);
	        if(attrs.width)
	           scope.dialogStyle.width = attrs.width;
	        if(attrs.height)
	          scope.dialogStyle.height = attrs.height;
	        scope.hideModal = function() {
	           scope.show = false;
	       };
	    },
	  };
 

});
