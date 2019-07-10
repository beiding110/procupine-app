module.exports = function(owner) {

    function getLocation (type, key) {
        try {
			var path = window.location[type].slice(1);
		} catch (e) {
            return false
        };
        if(!path) {
            path = [];
        } else {
            path = path.split("&");
        };

		var pathObj = {};
        path.forEach(function (item) {
            var value = item.split("=")[1];
                value = /%u/.test(value) ? unescape(value) : /%E/.test(value) ? decodeURI(value) : value;
            var key = item.split("=")[0];
            if(/\[\]/.test(key)) {
                var arrName = key.replace('[]', '');
                pathObj[arrName] = pathObj[arrName] ? pathObj[arrName] : [];
                pathObj[arrName].push(value);
            } else {
                pathObj[item.split("=")[0]] = value;
            }
        });

		if (!!key)
			return pathObj[key];
		else
			return pathObj;
    }

	/********
	接收地址栏参数
	key:参数名称
	**********/
	owner.getSearch = function (key) {
		return getLocation('search', key);
	}

	/**
	 * 将对象转化成search字符串
	 * @param  {Object} obj  对象或数组
	 * @param  {boolean} flag 是否携带'?'
	 * @return {string}      返回的格式化后字符串
	 */
	owner.toSearch = function (obj, flag) {
		var res = '?'
		if (typeof obj == 'object' && Array.isArray(obj)) {
			obj.forEach(function (item, index) {
				res += ('[' + index + ']=' + owner.toSearch(item, true) + '&');
			});
		} else if (typeof obj == 'object') {
			Object.keys(obj).forEach(function (key) {
				if (typeof obj[key] == 'object' && Array.isArray(obj[key])) {
					obj[key].forEach(function (item, index) {
						res += (key + '[]=' + owner.toSearch(item, true) + '&')
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
	};

	/**
	 * 生成hash值并放置如window.location.href
	 * @param  {string}   key      键
	 * @param  {string}   value    值
	 * @param  {Function} callback 回调函数
	 * @return {null}            返回值
	 */
	owner.setHash = function (key, value, callback) {

		var hashObj = getHash();

		if (typeof key === 'string') {
			callback = callback || function () {};

			hashObj[key] = value;

		} else if (typeof key === 'object') {
			callback = value || function () {};
			Object.keys(key).forEach(function (item) {
				hashObj[item] = key[item]
			})
		}

		var hashStr = '#';
		for (tkey in hashObj) {
			hashStr += (tkey + '=' + hashObj[tkey] + '&');
		};
		if (!!window.location.hash) {
			window.location.replace(window.location.href.replace(window.location.hash, hashStr.slice(0, -1)));
		} else {
			window.location.replace(window.location.href + hashStr.slice(0, -1))
		}

		callback();
	};

	/**
	 * 获取window.location.hash中特定值
	 * @param  {string} key 待获取的key
	 * @return {string}     获取到的值
	 */
	owner.getHash = function (key) {
		return getLocation('hash', key);
	}

}
