var srvcModule = angular.module('service');
srvcModule.service('SkillService', function($http,$q,$log) {
	
	var skillRecord={};
    this.setSkillRecord=function(newRecord){
    	
    	skillRecord=newRecord;
    };
    
	this.add = function(){
		$log.debug('SkillService:add   called');
		var deferred = $q.defer();
		$http.post('/addSkill',skillRecord)
	    .success(function(data){
	        $log.debug('SkillService:add:sucess');
	     	deferred.resolve(data);
	    })
	    .error(function(err) {
	        $log.error('Error:SkillService:error:'+err);
	        deferred.reject(err);
	    });
	    return deferred.promise;

	};
	this.skillList=function(sortField){
	    	$log.debug('SkillService:skillList called:');
	    	var deferred = $q.defer();
	         	$http.get('/getSkillList')
	              .success(function(data) {
	            	  $log.debug('SkillService:skillList:sucess');
	        	       deferred.resolve(data);
	 
	             })
	            .error(function(err){
	                $log.error('SkillService:skillList:error:'+err);
	           	    deferred.reject(err);
	            });
	    	return deferred.promise; 
	 };
	 this.updateSkillById=function(){
	    	
	        $log.debug('SkillService:updateSkillById called:'+skillRecord._id);
	 		var deferred = $q.defer();
	 		
	         $http.post('/updateSkillById',skillRecord)
	         .success(function(data) {
	          	//this.clear();
	             $log.debug('SkillService:updateSkillById:sucess');
	          	deferred.resolve(data);
	         	
	         })
	         .error(function(err) {
	             $log.error('SkillService:updateSkillById:error:'+err);
	             deferred.reject(err);
	         	
	         });
	         //alert('returned :'+deferred.promise);
	         return deferred.promise;
	 };
	 this.getDisplayableSkills=function(){
	      $log.debug('SkillService:getDisplayableSkills called:');
	 	  var deferred = $q.defer();
	 	  
       	 $http.get('/getSkillList')
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
          $log.error('SkillService:getDisplayableSkills:error:'+err);
     	    deferred.reject(err);
       });
	   $log.debug('SkillService:getDisplayableSkills success:');

		  return deferred.promise;
	 };

	
});	