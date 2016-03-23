var contrModule = angular.module('myNotePad', ['ngRoute','ngAnimate','ui.bootstrap','service','filters']);

contrModule.config(function($logProvider){
	  $logProvider.debugEnabled(true);
});

contrModule.run(function($rootScope,LocationService,StatusService,InterviewerService,SkillService,$log){
	$rootScope.gData={countryList:[]
	                  ,stateList:[]
	                  ,visaStatusList:[]
	                  ,workAvailStatusList:[]
	                  ,interviewStatusList:[]
	                  ,activeProfileSortFileds:[]
	                  ,interviewerList:[]
	                  ,skillList:[]
	                  ,activeProfileSearchFileds:[]
	                 };
	LocationService.listCountry()
	.then(
		   function(countryRecords){
			   $log.debug('baseController:loadCountries:success');
			   $rootScope.gData.countryList=countryRecords;
	  },
	 
	 function(err) {
	 	$log.error('baseController:loadCountries:error'+err); 
	  	
	});   
	
	   LocationService.listState()
       .then(
		   function(stateRecords){
			   $log.debug('baseController:listState:success');
			   $rootScope.gData.stateList=stateRecords;
         },
         
         function(err) {
         	$log.error('baseController:listState:error'+err); 
         	
      });
	   
	   StatusService.listVisaStatus()
	   .then(
			   function(visaStatusRecords){
				   $log.debug('baseController:loadVisaStatus:success'); 
				   $rootScope.gData.visaStatusList = visaStatusRecords;
                   
                },
                
                function(err) {
                	$log.error('baseController:loadVisaStatus:error'+err); 
                	
        });   
	   
	   StatusService.getWorkAvailStatusList()
	   .then(
			   function(workAvailStatusRecords){
				   $log.debug('baseController:getWorkAvailStatusList:success'); 
				   $rootScope.gData.workAvailStatusList = workAvailStatusRecords;
                   
                },
                
                function(err) {
                	$log.error('baseController:getWorkAvailStatusList:error'+err); 
                	
        });  
	   
	   StatusService.getInterviewStatusList()
	   .then(
			   function(interviewStatusRecords){
				   $log.debug('baseController:getInterviewStatusList:success'); 
				   $rootScope.gData.interviewStatusList = interviewStatusRecords;
                   
                },
                
                function(err) {
                	$log.error('baseController:getInterviewStatusList:error'+err); 
                	
        });
	   
	   InterviewerService.list()
	   .then(
			   function(interviewerRecords){
				   $log.debug('baseController:loadInterviewers:success'+interviewerRecords[0].name); 
				   $rootScope.gData.interviewerList = interviewerRecords;
                   
                },
                
                function(err) {
                	$log.error('baseController:loadInterviewers:error'+err); 
                	
        }); 
		SkillService.skillList()
			.then(
					function(data){
						$log.debug('SkillCtrl:loadSkills:success'); 
						$rootScope.gData.skillList=data;
				    },
				                
				    function(err) {
				        $log.error('SkillCtrl:loadSkills:error'+err); 
				                	
		});         	
       var profileSortFileds=[{id:0,name:'_id',sortReverse:false,displayName:'MongoId',isActive:false}
                               ,{id:1,name:'id',sortReverse:false,displayName:'Id',isActive:false}
                               ,{id:2,name:'candidateName',sortReverse:false,displayName:'Name:A-Z',isActive:true}
                               ,{id:3,name:'candidateName',sortReverse:true,displayName:'Name:Z-A',isActive:true}
                               ,{id:4,name:'contactNumber',sortReverse:false,displayName:'Phone',isActive:false}
                               ,{id:5,name:'eMail',sortReverse:false,displayName:'Email',isActive:false}
                               ,{id:6,name:'skypeId',sortReverse:false,displayName:'Skype Id',isActive:false}
                               ,{id:7,name:'_v',sortReverse:false,displayName:'Version',isActive:false}
                               ,{id:8,name:'profile',sortReverse:false,displayName:'Profile',isActive:false}
                               ,{id:9,name:'interviewAvailability',sortReverse:false,displayName:'Interview:A-Z',isActive:true}
                               ,{id:10,name:'interviewAvailability',sortReverse:true,displayName:'Interview:Z-A',isActive:true}
                               ,{id:11,name:'workAvailSelectedStatus',sortReverse:false,displayName:'Availability Status',isActive:false}
                               ,{id:12,name:'visaSelectedStatus',sortReverse:false,displayName:'Visa Status',isActive:false}
                               ,{id:13,name:'currentLocation',sortReverse:false,displayName:'Current Location',isActive:false}
                                ];
	   
		  for (var i=0; i<profileSortFileds.length; i++){
			  if(profileSortFileds[i].isActive){
				  $rootScope.gData.activeProfileSortFileds.push(profileSortFileds[i]);
			  }
		  }
		  
	      var profileSearchFileds=[ {name:'All',displayName:'All',isActive:true}
	    	                       ,{name:'candidateName',displayName:'Name',isActive:true}
                                   ,{name:'id',displayName:'Id',isActive:false}
                                   ,{name:'contactNumber',displayName:'Phone',isActive:false}
                                   ,{name:'eMail',displayName:'Email',isActive:false}
                                   ,{name:'skypeId',displayName:'Skype Id',isActive:false}
                                   ,{name:'interviewAvailability',displayName:'Date',isActive:true}
                                 
            ];


		  for (var j=0; j<profileSearchFileds.length; j++){
			  if(profileSearchFileds[j].isActive){
				  $rootScope.gData.activeProfileSearchFileds.push(profileSearchFileds[j]);
			  }
		  }

       
	
	  
});








