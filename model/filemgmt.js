var mongoose = require('mongoose');
var Step = require('step');
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){
if(err){
	console.log('connection error->', err);
}else{
	 console.log('filemgmt.js mongo db connection successful');
}

});



exports.uploadFile = function(){
	
	console.log('service:uploadFile');
	var fileId = mongoose.Types.ObjectId();
	var gridStore = new mongoose.mongo.GridStore(db.db, fileId, "test.txt","w", {root:'fs'});
	gridStore.chunkSize = 1024 * 256;
	gridStore.metadata={
			category:'text',
	};
	
	gridStore.open(function(err, gridStore){
		Step(
		      function writeData(){
		         var group = this.group();

		         for(var i = 0; i < 1000000; i += 5000){
		            gridStore.write(new Buffer("this is testing data"), group());
		         }
		      },

		      function doneWithWrite(){
		         gridStore.close(function(err, result) {
		            console.log("File has been written to GridFS");
		         });
		      }
		   )
    });

	
};


exports.downloadFile = function(){
	
	console.log('app:downloadFile');
	var fileId = mongoose.Types.ObjectId("555fafa89f64cbb806084164");
	var gridStore = new mongoose.mongo.GridStore(db.db, fileId, "r");
	console.log("grid store is: "+gridStore);
	gridStore.open(function(err, gridStore){
		console.log("grid store is: "+gridStore);
		// gridStore.readlines(function(err, lines) {
			 
			 //console.log("lines are : "+lines);
			 
		// });

	});

	
};