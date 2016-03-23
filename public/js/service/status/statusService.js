var srvcModule = angular.module('service');

srvcModule.service('StatusService', function($http,$q,$log) {
	
	var visaStatusRecord={};
    var workAvailStatusRecord={};
    var interviewStatusRecord={};
    this.setWorkAvailStatusRecord=function(newRecord){
    	workAvailStatusRecord=newRecord;
    }
    this.setVisaStatusRecord=function(newRecord){
    	visaStatusRecord=newRecord;
    }
    this.setInterviewStatusRecord=function(newRecord){
    	interviewStatusRecord=newRecord;
    }
    var visaStatusList=[];
    var workAvailStatusList=[];
    var interviewStatusList=[];
	this.addVisaStatus = function(){
	    $log.debug('StatusService:addVisaStatus   called');
	    var deferred = $q.defer();
	    $http.post('/addVisaStatus',visaStatusRecord)
          .success(function(data){
     	    //this.clear();
           $log.debug('StatusService:addVisaStatus:sucess');
     	   deferred.resolve(data);
       })
       .error(function(err) {
          $log.error('StatusService:error:'+err);
          deferred.reject(err);
      });
      //alert('returned :'+deferred.promise);
      return deferred.promise;
   };

   this.listVisaStatus=function(){
	  $log.debug('StatusService:listVisaStatus called');
	      var deferred = $q.defer();
     	  $http.get('/getVisaStatusList')
            .success(function(data) {
        	   $log.debug('StatusService:listVisaStatus:sucess');
        	   visaStatusList=data;
     	       deferred.resolve(data);

          })
            .error(function(err){
             $log.error('StatusService:listVisaStatus:error:'+err);
       	     deferred.reject(err);
         });
	    return deferred.promise; 
     }
	
    this.addWorkAvailStatus = function(){
	    $log.debug('StatusService:addWorkAvailStatus   called');
	    var deferred = $q.defer();
	    $http.post('/addWorkAvailStatus',workAvailStatusRecord)
        .success(function(data){
   	    //this.clear();
         $log.debug('StatusService:addWorkAvailStatus:sucess');
   	   deferred.resolve(data);
     })
     .error(function(err) {
        $log.error('StatusService:error:'+err);
        deferred.reject(err);
     });
    //alert('returned :'+deferred.promise);
     return deferred.promise;
  };
 
 this.getWorkAvailStatusList=function(){
	  $log.debug('StatusService:listWorkAvailStatus called');
	      var deferred = $q.defer();
    	  $http.get('/getWorkAvailStatusList')
           .success(function(data) {
       	   $log.debug('StatusService:listWorkAvailStatus:sucess');
       	   workAvailStatusList=data;
    	   deferred.resolve(data);

         })
           .error(function(err){
            $log.error('StatusService:listWorkAvailStatus:error:'+err);
      	     deferred.reject(err);
        });
	    return deferred.promise; 
    }
 
 
   this.addInterviewStatus = function(){
	    $log.debug('StatusService:addInterviewStatus   called');
	    var deferred = $q.defer();
	    $http.post('/addInterviewStatus',interviewStatusRecord)
     .success(function(data){
	    //this.clear();
      $log.debug('StatusService:addInterviewStatus:sucess');
	   deferred.resolve(data);
    })
    .error(function(err) {
     $log.error('StatusService:error:'+err);
     deferred.reject(err);
   });
   //alert('returned :'+deferred.promise);
    return deferred.promise;
   };

  this.getInterviewStatusList=function(){
	  $log.debug('StatusService:getInterviewStatusList called');
	      var deferred = $q.defer();
 	  $http.get('/getInterviewStatusList')
        .success(function(data) {
    	   $log.debug('StatusService:getInterviewStatusList:sucess');
    	   interviewStatusList=data;
 	   deferred.resolve(data);

       })
        .error(function(err){
         $log.error('StatusService:getInterviewStatusList:error:'+err);
   	     deferred.reject(err);
      });
	    return deferred.promise; 
   }
	
	
});	