'use strict';
define([], function() {
	var userService = function($utils) {
		return{
			setUser: function(user){
				var obj = {
					_id : user._id,
				}
				$utils.setStorage('user', obj);
			},

			getUser: function(){
				return $utils.getStorage('user');
			},

			delUser: function(){
				return $utils.deleteStorage('user');
			}
		};
	}
	return userService;
});