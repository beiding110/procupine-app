var win = (function() {
	function toSearch(obj, flag) {
		var res = '?'
		if (typeof obj == 'object' && Array.isArray(obj)) {
			obj.forEach(function (item, index) {
				res += ('[' + index + ']=' + owner.toSearch(item, true) + '&');
			});
		} else if (typeof obj == 'object') {
			Object.keys(obj).forEach(function (key) {
				if (typeof obj[key] == 'object' && Array.isArray(obj[key])) {
					obj[key].forEach(function (item, index) {
						res += (key + '[' + index + ']=' + owner.toSearch(item, true) + '&')
					});
				} else if (typeof obj[key] == 'object' && obj[key] != null) {
					res += (owner.toSearch(obj[key], true) + '&');
				} else {
					var item = /[\u3220-\uFA29]/.test(obj[key]) ? escape(obj[key]) : obj[key];
					res += (key + '=' + (item || '') + '&');
				}

			});
		} else {
			return obj;
		}
		return !!flag ? res.slice(1, -1) : res.slice(0, -1);
	}

	function argHandler() {
		callback = (typeof(arguments[arguments.length-1])==='function') ? arguments[arguments.length-1] : function() {};
			var url = '';
			if(typeof(arguments[0]) === 'string'){
				url = arguments[0];
			}else if(typeof(arguments[0]) === 'object') {
				var path = arguments[0].path,
					query = arguments[0].query;

				url = (typeof(query) === 'object') ? (path + toSearch(query)) : path;
			};
			var timeStamp = (new Date).getTime();
            if(/#/.test(url)) {
                var urlArr = url.split('#');
                if(/\?/.test(url)) {
                    urlArr[0] += ('&ts=' + timeStamp)
                } else {
                    urlArr[0] += ('?ts=' + timeStamp)
                };
                url = urlArr.join('#');
            } else {
                if(/\?/.test(url)) {
                    url = url + '&ts=' + timeStamp
                } else {
                    url = url + '?ts=' + timeStamp
                };
            }
			callback(url);
		callback(url);
	};

	function argArrBuilder(arg, callback) {
		var argArr = [];
		for(var i = 0; i < arg.length; i++){
			argArr.push(arg[i]);
		}
		argArr.push(callback);
		return argArr;
	};

	return {
		g: function() {
			argHandler.apply(this, argArrBuilder(arguments, function(url) {
				window.location.href = url;
			}));
		},
		r: function() {
			argHandler.apply(this, argArrBuilder(arguments, function(url) {
				window.location.replace(url);
			}));
		}
	}
})()

module.exports = win
