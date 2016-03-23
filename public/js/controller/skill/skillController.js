var contrModule = angular.module('myNotePad');
contrModule.controller('SkillCtrl',function($scope,$rootScope,sheduleService,SkillService,$modal,$log) {
	  
	  $scope.skills_new=[{name:'Core Java',code:'',isDisplay:true},
	                     { name:'Frontend Techlogies',code:'',isDisplay:true },
	                     { name:'Web Technologies',code:'',isDisplay:true },
	                     { name:'Frameworks',code:'',isDisplay:true },
	                     { name:'Messaging',code:'',isDisplay:true },
	                     { name:'Web Services',code:'',isDisplay:true },
	                     { name:'Communication skills',code:'',isDisplay:true }, 
	                     { name:'Hibernate/JPA',code:'',isDisplay:true }, 
	                     { name:'PrimeFaces/JSF',code:'',isDisplay:true },
	                     { name:'Spring MVC Framework',code:'',isDisplay:true },
	                     { name:'Angular JS',code:'',isDisplay:true },
	                     { name:'JQuery',code:'',isDisplay:true },
	                     { name:'Boot Strap',code:'',isDisplay:true },
	                     { name:'HTML5',code:'',isDisplay:true },
	                     { name:'Apache/Tomcat',code:'',isDisplay:true },
	                     { name:'Unix/Shell',code:'',isDisplay:true },
	                     { name:'CSS 3',code:'',isDisplay:true },
	                 
	                 ];
	  $scope.skillsAll=[];
	  $scope.skills=[];
	  $scope.selectedSkill='';
	  $scope.ratingValue=1;
	  $scope.rating = 5;
	  $scope.rows = [];
	  $scope.selectedSkills=[];
	  var counter = 0;
	  
	 
	  $scope.rateFunction = function(rating,index) {
		 $log.debug('SkillCtrl:rateFunction called'); 
	    sheduleService.putRatingSelected(index,rating);
	  };
	  $scope.addRow = function() {
		  $log.debug('SkillCtrl:addRow called'); 
		  //alert($scope.selectedSkill);
		  $scope.rows.push({name:'Row ' + counter++});
	  };
	  $scope.removeRow = function(index) {
		  $log.debug('controller:SkillCtrl:removeRow called'); 
		  sheduleService.removeSkillSlected(index);
		  sheduleService.removeRatingSelected(index);
		  $scope.rows.splice(index,1);
	  };
	  $scope.updateSkillSlected = function(selectedSkill,index) {
		  
		  $log.debug('SkillCtrl:updateSkillSlected called'); 
		  //alert(sheduleService);
		  sheduleService.putSkillSelected(index,selectedSkill.name);
	  };
	  
	  $scope.$on('editRecord', function (event, args) {
		  $scope.rows = [];

		  for (var i=0; i<args.data.length; i++){
			  $scope.rows.push({name:'Row '+i});
			  
		  }
	 });
	 
	  $scope.addSkillOne = function() {
		   for(var i=0; i<$scope.skills_new.length; i++){
			  //$scope.addSkill($scope.skills_new[i]);
		   }
	  };
	  $scope.addSkill = function(record) {
		  $log.debug('SkillCtrl:addSkill called');
		  var skillRecord=record;
		  SkillService.setSkillRecord(skillRecord);
		  SkillService.add()
				 .then(
						function(data){
							 $log.debug('SkillCtrl:addSkill:success:'+data); 
				                   
				        },
				        function(err) {
				            $log.error('SkillCtrl:addSkill:error'+err); 
				                	
				});         	
	  };
	  $scope.loadSkills=function(){
			$log.debug('SkillCtrl:loadSkills called');  
			SkillService.skillList()
				   .then(
						   function(data){
							   $log.debug('SkillCtrl:loadSkills:success'); 
							   $scope.skillsAll=data;
							   $scope.getDisplayableSkills();
			                },
			                
			                function(err) {
			                	$log.error('SkillCtrl:loadSkills:error'+err); 
			                	
			        });         	
				   
	 };
	 $scope.openSkillForm = function (size) {
	        
	    	$log.debug('SkillCtrl:openSkillForm called'); 
	    	var skillFormData={formTitle:'Add/Edit Skills',skills:$scope.skillsAll,validMsg:'',inputSkill:''
	    	};
	        var modalInstance = $modal.open({
	          templateUrl: 'templates/skill/skillModalWindow.html',
	          controller: 'ModalSkillController',
	          size: size,
	          resolve: {
	        	  skillFormData: function () {
	              return skillFormData;
	            }
	          }
	        });

	        modalInstance.result.then(function (result) {
	        	
	        	$log.debug('SkillCtrl:openSkillForm : rturn from modal window'); 
                
	        }, function () {
	          $log.info('SkillCtrl  modal dismissed at: ' + new Date());
	        });
	};
	$scope.getDisplayableSkills=function(){
		$log.debug('SkillCtrl:getDisplayableSkills called');
		SkillService.getDisplayableSkills()
			.then(
				 function(data){
		             $log.debug('SkillCtrl:getDisplayableSkills:success:');
		             $scope.skills=data;
		             $scope.selectedSkill=$scope.skills[0];
				  },
		          function(err) {
					$log.error('SkillCtrl:getDisplayableSkills:error: '+err);
		    });  
	};	  

    var init=function(){
    	$scope.loadSkills();
    };
	init();




});

	

