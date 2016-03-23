var mongoose = require('mongoose');
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	logger.error('profile:'+'connection error->'+err);
}else{
	logger.info('profileSchedule:'+'mongo db connection successful');
}

});

var profileScheduleSchema = new mongoose.Schema({
	profileId:String,
	scheduleList:[{id:String}]
});

var ProfileSchedule = mongoose.model('ProfileSchedule', profileScheduleSchema,'profileSchedules');

exports.getProfileScheduleModal=function(){
	
	return ProfileSchedule;
};