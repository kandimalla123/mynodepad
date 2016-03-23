var contrModule = angular.module('myNotePad');

contrModule.controller('locationController',['$scope','$log','$http','LocationService','$modal',function($scope,$log,$http,LocationService,$modal) {

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
   $scope.countryRecords=[];
   $scope.stateRecords=[];
   $scope.addCountry=function(){
	   //$scope.addCountry1();
   };
   $scope.addState=function(){
	   
	  // for(var i=0; i<stateList.length; i++){
		   
		  // $scope.addState1(stateList[i]);
	   //}
   };
   $scope.addCountry1=function(){
	   $log.debug('locationController:addCountry called');
	   var countryRecord=countryList[1];
	   LocationService.setCountryRecord(countryRecord);
	   LocationService.addCountry()
		   .then(
				   function(countryRecord){
					   $log.debug('locationController:addCountry:success:'+countryRecord); 
	                   
	                },
	                
	                function(err) {
	                	$log.error('locationController:addCountry:error'+err); 
	                	
	    });         	
   }
   
	$scope.loadCountries=function(){
		$log.debug('locationController:loadCountries called');  
		LocationService.listCountry()
			   .then(
					   function(countryRecords){
						   $log.debug('locationController:loadCountries:success'); 
		                   $scope.countryRecords = countryRecords;
		                   
		                },
		                
		                function(err) {
		                	$log.error('locationController:loadCountries:error'+err); 
		                	
		        });         	
			   
	};
	
	$scope.addState1=function(state){
		   $log.debug('locationController:addState1 called');
		   var stateRecord=state;
		   LocationService.setStateRecord(stateRecord);
		   LocationService.addState()
			   .then(
					   function(countryRecord){
						   $log.debug('locationController:addState1:success:'+stateRecord); 
		                   
		                },
		                
		                function(err) {
		                	$log.error('locationController:addState1:error'+err); 
		                	
		    });         	
	 }
	$scope.loadStates=function(){
		$log.debug('locationController:loadStates called');  
		LocationService.listState()
			   .then(
					   function(stateRecords){
						   $log.debug('locationController:loadStates:success'); 
		                   $scope.stateRecords = stateRecords;
		                   
		                },
		                
		                function(err) {
		                	$log.error('locationController:loadStates:error'+err); 
		                	
		        });         	
			   
	};
	
	var init1 = function (){
		
		//$scope.loadCountries();
		//$scope.loadStates();

   };
   init1();
   
}]);