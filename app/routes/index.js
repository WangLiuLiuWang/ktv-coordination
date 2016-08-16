'use strict';
var SearchUtil =require('../common/searchInf_dataStore');
module.exports = function(app,passport){
	var base = process.cwd();
	var cache = null;
	var searchUtil = new SearchUtil;
	var isLogIn = function(req,res,next){
		if(req.isAuthenticated()){
			next();
		}else{
			res.redirect('/login');
		}
	}
	app.get('/',function(req,res){
		res.sendFile(base+'/public/index.html');
	});
			//这里的话，我想来个在client加个初始化
	app.get('/login',passport.authenticate('github'));
	app.get('/auth/github/callback',passport.authenticate('github',{
		failureRedirect:'/'
			}),function(req,res){
				res.redirect('/');
			});
			//鉴于在前端对数据进行排版处理，因而搜索地址加上搜索词
	app.get('/search/:searchWord',function(req,res,next){
//		req.params.pn = parseInt(req.params.pn);
//		if(!req.params.pn){
//			req.params.pn = 0;
//		}
		if(req.isAuthenticated()){
			console.log('authenticated -----------')
			if(req.params.searchWord === 'start'){
				console.log('start --------------')
				searchUtil.getLatest(req,res,searchUtil.searchInf);
				return;
//				if(word){
//					req.params.searchWord = word;
//					console.log('get the searchword before:'+word);
//				}else{
//					return {value:null,message:'you have\'t searched infor yet'};
//				}
			}else{
				searchUtil.dataStore(req,res);
				console.log('dataStore')
			}
			
		}else{
			if(req.params.searchWord === 'start'){
				return;
			}
		}
			next();
	},searchUtil.searchInf);

}