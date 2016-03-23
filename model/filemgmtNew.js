var mongoose = require('mongoose'),
fs = require("fs"),
Grid = require('gridfs-stream'),
path=require('path'),
gridfs ,
readStream,
writeStream,
buffer="";
var logger = require("../utils/logger");
var db=mongoose.createConnection('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){
if(err){
	logger.error('filemgmtNew:'+'connection error->'+err);
}else{
	logger.info('filemgmtNew:'+'mongo db connection successful');
}

});



db.once('open', function () {
	
	gridfs  = Grid(db.db, mongoose.mongo);


});






exports.downloadFile = function(req,res){
	
	logger.info('filemgmtNew:downloadFile');
	var fileId = mongoose.Types.ObjectId("555fafa89f64cbb806084164");
	
	var options={
		    _id: '55665e5f9ae2c66c1a29a410',
			//filename: "test.txt",
			mode:'r',
			chunkSize: 1024,
			content_type: 'plain/text',
			root: 'shedule_profiles',
			metadata:{
				category:'text'
			}
			
			
	};
	//read file, buffering data as we go
	readStream = gridfs.createReadStream(options);

	//error handling, e.g. file does not exist
	readStream.on('error', function (err) {
		logger.error('filemgmtNew:readStream:'+constants.ERROR_RESP+err);
	  throw err;
	});

	readStream.on("data", function (chunk) {
	    buffer += chunk;
	});

	readStream.on("end", function () {
	    logger.info("contents of file:\n\n"+buffer);
	    
	});
	//readStream.pipe(res);

	
};
exports.uploadFile = function(){
	
	logger.info('filemgmtNew:uploadFile');
	
	var options={
		    _id: mongoose.Types.ObjectId(),
			filename: "test.txt",
			mode:'w',
			chunkSize: 1024,
			content_type: 'plain/text',
			root: 'shedule_profiles',
			metadata:{
				category:'text'
			}
			
			
	};
	logger.info('filemgmtNew:uploadFile:filePath'+__dirname);
	writeStream = gridfs.createWriteStream(options);
	fs.createReadStream(path.join(__dirname, 'yogeswara_3_19_2015.docx')).pipe(writeStream);
	writeStream.on("error", function (err) {
		console.log('filemgmtNew:uploadFile:'+constants.ERROR_RESP+err);
	});
	writeStream.on("close", function () {
		console.log('filemgmtNew:uploadFile:'+constants.SUCCESS_RESP+' uploading is finished');
	});
	

	
};