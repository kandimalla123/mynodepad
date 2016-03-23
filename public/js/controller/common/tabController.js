 var contrModule = angular.module('myNotePad');
 contrModule.controller('tabController',['$scope','$rootScope','$log','$http','$modal',
                                             function($scope,$rootScope,$log,$http,$modal) {
	 
	 $scope.tabs = [
	                { title:'Interviews', content:'Dynamic content 1' },
	                { title:'Requirements', content:'Dynamic content 2'},
	                { title:'Profiles', content:'Dynamic content 3'},
	                
	              ];
	$scope.tabSelcted=function(tabName){
		
		  $log.debug('tabController:tabSelcted:  '+tabName);
		  if($scope.tabs[0].title==tabName){
			  $rootScope.$broadcast('InterviewButtonClicked');
		  }
          if($scope.tabs[2].title==tabName){
        	  $rootScope.$broadcast('ProfileButtonClicked');
		  }
          
	}
	
 	

	 
 }]);