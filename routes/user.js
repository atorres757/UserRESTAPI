
/*
 * User Controller
 */

var mongoose = require('mongoose'), schema = mongoose.Schema, userSchema, model;
	userSchema = new schema({
		email: {type: String, lowercase:true, trim: true, required: true, unique: true, index: true},
		first_name: String,
		last_name: String,
		password: {type: String, required: true},
		date_added: Date,
		last_mod: Date
	});
	model = mongoose.model('user', userSchema, 'users');

exports.index = function(req, res){
	
	var user, url = require('url'), query = url.parse(req.url, true).query, querystring = require('querystring');
	mongoose.connect('mongodb://localhost/user');
	
	function handleError (err) {
		console.log('error');
		console.log(err);
		mongoose.disconnect();
		res.send(JSON.stringify(err));
	}
	
  switch (req.method) {
  case 'GET':
	  model.findById(query._id, function (err, user) {
		  if (err) return handleError(err);
		  mongoose.disconnect();
		  res.send(JSON.stringify(user));
	  });
	  break;
  case 'PUT':
  case 'POST':
	  var data = req.body, update = {}, required = model.schema.requiredPaths(), errors = [];
	  
	  // validation
	  model.schema.eachPath(function (key, val) {
		  if (data[key]) update[key] = data[key];
	  });
	  for (var i = 0; i < required.length; i++) {
		  if (!update[required[i]] || update[required[i]] == "" || update[required[i]] == null) {
			  errors.push(required[i] + " is required");
		  }
	  }
	  if (errors.length > 0) return handleError({message:errors.join(', ')});
	  
	  update.date_added = update.date_added ? update.date_added : Date.now();
	  update.last_mod = Date.now();
	  
	  model.findByIdAndUpdate(
			  data._id || new mongoose.Types.ObjectId, 
			  update, 
			  {"upsert":true, "new":true},
			  function (err, user) {
				  if (err) return handleError(err);
				  mongoose.disconnect();
				  res.send(JSON.stringify(user));
			  }
	  );
	  break;
  case 'DELETE':
	  model.findById(query._id, function (err, user) {
		  user.remove(function (err, user) {
			  if (err) return handleError(err);
			  mongoose.disconnect();
			  res.send(JSON.stringify(user));
		  });
	  });
	  break;
  case 'default':
	  handleError({message:'method not allowed'});
	  break;
  }
};