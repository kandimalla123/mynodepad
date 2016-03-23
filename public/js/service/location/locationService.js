var srvcModule = angular.module('service');

srvcModule.service('LocationService', function($http,$q,$log) {

    var countryRecord={};
    var stateRecord={};
    this.setCountryRecord=function(newRecord){
    	countryRecord=newRecord;
    }
    this.setStateRecord=function(newRecord){
    	stateRecord=newRecord;
    }
    var countryList=[];
    var stateList=[];
    this.addCountry = function(){
	    $log.debug('locationService:addCountry   called');
	    var deferred = $q.defer();
	    $http.post('/addCountry',countryRecord)
          .success(function(data){
     	    //this.clear();
           $log.debug('locationService:addCountry:sucess');
     	   deferred.resolve(data);
       })
       .error(function(err) {
          $log.error('locationService:error:'+err);
          deferred.reject(err);
      });
      //alert('returned :'+deferred.promise);
      return deferred.promise;
   };

   this.listCountry=function(){
	  $log.debug('locationService:listCountry called');
	      var deferred = $q.defer();
     	  $http.get('/getCountryList')
            .success(function(data) {
        	   $log.debug('locationService:listCountry:sucess');
        	   countryList=data;
     	       deferred.resolve(data);

          })
            .error(function(err){
             $log.error('locationService:listCountry:error:'+err);
       	     deferred.reject(err);
         });
	    return deferred.promise; 
     }
   
   this.addState = function(){
	    $log.debug('locationService:addState   called');
	    var deferred = $q.defer();
	    $http.post('/addState',stateRecord)
         .success(function(data){
    	    //this.clear();
          $log.debug('locationService:addState:sucess');
    	   deferred.resolve(data);
      })
      .error(function(err) {
         $log.error('locationService:error:'+err);
         deferred.reject(err);
     });
     //alert('returned :'+deferred.promise);
     return deferred.promise;
  };
  
  this.listState=function(){
	  $log.debug('locationService:listState called');
	      var deferred = $q.defer();
     	  $http.get('/getStateList')
            .success(function(data) {
        	   $log.debug('locationService:listState:sucess');
        	   countryList=data;
     	       deferred.resolve(data);

          })
            .error(function(err){
             $log.error('locationService:listState:error:'+err);
       	     deferred.reject(err);
         });
	    return deferred.promise; 
     }
    this.getStateByCountry=function(stateList,country){
	   $log.debug('locationService:getStateByCountry called:');
	      var deferred = $q.defer();
	      var selectedCountryStates=[];
	       angular.forEach(stateList, function(value){
	    	   $log.debug('locationService:listState:sected state: called'+value.countryId);
	           if(value.countryId == country.id){
	        	   selectedCountryStates.push(value);
	        	   
	           }
	         });
	       deferred.resolve(selectedCountryStates);
	      return deferred.promise; 
     }

});	