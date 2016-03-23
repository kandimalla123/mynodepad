var mongoose = require('mongoose');
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	logger.error('shedule:'+'connection error->'+err);
}else{
	 logger.info('shedule:'+'mongo db connection successful');
}

});
var interviewer_record={
		id:Number,
		name:String,
		eMail:String,
		requirements:[{}]
        };


var sheduleSchema = new mongoose.Schema({
	id: String,
    interviewer: interviewer_record,
    interviewee: String,
    date: Date,
    time:Date,
    status:{id:Number,name:String},
    feedback:[{id:Number,skill:String,rating:Number}],
    comments:String,
    profile:{id:Number,resumeLink:String,showDownloadLink:Boolean,pRecordId:String}
 	});

var Shedule = mongoose.model('Shedule', sheduleSchema,'shedules');

var sheduleCollections = db.collection('shedules');


exports.add = function(sheduleRecord){
	
    logger.info('shedule:add');
	var shedule = new Shedule(sheduleRecord);
	
	shedule.save(function(err, result){
	   if(err){
		   logger.error('shedule:add:'+constants.ERROR_RESP+err);
		 //res.send("error while inserting in db :"+err);
		   return err;
		}
		 else{
			 logger.info('shedule:add:'+constants.SUCCESS_RESP+result);
			 return result;
	   }
    });

};

exports.edit = function(sheduleRecord){
	
	 logger.info('shedule:edit');
	var shedule = new Shedule(sheduleRecord);
	shedule.save(function(err, result){
	   if(err){
		   logger.error('shedule:edit:'+constants.ERROR_RESP+err);
		 //res.send("error while inserting in db :"+err);
		   return err;
		}
		 else{
			 logger.info('shedule:edit:'+constants.SUCCESS_RESP+result);
			 return result;
	   }
    });

};

exports.list = function(req, res){
	
	Shedule.find(function(err, result) {
		if(err){
			logger.error('shedule:list:'+constants.ERROR_RESP+err);
			
		}
		else{
			logger.info('shedule:list:'+constants.SUCCESS_RESP+result);
			return result;
		}
	});

};

exports.getSheduleModal=function(){
	
	return Shedule;
};
exports.getSheduleCollection=function(){
	
	return sheduleCollections;
};
