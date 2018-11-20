/**
 * 导航栏hash值监听反馈类
 * @param  {Object} obj 设置参数watch对象中应包含待监听的key
 * @return {null}     返回值
 */
Hasher = function (obj) {
	this.Init(obj);
};
Hasher.prototype = {
	$data: {},
	$watch: {},
	Init: function (obj) {
		var that = this;
		//url变化监听器
		this.$watch = obj.watch;

		var objData = obj.data || {};
		this.$data = mixin(this.getHash(), objData, true);

		this.initListener(this.$data);

		if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode >= 8)) {
			// 浏览器支持onhashchange事件
			window.onhashchange = function (e) {
				var change = that.hashWatcher(e);

				that.initListener(change.add);
				that.updateData(change.update);

				var deled = {};
				change.del.forEach(function (item) {
					deled[item] = '';
				});
				that.updateData(deled);
			};
		} else {
			throw new Error('您的浏览器不支持hash监听事件');
		};

		obj.mounted && obj.mounted.call(this);
	},
	/**
	 * 可返回的在导航中加入参数，类比history对象pushState方法
	 * @param  {string/Object} key   键或对象
	 * @param  {string} value 值
	 * @return {string}       新的地址值
	 */
	push: function (key, value) {
		var newHref = this.crearNewHref(key, value);

		window.location.href = (newHref);
		return newHref;
	},
	/**
	 * 不可返回的在导航中加入参数，类比history对象replaceState方法
	 * @param  {string/Object} key   键或对象
	 * @param  {string} value 值
	 * @return {string}       新的地址值
	 */
	replace: function (key, value) {
		var newHref = this.crearNewHref(key, value);

		window.location.replace(newHref);
		return newHref;
	},
	toHash: function (key, value, callback) {
		var hashObj = this.getHash();

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
			if (tkey == '$path')
				hashStr += (hashObj[tkey] + '&');
			else
				hashStr += (tkey + '=' + hashObj[tkey] + '&');
		};
		return hashStr.slice(0, -1);
	},
	crearNewHref: function (key, value) {
		var hash = this.toHash(key, value),
			href = window.location.href;

		if (!!window.location.hash) {
			return (href.replace(window.location.hash, hash));
		} else {
			return (href + hash);
		}

		return newHref;
	},
	getHash: function () {
		var hash = []
		try {
			hash = window.location.hash.split('#')[1].split("&");
		} catch (e) {}
		var hashObj = {};
		hash.forEach(function (item) {
			if (/=/.test(item))
				hashObj[item.split("=")[0]] = item.split("=")[1];
			else
				hashObj['$path'] = item;
		});
		return hashObj;
	},
	hashWatcher: function (e) {
		var that = this;
		var newHash = this.getHash();
		var update = {},
			add = {},
			del = [];

		Object.keys(newHash).forEach(function (key) {
			if (that.$data[key] === undefined && newHash[key] !== undefined) {
				add[key] = newHash[key];
			} else if (that.$data[key] != newHash[key]) {
				update[key] = {
					old: that.$data[key],
					new: newHash[key]
				}
			}
		});

		Object.keys(this.$data).forEach(function (key) {
			if (that.$data[key] !== undefined && newHash[key] === undefined) {
				del.push(key);
			}
		});

		return {
			update: update,
			add: add,
			del: del
		}
	},
	initListener: function (obj) {
		var that = this;
		Object.keys(obj).forEach(function (key) {
			Object.defineProperty(that, key, {
				get: function () {
					return that.$data[key];
				},
				set: function (e) {
					var oldVal = that.$data[key];
					that.$data[key] = e;
					if (!!that.$watch[key])
						that.$watch[key](e, oldVal);
				}
			})
		});
	},
	updateData: function (obj) {
		var that = this;
		Object.keys(obj).forEach(function (key) {
			that[key] = obj[key].new;
		})
	}
};
