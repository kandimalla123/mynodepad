
var mongoose = require('mongoose');
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	logger.error('status:'+'connection error->'+err);
}else{
	logger.info('status:'+'mongo db connection successful');
}

});

var visaStatusSchema = new mongoose.Schema({
	id: Number,
	name: String
 	});

var VisaStatus = mongoose.model('VisaStatus', visaStatusSchema,'visaStatus');

exports.getVisaStatusModal=function(){
	
	return VisaStatus;
};


var WorkAvailStatusSchema = new mongoose.Schema({
	id: Number,
	name: String
 	})

var WorkAvailStatus = mongoose.model('WorkAvailStatus', WorkAvailStatusSchema,'workAvailStatus');

exports.getWorkAvailStatus=function(){
	
	return WorkAvailStatus;
};

var InterviewStatusSchema = new mongoose.Schema({
	id: Number,
	name: String
 	})

var InterviewStatus = mongoose.model('InterviewStatus', InterviewStatusSchema,'interviewStatus');

exports.getInterviewStatus=function(){
	
	return InterviewStatus;
};




