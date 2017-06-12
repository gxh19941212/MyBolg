var express = require('express');
var router = express.Router();
var mongodb=require("mongodb").MongoClient;
var db_str="mongodb://localhost:27017/MyBolg"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',user:req.session.user});
});
router.get('/more', function(req, res, next) {
  res.render('more', { title: 'Express',user:req.session.user});
});
router.get("/relogin",function(req,res,next){
	req.session.destroy(function(err){
		if(!err){
			res.redirect('/');
		}
	})
});
router.get("/message",function(req,res,next){
 			mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log("success")
				db.collection('liuyan').find({}).toArray(function(err,datas){
					if(err){
						
					}else{
						res.render('message',{ title: 'Express' ,user:req.session.user,datas:datas});
					}
			})
		}
	})
})

module.exports = router;
