var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://srrao-linux.homeoffice.wal-mart.com/mydb',function(err){

if(err){
	console.log('connection error->', err);
}else{
	 console.log('movie.js mongo db connection successful');
}

});



