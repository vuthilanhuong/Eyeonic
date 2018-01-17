var mongoose = require('mongoose');
var Admin = require('../models/admin');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.get_list = function(req, resp){
	var page = Number(req.query.page);
	var limit = 10;
	Admin.find({status:1}).paginate(page, limit, function(err, result, total) {
    	console.log('total: ', total, 'result: ', result);
    	var responseData = {
    		'listAdmin': result,
    		'total': total
    	};
    	resp.send(responseData);
  	});
};

exports.add = function(req, resp){
	console.log('i am adding admin.');
	req.body.password = bcrypt.hashSync(req.body.password, 10);
	var admin = new Admin(req.body);
	Admin.on('index', function (error) {
		if (error)
	    	resp.send(error);
	});
	admin.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    resp.send('Save success');
	  }
	});
};

exports.get_detail = function(req, resp){
	console.log('i am getting a admin.');
	Admin.findById(req.params.id, function(err, result) {
    	if (err)
      	  resp.send(err);
    	resp.json(result);
  	});

};

exports.update = function(req, resp){
	console.log('i am updating admin.');
	Admin.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};

exports.delete = function(req, resp){
	console.log('i am deleting admin.');
	Admin.findOneAndUpdate({_id: req.params.id}, {"status": 0}, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};

exports.loginRequired = function(req, res, next) {
  if (req.admin) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized admin!' });
  }
};

exports.getAdmin = function(req, res, next) {
	Admin.findById(req.params.id, function(err, result) {
	    if (err)
	      res.status(400);
	    res.json(result);
	});
};

exports.login = function(req, resp){
	console.log('i am login.');
	if(req.body.userName){
		if (req.body.password) {
			Admin.find({"userName": req.body.userName}, function(err, result) {
			    if (!result[0]){
			    	resp.status(500);
			    	resp.send('User name does not exist')
			    } else {
			    	if(bcrypt.compareSync(req.body.password, result[0].password)){
				    	resp.json({userID:result[0]._id,token: jwt.sign({ email: result[0].email, fullName: result[0].fullName, _id: result[0]._id }, 'AdminAPI', { expiresIn: 1440 })});
				    }else{
				    	resp.status(500);
			    		resp.send('Wrong password')
				    }
			    }
   			})
		}else{
			resp.send('Not found');
		}
	}else{
		resp.send('Not found');
	}	
};

exports.checkUser = function(req, resp){
	console.log('i am login.');
	Admin.find({"userName": req.body.userName}, function(err, result) {
	    if (!result[0])
	      resp.status(400);
	    resp.json(result);
    });
};

exports.checkEmail = function(req, resp){
	console.log('i am login.');
	Admin.find({"email": req.body.email}, function(err, result) {
	    if (!result[0])
	      resp.status(400);
	    resp.json(result);
    });
};