var srvcModule = angular.module('service');
srvcModule.service('fileMgmtService', function ($http,$q,$log) {
	
	$log.debug('service:fileMgmtService called');
	 this.uploadFileToUrl = function(file){
	        var fd = new FormData();
	        fd.append('uploadedFile', file);
	        $http.post('/fileUpload', fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(data){
	        	
	        	$log.debug('service:uploadFileToUrl:success');
	        })
	        .error(function(err){
	        	$log.error('service:uploadFileToUrl:error:'+err);
	        });
	  };
	  
	  this.downloadFileNew = function(sheduleRecord){
	    	$log.debug('service:downloadFileNew: '+sheduleRecord);
	        $http.get('/downloadFile',sheduleRecord)
	        .success(function(data){
	        	
	        	$log.debug('service:downloadFileNew:success');
	        })
	        .error(function(err){
	        	$log.error('service:downloadFileNew:error:'+err);
	        });
	  };
	  this.downloadFile = function(sheduleRecord){
		  $log.debug('service:downloadFile called');
		  $http({method: 'GET', url: '/downloadFile'}).
		  success(function(data, status, headers, config) {
			  $log.debug('service:downloadFile:success');
		     var element = angular.element('<a/>');
		     element.attr({
		        //href: 'data:attachment/msword;charset=utf-8,' + encodeURI(data),
		        href:'data:attachment/msword'+encodeURI(data),
		         target: '_blank',
		         download: sheduleRecord.profile.resumeLink
		     })[0].click();

		  }).
		  error(function(err, status, headers, config) {
			  $log.error('service:downloadFile:error:'+err);
		  });
	  }
	  this.getFileSize = function(file){
		  $log.debug('service:fileMgmtService:getFileSize called');
		  var deferred = $q.defer();
		  var size=unitize(file.size);
		  deferred.resolve(size);
		  $log.debug('service:fileMgmtService:getFileSize size:'+size);
		  return deferred.promise;
	  }
	
});