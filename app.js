
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , routes = require('./routes')
  , myapp = require('./routes/myapp')
  , http = require('http')
  , path = require('path')
  , formidable = require('formidable')
  , util=require('util')
  , fs = require('fs')
  , mime = require('mime')
  , sheduleDao = require('./model/shedule')
  , profileDao = require('./model/profile')
  , skillDao = require('./model/skill')
  , profileScheduleDao = require('./model/profileSchedule')
  , locationDao = require('./model/location')
  , statusDao = require('./model/status')
  , interviewerDao = require('./model/interviewer')
  , fileDao = require('./model/filemgmtNew')
  ,logger = require("./utils/logger")
  ,constants = require("./utils/constants");
var ejs = require('ejs');
//var bodyParser = require('body-parser');
  var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}




/********************************/

app.get('/', routes.index);

app.get('/indexThree', myapp.indexThree);



/************************************/

/***************** shedular app *************/

app.post('/addShedule',function(req, res) {
	var SheduleModal = new sheduleDao.getSheduleModal();
	var shedule = new SheduleModal(req.body);
	//console.log("logged 1");
	shedule.save(function(err, result){
		if(err){
			logger.error('app:addShedule:'+constants.ERROR_RES+err);
			res.send(err);
		}
		else{
			logger.info('app:addShedule:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.post('/editShedule',function(req, res) {
	var SheduleModal= sheduleDao.getSheduleModal();
	logger.info('app:editShedule:'+req.body.id);
	SheduleModal.findOneAndUpdate({_id: req.body.id},req.body, {upsert:true},function(err, result) {
		if(err){
			logger.error('app:editShedule:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:editShedule:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
 
	});
});

app.post('/delShedule',function(req, res) {
	logger.info('app:deleteShedule');
	var SheduleModal= sheduleDao.getSheduleModal();
	logger.info('app:deleteShedule'+req.body.id);
	SheduleModal.findOneAndRemove({_id: req.body.id},function(err, result) {
		if(err){
			logger.error('app:deleteShedule:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:deleteShedule:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
 
	});
});



app.get('/getList',function(req,res) {
	logger.info('app:getList');
	var SheduleModal = new sheduleDao.getSheduleModal();
	//console.log(SheduleModal);
	SheduleModal.find().sort({date:-1,time:-1}).exec(function(err,result){
	//SheduleModal.find(function(err, result){
	if(err){
		    logger.error('app:getList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});

});


app.post('/fileUpload',function(req,res) {
	

	// creates a new incoming form
	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname + '/resumes';
	//form.encoding = 'binary';
	
	// parse a file upload
	form.parse(req, function(err, fields, files) {
		  logger.info('app:fileUpload:form.parse:'+files);
	 });
	form.on('progress', function(bytesReceived, bytesExpected) {
	      logger.info('app:fileUpload:Progress so far: '+(100*(bytesReceived/bytesExpected))+"%");
	});
	form.on('field', function(name, value) {
	      //res.write(name+": "+value+"\n");
	});
	form.on('file', function(name, file) {
		fs.rename(file.path, form.uploadDir + "/" + file.name);
	});
	form.on('end', function(fields, files){
		logger.info('app:fileUpload:end'+files);
		res.send('Upload received :\n');
		
	});
	
	form.on('error', function(err) {
        logger.error("app:fileUpload:"+constants.ERROR_RESP+err);
    });
	
	
});

app.get('/downloadFile',function(req,res) {
	
	logger.log('app.downloadFile:fileId'+req.query.fileId);
	
	var file = __dirname + '/resumes/' + req.query.fileId;
	var mimetype = mime.lookup(file);
	console.log(file+mimetype);
	
	
	res.download(file); 
});

app.get('/getTest',function(req,res) {
	
	//fileDao.uploadFile();
	fileDao.downloadFile();
	res.send('test is here');
});


/*************shedulat app end***********************/

/************ profile app begin ******************/

app.post('/addProfile',function(req, res) {
	var ProfileModal = new profileDao.getProfileModal();
	var profile = new ProfileModal(req.body);
	profile.save(function(err, result){
		if(err){
			logger.info('app:addProfile:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addProfile:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getProfileList',function(req,res) {
	var ProfileModal = new profileDao.getProfileModal();
	var sortFieldName=req.query.sortField;
	var sortRev=req.query.sortReverse;
	logger.info('app:getProfileList:sortField:'+sortFieldName+' sortRev:'+sortRev);
	var query='';
	if(sortRev=='true'){
		query=ProfileModal.find().sort([[sortFieldName,'descending']]);
	}
	else{
		query=ProfileModal.find().sort([[sortFieldName,'ascending']]);
	}
	query.exec(function(err,result){
	//ProfileModal.find().sort({"interviewAvailability.date":-1,"interviewAvailability.time":-1}).exec(function(err,result){
	//ProfileModal.find(function(err, result){
	if(err){
		   logger.error('app:getProfileList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getProfileList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});
	
});

app.post('/delProfile',function(req, res) {
	logger.info('app:delProfile');
	var ProfileModal = new profileDao.getProfileModal();
	logger.info('app:delProfile:'+req.body._id);
	ProfileModal.findOneAndRemove({_id: req.body._id},function(err, result) {
		if(err){
			logger.error('app:delProfile:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:delProfile:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
 
	});
});

app.post('/editProfile',function(req, res) {
	var ProfileModal = new profileDao.getProfileModal();
	logger.info('app:editProfile:'+req.body.id);
	ProfileModal.findOneAndUpdate({_id: req.body.id},req.body, {upsert:true},function(err, result) {
		if(err){
			logger.error('app:editProfile:'+constants.ERROR_RESP+err);
			res.status(500).send(err);
		}
		else{
			logger.info('app:editProfile:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
 
	});
});
app.post('/getProfileById',function(req, res) {
	
	var ProfileModal = new profileDao.getProfileModal();
	var profileId=req.query.profileId;
	logger.info('app:getProfileById:'+profileId);
	ProfileModal.find({_id: profileId}).exec(function(err,result){
		if(err){
			logger.error('app:getProfileById:'+constants.ERROR_RESP+err);
			res.status(500).send(err);
		}
		else{
			logger.info('app:getProfileById:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
 
	});
	
});

app.post('/updateProfileScheduleList',function(req, res) {
	
	var ProfileModal = new profileDao.getProfileModal();
	var profileId=req.body.iRecord.profile.pRecordId;
	var iRecord=req.body.iRecord;
	var delFlag=req.body.delFlag;
	logger.info('app:updateProfileScheduleList:'+profileId);
	ProfileModal.findOne({_id: profileId}).exec(function(err,result){
		if(err){
			logger.error('app:updateProfileScheduleList:'+constants.ERROR_RESP+err);
			res.status(500).send(err);
		}
		else{
			  //logger.info('app:updateProfileScheduleList:'+constants.SUCCESS_RESP+result);
			  var sList=result.scheduleList;
			   var isUpdated=false;
			   if(sList.length==0){
				   sList.push(iRecord);
			   	   isUpdated=true;
			   	logger.error('app:updateProfileScheduleList:--sList is empty and added');
			   }
			   else{
			   		 for (var i=0; i<sList.length; i++){
			   			  if(iRecord._id == sList[i]._id){
			   				  if(delFlag){
			   					sList.splice(i,1); 
			   				  }else{
			   					sList[i]=iRecord;
			   				  }
			   				  isUpdated=true;
			   				logger.info('app:updateProfileScheduleList:--sList is found and updated '+iRecord.status.name);
			   			  }
			   	     }
			   		 if(!isUpdated){
			   			logger.info('app:updateProfileScheduleList:--sList is new  and added '+iRecord._id);
			   			sList.push(iRecord);
			   		 }
			  }
			   
			  result.scheduleList=sList;
			  result.save(function(err1) {
					if(err){
						logger.error('app:updateProfileScheduleList:'+constants.ERROR_RESP+err1);
						res.status(500).send(err1);
					}
					else{
						logger.info('app:updateProfileScheduleList:'+constants.SUCCESS_RESP);
						res.send(result);
					}
			 
			  });
		}
 
	});
	
});
/*************profile app end*************************/

/**********  Profile Schedule begin******************/
app.post('/addProfileSchedule',function(req, res) {
	var ProfileScheduleModal = new profileScheduleDao.getProfileScheduleModal();
	var profileSchedule = new ProfileScheduleModal(req.body);
	profileSchedule.save(function(err, result){
		if(err){
			logger.info('app:addProfileSchedule:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addProfileSchedule:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getProfileScheduleList',function(req, res) {
	var ProfileScheduleModal = new profileScheduleDao.getProfileScheduleModal();
	ProfileScheduleModal.find(function(err, result){
		if(err){
			logger.info('app:getProfileScheduleList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getProfileScheduleList:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});


/***************Profile Schedule end******************/

/******************* location begin ******************/
app.post('/addCountry',function(req, res) {
	var LocationModal = new locationDao.getCountryModal();
	var location = new LocationModal(req.body);
	location.save(function(err, result){
		if(err){
			logger.info('app:addCountry:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addCountry:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getCountryList',function(req,res) {
	var LocationModal = new locationDao.getCountryModal();
	LocationModal.find(function(err, result){
	if(err){
		   logger.error('app:getCountryList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getCountryList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});
	
});


app.post('/addState',function(req, res) {
	var LocationModal = new locationDao.getStateModal();
	var location = new LocationModal(req.body);
	location.save(function(err, result){
		if(err){
			logger.info('app:addState:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addState:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getStateList',function(req,res) {
	var LocationModal = new locationDao.getStateModal();
	LocationModal.find().sort({name: 1}).exec(function(err,result){
	//LocationModal.find(function(err, result){
	if(err){
		   logger.error('app:getStateList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getStateList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});
	
});

/******************* location end ********************/

/******************* status begin ********************/

app.post('/addVisaStatus',function(req, res) {
	var StatusModal = new statusDao.getVisaStatusModal();
	var status = new StatusModal(req.body);
	status.save(function(err, result){
		if(err){
			logger.info('app:addVisaStatus:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addVisaStatus:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getVisaStatusList',function(req,res) {
	var StatusModal = new statusDao.getVisaStatusModal();
	StatusModal.find(function(err, result){
	if(err){
		   logger.error('app:getVisaStatusList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getVisaStatusList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});
	
});

app.post('/addWorkAvailStatus',function(req, res) {
	var StatusModal = new statusDao.getWorkAvailStatus();
	var status = new StatusModal(req.body);
	status.save(function(err, result){
		if(err){
			logger.info('app:addWorkAvailStatus:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addWorkAvailStatus:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getWorkAvailStatusList',function(req,res) {
	var StatusModal = new statusDao.getWorkAvailStatus();
	StatusModal.find(function(err, result){
	if(err){
		   logger.error('app:getWorkAvailStatusList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getWorkAvailStatusList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});
	
});


app.post('/addInterviewStatus',function(req, res) {
	var StatusModal = new statusDao.getInterviewStatus();
	var status = new StatusModal(req.body);
	status.save(function(err, result){
		if(err){
			logger.info('app:addInterviewStatus:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addInterviewStatus:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getInterviewStatusList',function(req,res) {
	var StatusModal = new statusDao.getInterviewStatus();
	StatusModal.find(function(err, result){
	if(err){
		   logger.error('app:getInterviewStatusList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getInterviewStatusList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});
	
});


/******************* status end ********************/
/******************* interviewer begin ********************/

app.post('/addInterviewer',function(req, res) {
	var InterviewerModal = new interviewerDao.getInterviewerModal();
	var interviewer = new InterviewerModal(req.body);
	interviewer.save(function(err, result){
		if(err){
			logger.info('app:addInterviewer:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addInterviewer:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getInterviewersList',function(req,res) {
	var InterviewerModal = new interviewerDao.getInterviewerModal();
	InterviewerModal.find().sort([['name','ascending']]).exec(function(err, result){
	if(err){
		   logger.error('app:getInterviewersList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getInterviewersList:'+constants.SUCCESS_RESP);
			res.send(result);
		}
	});
	
});

app.post('/updateInterviewerById',function(req, res) {
	var InterviewerModal = new interviewerDao.getInterviewerModal();
	logger.info('app:updateInterviewerById:'+req.body.isDisplay);
	InterviewerModal.findOneAndUpdate({_id: req.body._id},req.body, {upsert:false},function(err, result) {
		if(err){
			logger.error('app:updateInterviewerById:'+constants.ERROR_RESP+err);
			res.status(500).send(err);
		}
		else{
			logger.info('app:updateInterviewerById:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
 
	});
});

/******************* interviewer end ********************/

/******************* skill begin ************************/
app.post('/addSkill',function(req, res) {
	var SkillModal = new skillDao.getSkillModal();
	var skill = new SkillModal(req.body);
	skill.save(function(err, result){
		if(err){
			logger.info('app:addSkill:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:addSkill:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.get('/getSkillList',function(req, res) {
	var SkillModal = new skillDao.getSkillModal();
	SkillModal.find().sort([['name','ascending']]).exec(function(err, result){
		if(err){
			logger.info('app:getSkillList:'+constants.ERROR_RESP+err);
			res.send(err);
		}
		else{
			logger.info('app:getSkillList:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
    });
	
});

app.post('/updateSkillById',function(req, res) {
	var SkillModal = new skillDao.getSkillModal();
	logger.info('app:updateSkillById:'+req.body.isDisplay);
	SkillModal.findOneAndUpdate({_id: req.body._id},req.body, {upsert:false},function(err, result) {
		if(err){
			logger.error('app:updateSkillById:'+constants.ERROR_RESP+err);
			res.status(500).send(err);
		}
		else{
			logger.info('app:updateSkillById:'+constants.SUCCESS_RESP+result);
			res.send(result);
		}
 
	});
});


/******************* skill end *************************/


http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
