var srvcModule = angular.module('service');

srvcModule.service('ProfileService', function($http,$q,$log) {
	
	
	var profileRecord={};
    this.setProfileRecord=function(newRecord){
    	
    	profileRecord=newRecord;
    }
	this.add = function(){
		$log.debug('profileService:add   called');
		var deferred = $q.defer();
		$http.post('/addProfile',profileRecord)
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
	
	 this.profileList=function(sortField){
	    	var sortString='?sortField='+sortField.name+'&sortReverse='+sortField.sortReverse;
	    	$log.debug('sevice:list called:'+sortString);
	    	var deferred = $q.defer();
	         	$http.get('/getProfileList'+sortString)
	              .success(function(data) {
	            	  $log.debug('sevice:profileList:sucess');
	        	       deferred.resolve(data);
	 
	             })
	            .error(function(err){
	                $log.error('sevice:profileList:error:'+err);
	           	    deferred.reject(err);
	            });
	    	return deferred.promise; 
	  }
	 this.delProfileRecord=function(){
	    	
    	 $log.debug('service:delProfileRecord called: '+profileRecord._id);
    	  var deferred = $q.defer();
           $http.post('/delProfile',profileRecord)
           .success(function(data) {
            	//this.clear();
                $log.debug('service:delProfileRecord:sucess');
            	deferred.resolve(data);
           	
           })
           .error(function(err) {
               $log.error('service:delProfileRecord:error:'+err);
               deferred.reject(err);
           	
           });
           //alert('returned :'+deferred.promise);
           return deferred.promise;
    	
    }
	 this.editProfileRecord=function(){
	    	
	        $log.debug('service:editProfileRecord called:'+profileRecord._id);
	 		var deferred = $q.defer();
	 		
	         $http.post('/editProfile',profileRecord)
	         .success(function(data) {
	          	//this.clear();
	             $log.debug('service:editProfileRecord:sucess');
	          	deferred.resolve(data);
	         	
	         })
	         .error(function(err) {
	             $log.error('service:editProfileRecord:error:'+err);
	             deferred.reject(err);
	         	
	         });
	         //alert('returned :'+deferred.promise);
	         return deferred.promise;
	 };
	 
	 this.getProfileById = function (profileId) {
	    	
	    	$log.debug('service:getProfileById called:'+profileId);
	 		var deferred = $q.defer();
	 		var id='?profileId='+profileId;
	         $http.post('/getProfileById'+id)
	         .success(function(data) {
	          	//this.clear();
	             $log.debug('service:getProfileById:sucess'+data);
	          	deferred.resolve(data);
	         	
	         })
	         .error(function(err) {
	             $log.error('service:getProfileById:error:'+err);
	             deferred.reject(err);
	         	
	         });
	         //alert('returned :'+deferred.promise);
	         return deferred.promise;
	    	
	  };
	  this.updateProfileScheduleList=function(interviewRecord,delFlag){
		    
		   
	    	$log.debug('service:updateProfileScheduleList called:'+interviewRecord.profile.pRecordId);
	 		var deferred = $q.defer();
	         $http.post('/updateProfileScheduleList',{iRecord:interviewRecord,delFlag:delFlag})
	         .success(function(data) {
	          	//this.clear();
	             $log.debug('service:updateProfileScheduleList:sucess'+data);
	          	deferred.resolve(data);
	         	
	         })
	         .error(function(err) {
	             $log.error('service:updateProfileScheduleList:error:'+err);
	             deferred.reject(err);
	         	
	         });
	         //alert('returned :'+deferred.promise);
	         return deferred.promise;
	  };
	
});	
