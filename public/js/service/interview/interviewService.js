var srvcModule = angular.module('service');

srvcModule.service('sheduleService', function ($http,$q,$log) {
	
	//var uid=2;
	
	/**
	var sheduleRecords1 = [{
        id: 0,
        interviewer: 'test',
        interviewee: 'test',
        date: '10/10/2016',
        time:'14:50',
        status:{id:1,name:'Planned'},
        comments:'test comments here1',
        feedback:[{id:0,skill:'Core Java',rating:'7'},{id:1,skill:'Frameworks',rating:'3'}],
        
        
    },
    {
        id: 1,
        interviewer: 'test1',
        interviewee: 'test1',
        date: '10/10/2016',
        time:'16:00',
        status:{id:1,name:'Planned'},
        comments:'test comments here2',
        feedback:[{id:0,skill:'Core Java',rating:'10'},{id:1,skill:'Frameworks',rating:'1'}],
        
        
    }];
	**/
	var sheduleRecord={};
	var selectedSkills=[];
	var selectedRatings=[];
	this.sheduleRecords=null;
	var actionType=null;
	this.add = function() {
		$log.debug('service:add called');
 	   sheduleRecord.feedback=[];
			for(i in selectedSkills){
				sheduleRecord.feedback.push({id:i,skill:selectedSkills[i],rating:selectedRatings[i]});
			}
		var deferred = $q.defer();
		//alert('sehdule rcord profile is '+this.profile);
        $http.post('/addShedule',sheduleRecord)
        .success(function(data) {
             $log.debug('service:add:success');
         	deferred.resolve(data);
        	
        })
        .error(function(err) {
        	 $log.error('service:add:error:'+err);
            deferred.reject(err);
        	
        });
        return deferred.promise;
		
		
    };
	
    this.editRecord=function(){
    	
        $log.debug('service:editRecord called');
  	   sheduleRecord.feedback=[];
 			for(i in selectedSkills){
 				sheduleRecord.feedback.push({id:i,skill:selectedSkills[i],rating:selectedRatings[i]});
 			}

 		var deferred = $q.defer();
 		
         $http.post('/editShedule',sheduleRecord)
         .success(function(data) {
          	//this.clear();
             $log.debug('service:edit:sucess');
          	deferred.resolve(data);
         	
         })
         .error(function(err) {
             $log.error('service:edit:error:'+err);
             deferred.reject(err);
         	
         });
         //alert('returned :'+deferred.promise);
         return deferred.promise;
    };
    
  
    
    this.deleteRecord=function(){
    	
    	 $log.debug('service:deleteRecord called');
    	  var deferred = $q.defer();
           $http.post('/delShedule',sheduleRecord)
           .success(function(data) {
            	//this.clear();
                $log.debug('service:delete:sucess');
            	deferred.resolve(data);
           	
           })
           .error(function(err) {
               $log.error('service:delete:error:'+err);
               deferred.reject(err);
           	
           });
           //alert('returned :'+deferred.promise);
           return deferred.promise;
    	
    }
    
    this.list=function(){
    	$log.debug('service:list called');
    	var deferred = $q.defer();
    	if(this.sheduleRecords!==null){
    		//alert('cache')
    		deferred.resolve(this.sheduleRecords);
    	}
    	else{
         	$http.get('/getList')
              .success(function(data) {
            	  $log.debug('service:list:sucess');
            	  this.sheduleRecords=data;
            	  //alert('in service :'+this.sheduleRecords);
        	       deferred.resolve(this.sheduleRecords);
 
             })
            .error(function(err){
            	//alert('sevice:list:error'+data);
            	$log.error('service:list:error:'+err);
           	    deferred.reject(err);
            });
         	
         	
    	}
    	return deferred.promise; 
    }
    

    
    this.getId=function(){
    	return sheduleRecord.id;
    }
    this.setId=function(newValue){
    	sheduleRecord.id=newValue;	
    }
    this.setInterviewer=function(newValue){
    	sheduleRecord.interviewer=newValue;
    }
    this.setInterviewee=function(newValue){
    	sheduleRecord.interviewee=newValue;
    }
    this.setDate=function(newValue){
    	sheduleRecord.date=newValue;
    }
    this.setStatus=function(newValue){
    	sheduleRecord.status=newValue;
    }
    this.setTime=function(newValue){
    	sheduleRecord.time=newValue;
    }
    this.setComments=function(newValue){
    	sheduleRecord.comments=newValue;
    };
    this.getRatingSelected=function(index){
    	
    }
    
    this.putRatingSelected=function(index,newRating){
    	
    	selectedRatings[index]=newRating;
    	//alert('putRatingSelected '+selectedRatings.length);
    }
    
    this.removeRatingSelected=function(index){
    	selectedRatings.splice(index,1);
    }
    
    
    this.getSkillSelected=function(index){
    	
    }
    
    
    this.putSkillSelected=function(index,newSkill){
        
        selectedSkills[index]=newSkill;
        //alert('putSkillSelected '+selectedSkills.length);

     }
    
     this.removeSkillSlected=function(index){
    	 selectedSkills.splice(index,1);
     }
    
    this.setFeedback=function(newFeedback){
    	
    	sheduleRecord.feedback=newFeedback;
    }
    
   this.getFeedback=function(){
    	
	    if(sheduleRecord.feedback==null){
	    	
	    	sheduleRecord.feedback=[];
	    }
    	return sheduleRecord.feedback;
    }
    this.getProfile=function(){
    	return sheduleRecord.profile;
    }
    this.setProfile=function(newProfile){
    	//alert('setProfile called')
    	if(newProfile==null){
    		sheduleRecord.profile={};
    	}
    	sheduleRecord.profile=newProfile;
    }
    this.clear=function(){
		sheduleRecord={};
		//selectedSkills=[];
		//selectedRatings=[];

    }
    this.getRecords=function(){
    	//alert('getRecords')
    	return this.sheduleRecords;
    	
    }
    this.setRecords=function(records){
    	//alert('setRecords')
    	this.sheduleRecords=records;
    	
    }
    this.setActionType=function(newValue){
    	this.actionType=newValue;
    }
    this.getActionType=function(){
    	return this.actionType;
    }
    
    this.setSheduleRecord=function(record){
    	sheduleRecord.id=record.id;	
    	sheduleRecord.interviewer=record.interviewer;
    	sheduleRecord.interviewee=record.interviewee;
    	sheduleRecord.date=record.date;
    	sheduleRecord.time=record.time;
    	sheduleRecord.status=record.status;
    	sheduleRecord.comments=record.comments;
    	sheduleRecord.feedback=record.feedback;
    	
    };
    
});