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
	change: function(method, key, value) {
		var newHref = this.crearNewHref(key, value),
			switchObj = {
				push: function(newHref) {
					window.location.href = newHref;
				},
				replace: function(newHref) {
					window.location.replace(newHref)
				}
			}

		switchObj[method](newHref);

		if(value === this.$data[key]) {
			this.$watch[key] && this.$watch[key](value, this.$data[key]);
		};

		return newHref;
	},
	/**
	 * 可返回的在导航中加入参数，类比history对象pushState方法
	 * @param  {string/Object} key   键或对象
	 * @param  {string} value 值
	 * @return {string}       新的地址值
	 */
	push: function (key, value) {
		return this.change('push', key, value)
	},
	/**
	 * 不可返回的在导航中加入参数，类比history对象replaceState方法
	 * @param  {string/Object} key   键或对象
	 * @param  {string} value 值
	 * @return {string}       新的地址值
	 */
	replace: function (key, value) {
		return this.change('replace', key, value)
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
		var hash = [], hash_str = window.location.hash, handleType = 0;
		var hash_content = hash_str.split('#')[1], hash_search = '';

		if(/\?/.test(hash_str)) {
			handleType = 1;
			if(/^#[^\?=&!]+\?/g.test(hash_str)) {
				hash_search = hash_content;
			} else {
				var before = hash_content.split('?')[0];
				var after = hash_content.split('?')[1];
				hash = before.split('&');
				var last = hash.splice(-1, 1);

				hash_search = last + '?' + after;
			}
		} else {
			try {
				hash = hash_str.split('#')[1].split("&");
			} catch (e) {}
		}

		var hashObj = {};
		hash.forEach(function (item) {
			if (/=/.test(item))
				hashObj[item.split("=")[0]] = item.split("=")[1];
			else
				hashObj['$path'] = item;
		});

		if(handleType) {
			hashObj['$path'] = hash_search;
		}

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
