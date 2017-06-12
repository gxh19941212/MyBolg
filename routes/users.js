var express = require('express');
var router = express.Router();
var mongodb=require("mongodb").MongoClient;
var db_str="mongodb://localhost:27017/MyBolg"

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
 		var user=req.body['username'],
 		pass=req.body["password"];
 		var bl=false;
  
	var insertData=function(db,callback){
		var conn=db.collection('users')
		var data=[{user:user,pass:pass}]
		conn.insert(data,function(err,result){
			callback(result)
		})
	}

		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log("success")
				db.collection('users').find({}).toArray(function(err,datas){
					if(err){
						
					}else{
					datas.map(function(v){
						if(user!=v.user){
							bl=true;
						}else{
							bl=false;
							return false;
						}
					
					})
					if(bl){
						insertData(db,function(result){
						console.log(result)
						req.session.user=user;
						res.redirect('/');
						db.close();					
					})
					}else{
						res.redirect('/')
						db.close();
					}
				}
			})

			}
		})

});

router.post('/login', function(req, res, next) {
  	var user=req.body['username'],
 		pass=req.body["password"];
 		var bl=false;
 		
 		
 			mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log("success")
				db.collection('users').find({}).toArray(function(err,datas){
					if(err){
						
					}else{
					datas.map(function(v){
						if(user==v.user){
							if(pass==v.pass){
								bl=true;
								req.session.user=user;
							}else{
								bl=false;
							}
						}else{
							bl=false;
						}
					
					})
					if(bl){
						res.redirect('/')
						db.close();
					}else{
						res.redirect('/')
						db.close();
					}
					
					}
					
				})

			}
		})
 		
});

router.post('/message', function(req, res, next) {
	 		var title=req.body['title'],
 			con=req.body["con"];
  
	var insertData=function(db,callback){
		var conn=db.collection('liuyan')
		var data=[{title:title,con:con}]
		conn.insert(data,function(err,result){
			callback(result)
		})
	}
	
	
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log("success")
				insertData(db,function(result){
					console.log(result)
					res.redirect('/message')
					db.close();
				})
			}
		})
})

module.exports = router;
