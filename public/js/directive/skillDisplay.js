var contrModule = angular.module('myNotePad');

contrModule.directive('skillDisplay', function($compile) {
	
	  return {
		  
		  
		  scope: {
		      //rowDisplay: "=", //import referenced model to our directives scope
		      rowSkills: "=",
		      onSkillSelected : '&',
		      selectedSkill: "="
		    	  
		  },
		  //scope:false,
		  //restrict: 'A',
		  templateUrl: 'templates/interview/skillRatingsRow.html',
		  controller: function($scope, $element){
		      //alert('in controller');
		   },
		  link: function(scope, elem, attr,ngModel) {
			  
			     scope.toggle = function() {
				//alert("toggle :"); 
			 };
			 
			 scope.$watch('selectedSkill',
						function(oldVal, newVal) {
						 //alert('watch:'+newVal.name);
						 //scope.selectedSkill=newVal;
						 scope.onSkillSelected({
								selectedSkill : scope.selectedSkill
							});
		     });
			 scope.$watch(attr.ngModel,function(){
			 });
		  
		  },
		  
	  };
});
