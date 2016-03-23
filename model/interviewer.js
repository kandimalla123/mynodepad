
var mongoose = require('mongoose');
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	logger.error('interviewer:'+'connection error->'+err);
}else{
	logger.info('interviewer:'+'mongo db connection successful');
}

});

var InterviewerSchema = new mongoose.Schema({
	id: Number,
	name:String,
	eMail:String,
	isDisplay:Boolean,
	requirements:[{}]
	
 	});



var Interviewer = mongoose.model('Interviewer', InterviewerSchema,'interviewers');


exports.getInterviewerModal=function(){
	
	return Interviewer;
};

