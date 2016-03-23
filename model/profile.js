
var mongoose = require('mongoose');
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	logger.error('profile:'+'connection error->'+err);
}else{
	logger.info('profile:'+'mongo db connection successful');
}

});

var interviewer_record={
		id:Number,
		name:String,
		eMail:String,
		requirements:[{}]
        };

var interview_record={
	id: String,
    interviewer: interviewer_record,
    interviewee: String,
    date: Date,
    time:Date,
    status:{id:Number,name:String,isDisplay:Boolean},
    feedback:[{id:Number,skill:String,rating:Number,isDisplay:Boolean}],
    comments:String,
    profile:{id:Number,resumeLink:String,showDownloadLink:Boolean,pRecordId:String,isDisplay:Boolean},
    isDisplay:Boolean
 	};



var profileSchema = new mongoose.Schema({
	id: String,
	candidateName: String,
	contactNumber: String,
	eMail: String,
	skypeId:String,
	currentLocation:{city:String,state:{ id:Number,code:String,name:String,countryId:Number},country:{id:Number,code:String,name:String},isDisplay:Boolean},
	visaSelectedStatus:{id:Number,name:String,isDisplay:Boolean},
	workAvailSelectedStatus:{id:Number,name:String,isDisplay:Boolean},
	interviewAvailability:{date:Date,time:Date,isDisplay:Boolean},
    profile:{id:Number,resumeLink:String,showDownloadLink:Boolean,isDisplay:Boolean},
    scheduleList:[interview_record],
    isDisplay:Boolean
 	},{ versionKey: false });

var Profile = mongoose.model('Profile', profileSchema,'profiles');

exports.getProfileModal=function(){
	
	return Profile;
};


