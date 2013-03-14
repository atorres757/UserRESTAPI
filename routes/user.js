
/*
 * User Controller
 */

exports.index = function(req, res){
	var mg = require('mongoose');
	mg.connect('mongodb://localhost/user');
	
	var schema = mg.Schema, oId = schema.ObjectId, userSchema, model, user, url = require('url'), query = url.parse(req.url, true).query;
	userSchema = new schema({
		email: {type: String, lowercase:true, trim: true, required: true, index:{unique:true}},
		first_name: String,
		last_name: String,
		password: String,
		date_added: Date,
		last_mod: Date
	});
	model = mg.model('user', userSchema, 'users');
	
  switch (req.method) {
  case 'GET':
	  user = new model();
	  
	  /*
	  user.set('email', 'atorres757@gmail.com');
	  user.set('first_name', 'Allen');
	  user.set('last_name', 'Torres');
	  user.set('date_added', Date.now());
	  user.set('last_mod', Date.now());
	  user.save();
	  */
	  console.log(query);
	  mg.disconnect();
	  res.send('User Get!');
	  break;
  case 'PUT':
  case 'POST':
	  /*
	  user.set('email', 'atorres757@gmail.com');
	  user.set('first_name', 'Allen');
	  user.set('last_name', 'Torres');
	  user.set('date_added', Date.now());
	  user.set('last_mod', Date.now());
	  user.save();
	  */
	  mg.disconnect();
	  res.send('User Post!');
	  break;
  case 'DELETE':
	  mg.disconnect();
	  res.send('User Delete!');
	  break;
  }
  
  res.send('Hello');
};