
var mongoose = require('mongoose');
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	logger.error('location:'+'connection error->'+err);
}else{
	logger.info('location:'+'mongo db connection successful');
}

});

var countrySchema = new mongoose.Schema({
	id: Number,
	code:String,
	name:String,
	
 	});

var stateSchema = new mongoose.Schema({
	id: Number,
	code:String,
	name:String,
	countryId:Number
 	});

var Country = mongoose.model('Country', countrySchema,'countries');
var State = mongoose.model('State', stateSchema,'states');

exports.getCountryModal=function(){
	
	return Country;
};

exports.getStateModal=function(){
	
	return State;
};

