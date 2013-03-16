
/*
 * User Controller
 */

var mongoose = require('mongoose'), schema = mongoose.Schema, oId = schema.ObjectId, userSchema, model;
	userSchema = new schema({
		email: {type: String, lowercase:true, trim: true, required: true, index:{unique:true}},
		first_name: String,
		last_name: String,
		password: String,
		date_added: Date,
		last_mod: Date
	});
	model = mongoose.model('user', userSchema, 'users');

exports.index = function(req, res){
	
	var user, url = require('url'), query = url.parse(req.url, true).query, querystring = require('querystring');
	mongoose.connect('mongodb://localhost/user');
	
	function handleError (err) {
		console.log(err);
		mongoose.disconnect();
		res.send(JSON.stringify({error:true}));
	}
	
  switch (req.method) {
  case 'GET':
	  model.findById(query.id, function (err, user) {
		  if (err) {
			  handleError(err);
		  }
		  mongoose.disconnect();
		  res.send(JSON.stringify(user));
	  });
	  break;
  case 'PUT':
  case 'POST':
	  var data = req.body;
	  user = (data._id)? model.find({'_id':data._id}) : new model();
	  user.set('email', data.email);
	  user.set('first_name', data.first_name);
	  user.set('last_name', data.last_name);
	  user.set('date_added', data.date_added || Date.now());
	  user.set('last_mod', Date.now());
	  user.save(function (err) {
		  handleError(err);
	  });
	  mongoose.disconnect();
	  res.send(JSON.stringify(user));
	  break;
  case 'DELETE':
	  model.findById(query.id, function (err, user) {
		  user.remove(function (err, user) {
			  if (err) {
				  handleError(err);
			  }
			  mongoose.disconnect();
			  res.send(JSON.stringify(user));
		  });
	  });
	  break;
  case 'default':
	  handleError({});
	  break;
  }
};