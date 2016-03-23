var srvcModule = angular.module('service');

srvcModule.service('InterviewerService', function ($http,$q,$log) {
	
	var interviewerRecord={};
    this.setInterviewRecord=function(newRecord){
    	
    	interviewerRecord=newRecord;
    };
	this.add = function(){
		$log.debug('interviewerService:add   called');
		var deferred = $q.defer();
		$http.post('/addInterviewer',interviewerRecord)
	    .success(function(data){
	     	//this.clear();
	        $log.debug('interviewerService:add:sucess');
	     	deferred.resolve(data);
	    })
	    .error(function(err) {
	        $log.error('Error:interviewerService:error:'+err);
	        deferred.reject(err);
	    });
	    //alert('returned :'+deferred.promise);
	    return deferred.promise;

	};
	
    this.list=function(){
    	$log.debug('interviewerService:list called');
    	var deferred = $q.defer();
          	$http.get('/getInterviewersList')
              .success(function(data) {
            	  $log.debug('interviewerService:list:sucess');
         	       deferred.resolve(data);
 
             })
            .error(function(err){
             	$log.error('interviewerService:list:error:'+err);
           	    deferred.reject(err);
            });
    	return deferred.promise; 
    };
    
	 this.updateInterviewerById=function(){
	    	
	        $log.debug('interviewerService:updateInterviewerById called:'+interviewerRecord._id);
	 		var deferred = $q.defer();
	 		
	         $http.post('/updateInterviewerById',interviewerRecord)
	         .success(function(data) {
	          	//this.clear();
	             $log.debug('interviewerService:updateInterviewerById:sucess');
	          	deferred.resolve(data);
	         	
	         })
	         .error(function(err) {
	             $log.error('interviewerService:updateInterviewerById:error:'+err);
	             deferred.reject(err);
	         	
	         });
	         //alert('returned :'+deferred.promise);
	         return deferred.promise;
	 };
	 
	 this.getDisplayableInterviewers=function(){
	      $log.debug('interviewerService:getDisplayableInterviewers called:');
	 	  var deferred = $q.defer();
        	$http.get('/getInterviewersList')
            .success(function(records) {
     		   var dispalyableList=[];
    		   for (var i=0; i<records.length; i++){
    			  if(records[i].isDisplay){
    				  dispalyableList.push(records[i]);
    			   }
    		   }

       	       deferred.resolve(dispalyableList);

           })
          .error(function(err){
           	$log.error('interviewerService:getDisplayableInterviewers:error:'+err);
         	    deferred.reject(err);
          });

		  $log.debug('interviewerService:getDisplayableInterviewers success:');
		  return deferred.promise;
	 };



});	