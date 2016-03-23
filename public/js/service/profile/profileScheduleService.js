var srvcModule = angular.module('service');

srvcModule.service('profileScheduleService', function($http,$q,$log) {
	
	var profileSchduleRecord={};
    this.setProfileSchduleRecord=function(newRecord){
    	
    	profileSchduleRecord=newRecord;
    }
	this.add = function(){
		$log.debug('profileScheduleService:add   called');
		var deferred = $q.defer();
		$http.post('/addProfileSchedule',profileSchduleRecord)
	    .success(function(data){
	     	//this.clear();
	        $log.debug('profileService:add:sucess');
	     	deferred.resolve(data);
	    })
	    .error(function(err) {
	        $log.error('Error:profileService:error:'+err);
	        deferred.reject(err);
	    });
	    //alert('returned :'+deferred.promise);
	    return deferred.promise;

	};
	
    this.list=function(){
    	$log.debug('profileScheduleService:list called');
    	var deferred = $q.defer();
          	$http.get('/getProfileScheduleList')
              .success(function(data) {
            	  $log.debug('profileScheduleService:list:sucess');
         	       deferred.resolve(data);
 
             })
            .error(function(err){
             	$log.error('profileScheduleService:list:error:'+err);
           	    deferred.reject(err);
            });
    	return deferred.promise; 
    };


	
});	