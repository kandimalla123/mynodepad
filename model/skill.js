var mongoose = require('mongoose');
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	logger.error('skill:'+'connection error->'+err);
}else{
	logger.info('skill:'+'mongo db connection successful');
}

});

var skillSchema = new mongoose.Schema({
	name:String,
	code:String,
	isDisplay:Boolean
 	});

var Skill = mongoose.model('Skill', skillSchema,'skills');

exports.getSkillModal=function(){
	
	return Skill;
};
