(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mainVue", [], factory);
	else if(typeof exports === 'object')
		exports["mainVue"] = factory();
	else
		root["mainVue"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @/lib/app */ "./src/lib/app.js")
__webpack_require__(/*! @/lib/Chain */ "./src/lib/Chain.js")
__webpack_require__(/*! @/lib/Hasher */ "./src/lib/Hasher.js")
__webpack_require__(/*! @/lib/Shade */ "./src/lib/Shade.js")
__webpack_require__(/*! @/lib/window */ "./src/lib/window.js")

__webpack_require__(/*! @/proto/Date */ "./src/proto/Date.js")
__webpack_require__(/*! @/proto/String */ "./src/proto/String.js")

var mainVue = __webpack_require__(/*! @/lib/mainVue */ "./src/lib/mainVue.js")

module.exports = mainVue


/***/ }),

/***/ "./src/lib/Chain.js":
/*!**************************!*\
  !*** ./src/lib/Chain.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 责任链类
 * @constructor
 */
window.Chain = function () {
	this.chain_arr = [];
}
window.Chain.prototype = {
	/**
	 * 链的内容
	 * @param  {function} fun 待执行函数，包含两个参数：通用参数及执行下一环节的函数
	 * @return {this}     返回自身，可链式调用
	 */
	link: function (fun) {
		var that = this;
		if (typeof (fun) == 'function') {
			this.chain_arr.push(fun);
		};
		return this;
	},
	/**
	 * 执行责任链
	 * @param  {Object} obj 责任链中的通用参数
	 * @return {null}     [description]
	 */
	run: function (obj) {
		var that = this,
			index = 0,
			obj = obj;

		var loop = function () {
			var this_node = that.chain_arr[index];
			index++;
			if (!!this_node) {
				return this_node(obj, loop)
			}
		};

		loop();
	}
};


/***/ }),

/***/ "./src/lib/Hasher.js":
/*!***************************!*\
  !*** ./src/lib/Hasher.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/lib/Shade.js":
/*!**************************!*\
  !*** ./src/lib/Shade.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 遮罩层类
 * @param       {Object} obj 设置
 * @constructor
 */
ShadeBox = function (obj) {
    this.init(obj);
};
ShadeBox.prototype = {
    el: null,
    animate: 300,
    lock: false,
    /**
     * 遮罩层构造函数，body末尾创造一个隐藏的全屏div
     * @param  {Object} obj 相关设置：{
     * style:遮罩层样式,
     * animate: 动画效果持续时间默认300ms,
     * lock: 显示遮罩时，是否锁定body禁止滚动,
     * innerHTML: 遮罩层内dom字符串}
     * @return {undefined}     无返回值
     */
    init: function (obj) {
        var body = document.body,
            cover = document.createElement('div'),
            defStyle = {
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 5000,
                display: 'none',
                transition: 'all',
                opacity: 0
            }
        this.lock = obj.lock;

        if (!!obj.animate) {
            var ani = obj.animate;
            if (/s/.test(ani)) {
                ani = Number(ani.split('s')[0]) * 1000;
            };
            this.animate = Number(ani);
        }
        defStyle.transition = 'all ' + (this.animate / 1000) + 's';

        mixin(obj.style, defStyle);
        Object.keys(defStyle).forEach(function (key) {
            cover.style[key] = defStyle[key];
        });

        cover.id = 'cover__div--' + getRandom(5);

        cover.innerHTML = obj.innerHTML || '';

        body.appendChild(cover);
        this.el = cover;
    },
    /**
     * 显示遮罩层
     * @return {undefined} 无返回值
     */
    show: function () {
        document.body.style.overflow = this.lock ? 'hidden' : '';
        this.el.style.display = 'block';
        this.el.style.opacity = 1;
    },
    /**
     * 隐藏遮罩层
     * @return {undefined} 无返回值
     */
    hide: function () {
        document.body.style.overflow = '';
        this.el.style.opacity = 0;
        setTimeout(function () {
            this.el.style.display = 'none';
        }.bind(this), this.animate);
    }
};


/***/ }),

/***/ "./src/lib/app.js":
/*!************************!*\
  !*** ./src/lib/app.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function(owner) {
    //验证是否为空
    owner.IsNullOrEmpty = function (val) {
        if (val != undefined && val != null && val != "") {
            return false;
        }
        return true;
    }

    owner.inAttr = function (val) {
    	if (val === true || val === 'true' || val === '') {
    		return true;
    	} else {
    		return false;
    	}
    }

    //清空对象内容
    owner.enpty_obj = function (obj) {
    	Object.keys(obj).map(function (key) {
    		obj[key] = null;
    	})
    	return obj;
    }

    //验证是否为数字
    owner.IsNumber = function (value) {
    	if (isNaN(value)) {
    		return 0;
    	}
    	return value;
    }

    //对象深拷贝
    owner.clone = function (obj) {
    	// Handle the 3 simple types, and null or undefined
    	if (null == obj || "object" != typeof obj) return obj;

    	// Handle Date
    	if (obj instanceof Date) {
    		var copy = new Date();
    		copy.setTime(obj.getTime());
    		return copy;
    	}

    	// Handle Array
    	if (obj instanceof Array) {
    		var copy = [];
    		for (var i = 0, len = obj.length; i < len; ++i) {
    			copy[i] = clone(obj[i]);
    		}
    		return copy;
    	}

    	// Handle Object
    	if (obj instanceof Object) {
    		var copy = {};
    		for (var attr in obj) {
    			if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    		}
    		return copy;
    	}

    	throw new Error("Unable to copy obj! Its type isn't supported.");
    }


    /*
    数组拼树
    targetArr目标数组
    parentKeyWord父级关键字
    selfKeyWord自身关键字
    */
    owner.arrBuildTree = function (targetArr, parentKeyWord, selfKeyWord) {
    	var arr_tree = [];

    	targetArr.forEach(function (item) {
    		item.children = [];
    	})
    	targetArr.forEach(function (item) {
    		if (!(item[parentKeyWord] === 0 || item[parentKeyWord] === '0')) {
    			var that = item;
    			targetArr.forEach(function (item) {
    				if (item[selfKeyWord] == that[parentKeyWord]) {
    					item.children.push(that);
    				}
    			})
    		} else {
    			arr_tree.push(item);
    		}
    	});
    	/*清除children为空的项*/
    	targetArr.forEach(function (item) {
    		if (item.children.length == 0) {
    			delete item.children
    		}
    	})
    	return arr_tree;
    }

    /**
     * 树结构拆数组
     * @param  {object|array} targetTree 树形结构对象或数组
     * @param  {string} childKey   子项索引key
     * @return {object}            返回的对象，array为拆分后的数组，depth为树的深度
     */
    owner.treeBreakArr = function (targetTree, childKey) {
    	var arr = [],
    		deep = 0,
    		childKey = childKey || 'children';

    	function deepLoop(tree, level) {
    		var depth = level + 1;
    		deep = (deep > level) ? deep : level;
    		tree.forEach(function (item) {
    			arr.push(item);
    			if (Array.isArray(item[childKey]) && item[childKey].length > 0) {
    				deepLoop(item[childKey], depth);
    			}
    		})
    	};

    	if (typeof targetTree == 'object' && Array.isArray(targetTree)) {
    		deepLoop(targetTree, 1);
    	} else if (typeof targetTree == 'object' && !Array.isArray(targetTree)) {
    		var a = [];
    		a.push(targetTree);
    		deepLoop(a, 1);
    	};

    	return {
    		array: arr,
    		depth: deep
    	};
    }

    /********
    接收地址栏参数
    key:参数名称
    **********/
    owner.getSearch = function (key) {
    	var hash = [];
    	try {
    		hash = window.location.search.split('?')[1].split("&");
    	} catch (e) {}
    	var hashObj = {};
    	hash.forEach(function (item) {
    		hashObj[item.split("=")[0]] = item.split("=")[1];
    	});
    	if (!!key)
    		return /%u/.test(hashObj[key]) ? unescape(hashObj[key]) : hashObj[key];
    	else
    		return hashObj;
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
    };

    /**
     * 生成hash值并放置如window.location.href
     * @param  {string}   key      键
     * @param  {string}   value    值
     * @param  {Function} callback 回调函数
     * @return {null}            返回值
     */
    owner.setHash = function (key, value, callback) {

    	var hash = [];
    	try {
    		hash = window.location.hash.split('#')[1].split("&");
    	} catch (e) {}
    	var hashObj = {};
    	$(hash).each(function () {
    		hashObj[this.split("=")[0]] = this.split("=")[1];
    	});

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
    	var hash = [];
    	try {
    		hash = window.location.hash.split('#')[1].split("&");
    	} catch (e) {}
    	var hashObj = {};
    	hash.forEach(function (item) {
    		hashObj[item.split("=")[0]] = item.split("=")[1];
    	});
    	if (!!key)
    		return hashObj[key];
    	else
    		return hashObj;
    }

    /**
     * 设置storage基方法
     * @param  {string} type sessionStorage或localStorage
     * @param  {string} key  要取的key
     * @return {string|Object}      对应存储的数据
     */
    function getStorage(type, key) {
    	var res = !!key ?
    		window[type][key] ?
    		((/{|}|%7B|%7D|\[|\]|%5B|%5D/.test(window[type][key]) ?
    			JSON.parse(unescape(window[type][key])) :
    			unescape(window[type][key]))) : undefined :
    		window[type];
    	return res || false;
    }
    /**
     * 获取storage基方法
     * @param {string} type  sessionStorage或localStorage
     * @param {string|object} key   要设置的key或整个对象
     * @param {Object} value 已设置的结果
     */
    function setStorage(type, key, value) {
    	if (typeof key === 'string') {
    		window[type][key] = (typeof value === 'object') ? escape(JSON.stringify(value)) : escape(value);
    	} else if (typeof key === 'object') {
    		Object.keys(key).forEach(function (item) {
    			window[type][item] = (typeof value === 'object') ? escape(JSON.stringify(key[item])) : escape(key[item]);
    		});
    	};
    	return window[type];
    }

    /**
     * 获取localStorage里的数据
     * @param  {string} key 待获取的key
     * @return {string|Object} 取回的值
     */
    owner.getLocal = function (key) {
    	return getStorage('localStorage', key);
    }

    /**
     * 将值存入localStorage
     * @param  {string|Object} key   待存值的key或json对象
     * @param  {string|object} value 待存值的value
     * @return {object}       存入后localStorage对象
     */
    owner.setLocal = function (key, value) {
    	return setStorage('localStorage', key, value);
    }

    /**
     * 获取sessionStorage里的数据
     * @param  {string} key 待获取的key
     * @return {string|Object} 取回的值
     */
    owner.getSession = function (key) {
    	return getStorage('sessionStorage', key);
    }

    /**
     * 将值存入sessionStorage
     * @param  {string|Object} key   待存值的key或json对象
     * @param  {string|object} value 待存值的value
     * @return {object}       存入后sessionStorage对象
     */
    owner.setSession = function (key, value) {
    	return setStorage('sessionStorage', key, value);
    }

    /**
     * 在目标ref上生成一个随机id
     * @param  {obj} ref vue的一个ref实例
     * @return {string}     生成的随机id
     */
    owner.setRandomId = function (ref) {
    	var target = this.$refs[ref],
    		random = (Math.random() * 100000 + '').slice(0, 5);

    	var randomId = ref + '-' + random;
    	target.setAttribute('id', randomId);

    	return randomId;
    }

    /*格式化排序顺序关键字*/
    owner.sortorder = function (str) {
    	try {
    		if (str.indexOf('asc') > -1) {
    			return 'asc'
    		} else if (str.indexOf('desc') > -1) {
    			return 'desc'
    		}
    	} catch (e) {
    		return str
    	}
    }

    //获取fileguid
    owner.GetGuid = function () {
    	var guid = "";
    	$.ajaxSetup({
    		async: false
    	});
    	this.$get(sysUrl + "/sysfile/getguid", {}, function (data, res) {
    		guid = data;
    	})
    	$.ajaxSetup({
    		async: true
    	});
    	return guid;
    }

    owner.getObjByValue = function (obj) {
    	var res = null;
    	var arr = obj.arr,
    		target = obj.target,
    		key = obj.key || 'key',
    		value = obj.value || 'value',
    		mapkey = obj.mapkey || key,
    		mapvalue = obj.mapvalue || value,
    		add = obj.add || false

    	var arrMap = {};

    	if (typeof (obj.target) == 'string') {
    		arr.forEach(function (item) {
    			arrMap[escape(item[value])] = item;
    		});

    		res = {};
    		if (add) {
    			res = clone(arrMap[escape(target)]);
    		};
    		res[mapkey] = arrMap[escape(target)][key];
    		res[mapvalue] = target;
    	} else if ((typeof (obj.target) == 'object') && Array.isArray(obj.target)) {
    		res = [];
    		arr.forEach(function (item) {
    			arrMap[escape(item[value])] = item;
    		});

    		target.forEach(function (item) {
    			res.push(arrMap[escape(item)])
    		})
    	}

    	return res;
    }

    /**
     * 切分yyyy-MM-dd hh:mm:ss格式的字符串成yyyy-MM-dd格式
     * @param  {string} time 时间格式字符串
     * @return {string}      日期格式字符串
     */
    owner.timeToDate = function (time) {
    	if (/ /.test(time)) {
    		return time.split(' ')[0];
    	} else {
    		return time
    	}
    }

    /**
     * 生成某长度随机数字符串
     * @param  {Number} length 随机字符串长度
     * @return {string}        随机数字符串
     */
    owner.getRandom = function (length) {
    	var random = Math.random() + '';
    	return random.slice(2, length + 2);
    }

    /**
     * 生成当前时间戳
     * @return {string} 生成的时间戳
     */
    owner.getTimeStrmp = function () {
    	return (new Date()).getTime();
    }

    /**
     * 小数转百分数字符串
     * @param  {Number} num    小数
     * @param  {number} length 生成百分比的小数点后位数
     * @param  {boolean} range 是否将结果限制在0-100%
     * @return {string}        百分比字符串
     */
    owner.floatToPercent = function (num, length, range) {
    	var calc = (Number(num) * 100);
    	if (calc > 100 && !!range) calc = 100;
    	return calc.toFixed(length) + '%';
    }

    owner.wxPay = function (obj, callback, errcallback) {
    	//调起支付
    	WeixinJSBridge.invoke('getBrandWCPayRequest', {
    		"appId": obj.appId,
    		"timeStamp": obj.timeStamp,
    		"nonceStr": obj.nonceStr,
    		"package": obj.package,
    		"signType": "MD5",
    		"paySign": obj.paySign
    	}, function (res) {
    		//支付成功
    		if (res.err_msg == "get_brand_wcpay_request:ok") {
    			alert("支付成功");
    			!!callback && callback();
    		} else if (res.err_msg == "get_brand_wcpay_request:fail") {
    			alert("支付失败，请重试");
    			!!errcallback && errcallback();
    		} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
    			alert("用户取消支付");
    			!!errcallback && errcallback();
    		} else {
    			alert(res.err_msg);
    			!!errcallback && errcallback();
    		};
    	});
    }

    /**
     * 下载功能
     * @param  {string} path 附件服务器完整地址
     * @return {Boolean}      结果
     */
    owner.downloader = function (path) {
    	var eleA = document.createElement('a');
    	if ('download' in eleA) {
    		eleA.setAttribute('download', path);
    		eleA.setAttribute('href', path);

    		eleA.innerHTML = 'downloading';

    		document.body.appendChild(eleA);

    		setTimeout(function () {
    			eleA.click();
    			document.body.removeChild(eleA);
    		}, 1000 / 24);
    		return true;
    	};

    	try {
    		var elemIF = document.createElement("iframe");
    		elemIF.style.display = "none";
    		document.body.appendChild(elemIF);
    		elemIF.src = path;
    		setTimeout(function () {
    			document.body.removeChild(elemIF);
    		}, 333);
    		return true;
    	} catch (e) {
    		var form = document.createElement('form');
    		form.setAttribute('method', 'get');
    		form.setAttribute('action', path);
    		document.body.appendChild(form);
    		setTimeout(function () {
    			form.submit();
    			document.body.removeChild(form);
    		}, 1000 / 24);
    		return true;
    	}

    	if (!window.open(url)) { // popup blocked, offer direct download:
    		if (confirm("请使用右键-另存为进行下载，完成后点击后退返回当前页面")) {
    			location.href = url;
    		}
    	}
    	return true;
    }

    /**
     * 图片转base64编码
     * @param  {string}   url          文件存储路径
     * @param  {Function} callback     回调函数
     * @param  {string}   outputFormat 图片编码类型
     * @return {null}                返回值
     */
    owner.imgToBase64 = function (url, callback, outputFormat) {
    	var canvas = document.createElement('CANVAS'),
    		ctx = canvas.getContext('2d'),
    		img = new Image;
    	img.crossOrigin = 'Anonymous';
    	img.onload = function () {
    		canvas.height = img.height;
    		canvas.width = img.width;
    		ctx.drawImage(img, 0, 0);
    		var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    		callback.call(this, dataURL);
    		canvas = null;
    	};
    	img.src = url;
    }

    /**
     * 原型链继承
     * @param  {Function} subType   子类
     * @param  {function} superType 父类
     * @return {null}           返回值
     */
    owner.inheritPrototype = function (subType, superType) {
    	var protoType = Object.create(superType.prototype);
    	// Object.crear = function(superType) {
    	// 		var F = function() {};
    	// 		F.prototype = superType;
    	// 		return new F();
    	// }
    	protoType.constructor = subType;
    	subType.prototype = protoType;
    }

    /**
     * 异步加载js
     * @param  {string} src js文件路径
     * @return {Boolean}     加载结果
     */
    owner.loadScript = function (src) {
    	if (!src) {
    		throw new Error('请指定要加载的js文件路径');
    		return false;
    	};
    	var s = document.createElement('script');
    	s.type = 'text/javascript';
    	s.async = true;
    	s.src = src;
    	var x = document.getElementsByTagName('script')[0];
    	x.parentNode.insertBefore(s, x);
    	return true;
    }

    /**
     * 数字转中文金额
     * @param  {number|string} n 数字金额
     * @return {string}     转换后的中文金额
     */
    owner.Arabia_to_Chinese = function (n) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
        var head = n < 0 ? '欠': '';
        n = Math.abs(n);

        var s = '';

        for (var i = 0; i < fraction.length; i++)
        {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);

        for (var i = 0; i < unit[0].length && n > 0; i++)
        {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++)
            {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    }

    /**
     * 遍历型对象混入，将obj混入target
     * @param  {Object} obj    待混入的对象
     * @param  {Object} target 混入目标对象
     * @param  {Boolean} state  是否覆盖混入
     * @return {object}        混入后的对象
     */
    owner.mixin = function (obj, target, state) {
    	Object.keys(obj).forEach(function (key) {
    		if (state) {
    			target[key] = obj[key];
    		} else {
    			if (!target[key])
    				target[key] = obj[key];
    		}
    	});
    	return target;
    }
})(window)


/***/ }),

/***/ "./src/lib/mainVue.js":
/*!****************************!*\
  !*** ./src/lib/mainVue.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function(factory) {
    if(!window.Vue) {
        console.error('无法找到Vue对象');
        return;
    }
    if(!window.$) {
        console.error('无法找到$对象');
        return;
    }
    factory();
})(function() {
    //工具组件bus
	window.$bus = new Vue({

	});

	Vue.prototype.$get = function (a, b, c, d) {
		var url, data, callback, fztype;

		url = a;
		data = '';
		callback = callback || function () {};
		fztype = false;

		if (arguments.length == 2 && typeof (b) == 'function') {
			callback = b;
		} else if (arguments.length == 2 && typeof (b) != 'function') {
			data = b;
		} else if (arguments.length == 3) {
			if (typeof (arguments[arguments.length - 1]) == 'boolean') {
				data = b;
				fztype = c;
			} else {
				data = b;
				callback = c;
			}
		} else if (arguments.length == 4) {
			data = b;
			callback = c;
			fztype = d;
		}

		AjaxRequest.call(this, {
			url: url,
			data: data,
			type: 'get',
			callback: function (data, res) {
				callback.call(this, data, res)
			}.bind(this),
			fztype: fztype
		})
	}

	Vue.prototype.$post = function (a, b, c, d) {
		var url, data, callback, fztype;

		url = a;
		data = '';
		callback = callback || function () {};
		fztype = false;

		if (arguments.length == 2 && typeof (b) == 'function') {
			callback = b;
		} else if (arguments.length == 2 && typeof (b) != 'function') {
			data = b;
		} else if (arguments.length == 3) {
			if (typeof (arguments[arguments.length - 1]) == 'boolean') {
				data = b;
				fztype = c;
			} else {
				data = b;
				callback = c;
			}
		} else if (arguments.length == 4) {
			data = b;
			callback = c;
			fztype = d;
		}

		AjaxRequest.call(this, {
			url: url,
			data: data,
			type: 'post',
			callback: function (data, res) {
				callback.call(this, data, res)
			}.bind(this),
			fztype: fztype
		})
	}

    /***************************************
	 ***发送ajax请求
	 *** url 请求url//a
	 *** data 提交数据//b
	 *** type 请求类型//c
	 ****** callback 请求成功回调//c\d
	 *fztype 是否复杂回调
	 ***************************************/
	function AjaxRequest(settings) {
		try {
			$vue.loadingController = true;
		} catch (e) {}

		var c_data = clone(settings.data);

		c_data = !!settings.fztype ? JSON.stringify(c_data) : c_data;
		var contentType = !!settings.fztype ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8';
		var callback = settings.callback || function () {}

		$.ajax({
			url: /\?/.test(settings.url) ? settings.url + '&random=' + getTimeStrmp() : settings.url + '?random=' + getTimeStrmp(),
			type: settings.type || 'get',
			data: c_data,
			contentType: contentType,
			headers: {
				pageuser: getSession('user') ? getSession('user').userid : ''
			},
			success: function (data) {

				var obj = (typeof (data) == 'string' && /{|}/.test(data)) ? JSON.parse(data) : data;
				try {
					$vue.loadingController = false;
				} catch (e) {}

				//反编码
				function decode(target) {
					if (typeof target == 'object' && Array.isArray(target)) {
						target.forEach(function (item) {
							if (typeof item == 'string') item = decode(item);
							else decode(item);
						});
					} else if (typeof target == 'object' && !!target) {
						Object.keys(target).forEach(function (key) {
							if (typeof target[key] == 'string') target[key] = decode(target[key]);
							else decode(target[key]);
						});
					} else if (typeof target == 'string') {
						return target.html();
					}
				}
				decode(obj);


				ajaxResCheck.call(this, obj, settings, callback);
			},
			//AJAX请求结束后，
			complete: function (xhr, status) {
				try {
					if (xhr.responseJSON.result == "login-index") {
						if (window.parent != window) {
							window.top.location.href = htmlUrl + "/login.html";
						} else {
							location.href = htmlUrl + "/login.html";
						}
					}
				} catch (e) {
					// TODO: handle exception
				}
			},
			error: function (error) {
				console.error('ajax-error:' + settings.url, error)
			}
		})
	}

    //创建mainVue
	function mainVue(option) {
		window.$vue = null;

		if (!!option) {
			this.init(option);
		}
	}

	mainVue.prototype = {
		data: {},
		methods: {},
		computed: {},
		watch: {},
		created: function () {},
		mounted: function () {},

		init: function (obj) {
			var object = !!obj ? obj : this;

			if (!!obj) {
				object.mounted = object.mounted || function () {};
				object.created = object.created || function () {};
			}

			new Vue({
				el: "#main_con",
				data: function () {
					return object.data
				},
				computed: object.computed,
				watch: object.watch,
				methods: object.methods,
				mounted: function () {
					window.$vue = this;
					object.mounted.call(this);
				},
				created: function () {
					window.$vue = this;
					formValidateTrans();

					this.loadingController = this.loadingController || false;
					this.dialogVisible = this.dialogVisible || false;
					this.searchKey = this.searchKey || '';
					this.tableData = this.tableData || [];

					object.created.call(this);
				}
			});
		},

		getdata: function (a, b, c, d) {
			if (arguments.length <= 3) {
				var a_url = a,
					a_data_obj = b,
					success_callback = c || function () {};
				(function (a1, b1, c1) {
					AjaxRequest(a1, b1, "get", function (data, res) {
						c1(data, res);
					})
				})(a_url, a_data_obj, success_callback)
			} else if (arguments.length == 4) {
				var a_url = a,
					a_data_obj = b,
					a_type = c,
					success_callback = d || function () {};
				(function (a1, b1, c1, d1) {
					AjaxRequest(a1, b1, c1, function (data, res) {
						d1(data, res);
					})
				})(a_url, a_data_obj, a_type, success_callback)
			};
		}
	};

    /**
	 * 验证属性是否存在，为true或''
	 * @param  {str}  target 待验证目标
	 * @return {Boolean}        返回值，存在未true，反之false
	 */
	function isExist(target) {
		if (target != null && target != undefined && target != 'false') {
			return true;
		} else {
			return false;
		}
	}

	//表单验证预处理
	function formValidateTrans() {

		var nodeList = document.querySelectorAll('el-form-item'),
			typeArr = ['string', 'number', 'boolean', 'method', 'regexp', 'integer', 'float', 'array', 'object', 'enum', 'date', 'url', 'hex', 'email'];
			typeMap = ['字符串', '数字', '布尔', 'method', '正则', 'integer', '浮点数', '数组', '对象', 'enum', '日期', 'url地址', '哈希', '电子邮件'];

		for (var i = 0; i < nodeList.length; i++) {
			var rules = [],
				mobileValStr = '';

			if (isExist(nodeList[i].getAttribute('required'))) {
				var trigger = ['blur']
				if (isExist(nodeList[i].getAttribute('change'))) {
					trigger.push("change");
				}
				rules.push({
					'required': 'true',
					'message': '请输入' + nodeList[i].getAttribute('label'),
					'trigger': trigger
				})
				nodeList[i].removeAttribute('required');
				nodeList[i].removeAttribute('change');
			}

			if (isExist(nodeList[i].getAttribute('min'))) {
				rules.push({
					'min': parseInt(nodeList[i].getAttribute('min')),
					'message': '至少输入' + nodeList[i].getAttribute('min') + '个字符',
					'trigger': 'blur'
				})
				nodeList[i].removeAttribute('min');
			}

			if (isExist(nodeList[i].getAttribute('max'))) {
				rules.push({
					'max': parseInt(nodeList[i].getAttribute('max')),
					'message': '至多输入' + nodeList[i].getAttribute('max') + '个字符',
					'trigger': 'blur'
				})
				nodeList[i].removeAttribute('max');
			}

			if (isExist(nodeList[i].getAttribute('mobile'))) {
				mobileValStr = '{ "validator":validatorObj.mobile,"trigger": ["blur", "change"]}';
				nodeList[i].removeAttribute('mobile');
			}
			if (isExist(nodeList[i].getAttribute('arrayvalue'))) {
				mobileValStr = '{ "validator":validatorObj.arrayvalue,"trigger": ["blur", "change"]}';
				nodeList[i].removeAttribute('arrayvalue');
			}

			for (var j = 0; j < typeArr.length; j++) {
				if (nodeList[i].getAttribute(typeArr[j]) != null && nodeList[i].getAttribute(typeArr[j]) != undefined && nodeList[i].getAttribute(typeArr[j]) != 'false') {
					rules.push({
						'type': typeArr[j],
						'message': '请输入正确的' + typeMap[j] + '格式',
						'trigger': ['blur', 'change']
					})
				}
			}



			var oldRules = nodeList[i].getAttribute(':rules') || '[]',
				slicedRules = JSON.stringify(rules).slice(1, -1);

			function dotBuilder(str) {
				return !!str ? ',' : ''
			}

			var newRulesStr = '[' + slicedRules + dotBuilder(slicedRules) + mobileValStr + dotBuilder(mobileValStr) + oldRules.slice(1, -1) + ']';
			newRulesStr = newRulesStr.replace(/"/g, "'");
			nodeList[i].setAttribute(':rules', newRulesStr);

		}
	}

    module.exports = mainVue;
})


/***/ }),

/***/ "./src/lib/window.js":
/*!***************************!*\
  !*** ./src/lib/window.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * ajax code查询
 * @param  {Object}   obj      返回的对象
 * @param  {Object}   settings 接口相关测试（非必须）
 * @param  {Function} callback 回调函数
 * @return {null}            [description]
 */
window.ajaxResCheck = function (obj, settings, callback) {
	var callback = callback;
	if (arguments.length == 2) {
		callback = settings;
	}

	var switchObj = {
		'v': function () {
			!!callback && callback(obj.tdata, obj);
		},
		'pglist': function () {
			!!callback && callback(obj);
		},
		'valerror': function () {
			if (!IsNullOrEmpty(obj.msg)) {
				ShowMsgBox(obj.msg, "error");
			};
		},
		'login-index': function () {
			ShowMsgBox(obj.msg, 'error', function () {
				var company = getSession('company'),
					user = getSession('user');
				sessionStorage.clear();
				if (!company) {
					if (user.userid == '1') {
						window.top.location.href = (htmlUrl + "/platlogin.html");
						return;
					}
					window.top.location.href = (htmlUrl + "/login.html");
				} else {
					window.top.location.href = ('/' + company + "/login");
				}
			});
		},
		'jump-url': function () {
			ShowMsgBox(obj.msg, 'info', function () {
				window.top.location.href = (htmlUrl + obj.url);
			});
		}
	}

	return !!switchObj[obj.code] ? switchObj[obj.code]() : (/^(throw-)/.test(obj.code) ? (function(){
		obj.code = obj.code.split('throw-')[1];
		callback && callback(obj);
	}()) : ShowMsgBox(obj.msg, 'error', function () {
		throw new Error(JSON.stringify(settings));
	}));

}

/******************
 *** Notification 消息通知
 *** msg 提示信息
 *** type 消息类型
 ******************/
window.ShowMsg = function (msg, type, callback) {
	callback = callback || function () {};
	window.top.$vue.$notify({
		message: msg,
		type: type || "warning",
		onClose: callback
	});
	//$message({ showClose: true, message: msg, type: type || "warning", duration: 1500 });
}

/**
 * confirm确认选择框
 * @param  {string} msg  提示信息
 * @param  {string} type 提示类型
 * @param  {function} cb1  确认回调
 * @param  {Function} cb2  取消回调
 * @return {null}      无返回值
 */
window.ShowConfirm = function (msg, type, cb1, cb2) {
	cb1 = cb1 || function () {};
	cb2 = cb2 || function () {};
	window.top.$vue.$confirm(msg, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: type || 'warning',
		showClose: false,
		callback: function (action, instance) {
			if (action == 'confirm') {
				cb1();
			} else {
				cb2();
			}
		}
	})
}


/***/ }),

/***/ "./src/proto/Date.js":
/*!***************************!*\
  !*** ./src/proto/Date.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
使用：(eval(value.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))).pattern("yyyy-M-d h:m:s.S");
 */
window.Date.prototype.pattern = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

window.Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


/***/ }),

/***/ "./src/proto/String.js":
/*!*****************************!*\
  !*** ./src/proto/String.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 特殊字符转义及反转义
 * @param  {Boolean} encode 类型true为转义false为反转义
 * @return {string}        结果字符串
 */
window.String.prototype.html = function (encode) {
	var replace = ["&#39;", "'",
		"&quot;", '"',
		"&nbsp;", " ",
		"&gt;", ">",
		"&lt;", "<",
		"&amp;", "&",
		"&yen;", "¥",
		"&lsquo;", "‘",
		"&rsquo;", "’",
		"&hellip;", "…",
		"&ldquo;", "“",
		"&rdquo;", "”",
		"&mdash;", "—"
	];
	if (encode) {
		replace.reverse();
	}
	for (var i = 0, str = this; i < replace.length; i += 2) {
		str = str.replace(new RegExp(replace[i], 'g'), replace[i + 1]);
	}
	return str;
};


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWluVnVlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9tYWluVnVlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haW5WdWUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpblZ1ZS8uL3NyYy9saWIvQ2hhaW4uanMiLCJ3ZWJwYWNrOi8vbWFpblZ1ZS8uL3NyYy9saWIvSGFzaGVyLmpzIiwid2VicGFjazovL21haW5WdWUvLi9zcmMvbGliL1NoYWRlLmpzIiwid2VicGFjazovL21haW5WdWUvLi9zcmMvbGliL2FwcC5qcyIsIndlYnBhY2s6Ly9tYWluVnVlLy4vc3JjL2xpYi9tYWluVnVlLmpzIiwid2VicGFjazovL21haW5WdWUvLi9zcmMvbGliL3dpbmRvdy5qcyIsIndlYnBhY2s6Ly9tYWluVnVlLy4vc3JjL3Byb3RvL0RhdGUuanMiLCJ3ZWJwYWNrOi8vbWFpblZ1ZS8uL3NyYy9wcm90by9TdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsYUFBYTtBQUM3QixnQkFBZ0IsT0FBTztBQUN2QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QU87QUFDUCxPQUFPO0FBQ1AsUUFBUTtBQUNSLFFBQVE7QUFDUixVQUFVO0FBQ1YsVUFBVTtBQUNWLFdBQVc7QUFDWCxVQUFVO0FBQ1YsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiemhfYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJtYWluVnVlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm1haW5WdWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibWFpblZ1ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJyZXF1aXJlKCdAL2xpYi9hcHAnKVxyXG5yZXF1aXJlKCdAL2xpYi9DaGFpbicpXHJcbnJlcXVpcmUoJ0AvbGliL0hhc2hlcicpXHJcbnJlcXVpcmUoJ0AvbGliL1NoYWRlJylcclxucmVxdWlyZSgnQC9saWIvd2luZG93JylcclxuXHJcbnJlcXVpcmUoJ0AvcHJvdG8vRGF0ZScpXHJcbnJlcXVpcmUoJ0AvcHJvdG8vU3RyaW5nJylcclxuXHJcbnZhciBtYWluVnVlID0gcmVxdWlyZSgnQC9saWIvbWFpblZ1ZScpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1haW5WdWVcclxuIiwiLyoqXHJcbiAqIOi0o+S7u+mTvuexu1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbndpbmRvdy5DaGFpbiA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLmNoYWluX2FyciA9IFtdO1xyXG59XHJcbndpbmRvdy5DaGFpbi5wcm90b3R5cGUgPSB7XHJcblx0LyoqXHJcblx0ICog6ZO+55qE5YaF5a65XHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259IGZ1biDlvoXmiafooYzlh73mlbDvvIzljIXlkKvkuKTkuKrlj4LmlbDvvJrpgJrnlKjlj4LmlbDlj4rmiafooYzkuIvkuIDnjq/oioLnmoTlh73mlbBcclxuXHQgKiBAcmV0dXJuIHt0aGlzfSAgICAg6L+U5Zue6Ieq6Lqr77yM5Y+v6ZO+5byP6LCD55SoXHJcblx0ICovXHJcblx0bGluazogZnVuY3Rpb24gKGZ1bikge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0aWYgKHR5cGVvZiAoZnVuKSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRoaXMuY2hhaW5fYXJyLnB1c2goZnVuKTtcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cdC8qKlxyXG5cdCAqIOaJp+ihjOi0o+S7u+mTvlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gb2JqIOi0o+S7u+mTvuS4reeahOmAmueUqOWPguaVsFxyXG5cdCAqIEByZXR1cm4ge251bGx9ICAgICBbZGVzY3JpcHRpb25dXHJcblx0ICovXHJcblx0cnVuOiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXMsXHJcblx0XHRcdGluZGV4ID0gMCxcclxuXHRcdFx0b2JqID0gb2JqO1xyXG5cclxuXHRcdHZhciBsb29wID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgdGhpc19ub2RlID0gdGhhdC5jaGFpbl9hcnJbaW5kZXhdO1xyXG5cdFx0XHRpbmRleCsrO1xyXG5cdFx0XHRpZiAoISF0aGlzX25vZGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpc19ub2RlKG9iaiwgbG9vcClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRsb29wKCk7XHJcblx0fVxyXG59O1xyXG4iLCIvKipcclxuICog5a+86Iiq5qCPaGFzaOWAvOebkeWQrOWPjemmiOexu1xyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iaiDorr7nva7lj4LmlbB3YXRjaOWvueixoeS4reW6lOWMheWQq+W+heebkeWQrOeahGtleVxyXG4gKiBAcmV0dXJuIHtudWxsfSAgICAg6L+U5Zue5YC8XHJcbiAqL1xyXG5IYXNoZXIgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0dGhpcy5Jbml0KG9iaik7XHJcbn07XHJcbkhhc2hlci5wcm90b3R5cGUgPSB7XHJcblx0JGRhdGE6IHt9LFxyXG5cdCR3YXRjaDoge30sXHJcblx0SW5pdDogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0Ly91cmzlj5jljJbnm5HlkKzlmahcclxuXHRcdHRoaXMuJHdhdGNoID0gb2JqLndhdGNoO1xyXG5cclxuXHRcdHZhciBvYmpEYXRhID0gb2JqLmRhdGEgfHwge307XHJcblx0XHR0aGlzLiRkYXRhID0gbWl4aW4odGhpcy5nZXRIYXNoKCksIG9iakRhdGEsIHRydWUpO1xyXG5cclxuXHRcdHRoaXMuaW5pdExpc3RlbmVyKHRoaXMuJGRhdGEpO1xyXG5cclxuXHRcdGlmICgoJ29uaGFzaGNoYW5nZScgaW4gd2luZG93KSAmJiAoKHR5cGVvZiBkb2N1bWVudC5kb2N1bWVudE1vZGUgPT09ICd1bmRlZmluZWQnKSB8fCBkb2N1bWVudC5kb2N1bWVudE1vZGUgPj0gOCkpIHtcclxuXHRcdFx0Ly8g5rWP6KeI5Zmo5pSv5oyBb25oYXNoY2hhbmdl5LqL5Lu2XHJcblx0XHRcdHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdHZhciBjaGFuZ2UgPSB0aGF0Lmhhc2hXYXRjaGVyKGUpO1xyXG5cclxuXHRcdFx0XHR0aGF0LmluaXRMaXN0ZW5lcihjaGFuZ2UuYWRkKTtcclxuXHRcdFx0XHR0aGF0LnVwZGF0ZURhdGEoY2hhbmdlLnVwZGF0ZSk7XHJcblxyXG5cdFx0XHRcdHZhciBkZWxlZCA9IHt9O1xyXG5cdFx0XHRcdGNoYW5nZS5kZWwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdFx0ZGVsZWRbaXRlbV0gPSAnJztcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGF0LnVwZGF0ZURhdGEoZGVsZWQpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCfmgqjnmoTmtY/op4jlmajkuI3mlK/mjIFoYXNo55uR5ZCs5LqL5Lu2Jyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG9iai5tb3VudGVkICYmIG9iai5tb3VudGVkLmNhbGwodGhpcyk7XHJcblx0fSxcclxuXHQvKipcclxuXHQgKiDlj6/ov5Tlm57nmoTlnKjlr7zoiKrkuK3liqDlhaXlj4LmlbDvvIznsbvmr5RoaXN0b3J55a+56LGhcHVzaFN0YXRl5pa55rOVXHJcblx0ICogQHBhcmFtICB7c3RyaW5nL09iamVjdH0ga2V5ICAg6ZSu5oiW5a+56LGhXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSDlgLxcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgIOaWsOeahOWcsOWdgOWAvFxyXG5cdCAqL1xyXG5cdHB1c2g6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHR2YXIgbmV3SHJlZiA9IHRoaXMuY3JlYXJOZXdIcmVmKGtleSwgdmFsdWUpO1xyXG5cclxuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKG5ld0hyZWYpO1xyXG5cdFx0cmV0dXJuIG5ld0hyZWY7XHJcblx0fSxcclxuXHQvKipcclxuXHQgKiDkuI3lj6/ov5Tlm57nmoTlnKjlr7zoiKrkuK3liqDlhaXlj4LmlbDvvIznsbvmr5RoaXN0b3J55a+56LGhcmVwbGFjZVN0YXRl5pa55rOVXHJcblx0ICogQHBhcmFtICB7c3RyaW5nL09iamVjdH0ga2V5ICAg6ZSu5oiW5a+56LGhXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSDlgLxcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgIOaWsOeahOWcsOWdgOWAvFxyXG5cdCAqL1xyXG5cdHJlcGxhY2U6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHR2YXIgbmV3SHJlZiA9IHRoaXMuY3JlYXJOZXdIcmVmKGtleSwgdmFsdWUpO1xyXG5cclxuXHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKG5ld0hyZWYpO1xyXG5cdFx0cmV0dXJuIG5ld0hyZWY7XHJcblx0fSxcclxuXHR0b0hhc2g6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBjYWxsYmFjaykge1xyXG5cdFx0dmFyIGhhc2hPYmogPSB0aGlzLmdldEhhc2goKTtcclxuXHJcblx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcclxuXHJcblx0XHRcdGhhc2hPYmpba2V5XSA9IHZhbHVlO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Y2FsbGJhY2sgPSB2YWx1ZSB8fCBmdW5jdGlvbiAoKSB7fTtcclxuXHRcdFx0T2JqZWN0LmtleXMoa2V5KS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0aGFzaE9ialtpdGVtXSA9IGtleVtpdGVtXVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBoYXNoU3RyID0gJyMnO1xyXG5cdFx0Zm9yICh0a2V5IGluIGhhc2hPYmopIHtcclxuXHRcdFx0aWYgKHRrZXkgPT0gJyRwYXRoJylcclxuXHRcdFx0XHRoYXNoU3RyICs9IChoYXNoT2JqW3RrZXldICsgJyYnKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGhhc2hTdHIgKz0gKHRrZXkgKyAnPScgKyBoYXNoT2JqW3RrZXldICsgJyYnKTtcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gaGFzaFN0ci5zbGljZSgwLCAtMSk7XHJcblx0fSxcclxuXHRjcmVhck5ld0hyZWY6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHR2YXIgaGFzaCA9IHRoaXMudG9IYXNoKGtleSwgdmFsdWUpLFxyXG5cdFx0XHRocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG5cdFx0aWYgKCEhd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuXHRcdFx0cmV0dXJuIChocmVmLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLmhhc2gsIGhhc2gpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiAoaHJlZiArIGhhc2gpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXdIcmVmO1xyXG5cdH0sXHJcblx0Z2V0SGFzaDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGhhc2ggPSBbXVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KCcjJylbMV0uc3BsaXQoXCImXCIpO1xyXG5cdFx0fSBjYXRjaCAoZSkge31cclxuXHRcdHZhciBoYXNoT2JqID0ge307XHJcblx0XHRoYXNoLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0aWYgKC89Ly50ZXN0KGl0ZW0pKVxyXG5cdFx0XHRcdGhhc2hPYmpbaXRlbS5zcGxpdChcIj1cIilbMF1dID0gaXRlbS5zcGxpdChcIj1cIilbMV07XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRoYXNoT2JqWyckcGF0aCddID0gaXRlbTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGhhc2hPYmo7XHJcblx0fSxcclxuXHRoYXNoV2F0Y2hlcjogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdHZhciBuZXdIYXNoID0gdGhpcy5nZXRIYXNoKCk7XHJcblx0XHR2YXIgdXBkYXRlID0ge30sXHJcblx0XHRcdGFkZCA9IHt9LFxyXG5cdFx0XHRkZWwgPSBbXTtcclxuXHJcblx0XHRPYmplY3Qua2V5cyhuZXdIYXNoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdFx0aWYgKHRoYXQuJGRhdGFba2V5XSA9PT0gdW5kZWZpbmVkICYmIG5ld0hhc2hba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0YWRkW2tleV0gPSBuZXdIYXNoW2tleV07XHJcblx0XHRcdH0gZWxzZSBpZiAodGhhdC4kZGF0YVtrZXldICE9IG5ld0hhc2hba2V5XSkge1xyXG5cdFx0XHRcdHVwZGF0ZVtrZXldID0ge1xyXG5cdFx0XHRcdFx0b2xkOiB0aGF0LiRkYXRhW2tleV0sXHJcblx0XHRcdFx0XHRuZXc6IG5ld0hhc2hba2V5XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0T2JqZWN0LmtleXModGhpcy4kZGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRcdGlmICh0aGF0LiRkYXRhW2tleV0gIT09IHVuZGVmaW5lZCAmJiBuZXdIYXNoW2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGRlbC5wdXNoKGtleSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHVwZGF0ZTogdXBkYXRlLFxyXG5cdFx0XHRhZGQ6IGFkZCxcclxuXHRcdFx0ZGVsOiBkZWxcclxuXHRcdH1cclxuXHR9LFxyXG5cdGluaXRMaXN0ZW5lcjogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoYXQsIGtleSwge1xyXG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoYXQuJGRhdGFba2V5XTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHNldDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdHZhciBvbGRWYWwgPSB0aGF0LiRkYXRhW2tleV07XHJcblx0XHRcdFx0XHR0aGF0LiRkYXRhW2tleV0gPSBlO1xyXG5cdFx0XHRcdFx0aWYgKCEhdGhhdC4kd2F0Y2hba2V5XSlcclxuXHRcdFx0XHRcdFx0dGhhdC4kd2F0Y2hba2V5XShlLCBvbGRWYWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlRGF0YTogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdFx0dGhhdFtrZXldID0gb2JqW2tleV0ubmV3O1xyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcbiIsIi8qKlxyXG4gKiDpga7nvanlsYLnsbtcclxuICogQHBhcmFtICAgICAgIHtPYmplY3R9IG9iaiDorr7nva5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5TaGFkZUJveCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHRoaXMuaW5pdChvYmopO1xyXG59O1xyXG5TaGFkZUJveC5wcm90b3R5cGUgPSB7XHJcbiAgICBlbDogbnVsbCxcclxuICAgIGFuaW1hdGU6IDMwMCxcclxuICAgIGxvY2s6IGZhbHNlLFxyXG4gICAgLyoqXHJcbiAgICAgKiDpga7nvanlsYLmnoTpgKDlh73mlbDvvIxib2R55pyr5bC+5Yib6YCg5LiA5Liq6ZqQ6JeP55qE5YWo5bGPZGl2XHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiDnm7jlhbPorr7nva7vvJp7XHJcbiAgICAgKiBzdHlsZTrpga7nvanlsYLmoLflvI8sXHJcbiAgICAgKiBhbmltYXRlOiDliqjnlLvmlYjmnpzmjIHnu63ml7bpl7Tpu5jorqQzMDBtcyxcclxuICAgICAqIGxvY2s6IOaYvuekuumBrue9qeaXtu+8jOaYr+WQpumUgeWummJvZHnnpoHmraLmu5rliqgsXHJcbiAgICAgKiBpbm5lckhUTUw6IOmBrue9qeWxguWGhWRvbeWtl+espuS4sn1cclxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH0gICAgIOaXoOi/lOWbnuWAvFxyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICBjb3ZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICAgICBkZWZTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgekluZGV4OiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCcsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvY2sgPSBvYmoubG9jaztcclxuXHJcbiAgICAgICAgaWYgKCEhb2JqLmFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdmFyIGFuaSA9IG9iai5hbmltYXRlO1xyXG4gICAgICAgICAgICBpZiAoL3MvLnRlc3QoYW5pKSkge1xyXG4gICAgICAgICAgICAgICAgYW5pID0gTnVtYmVyKGFuaS5zcGxpdCgncycpWzBdKSAqIDEwMDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSA9IE51bWJlcihhbmkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZTdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAnICsgKHRoaXMuYW5pbWF0ZSAvIDEwMDApICsgJ3MnO1xyXG5cclxuICAgICAgICBtaXhpbihvYmouc3R5bGUsIGRlZlN0eWxlKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkZWZTdHlsZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGNvdmVyLnN0eWxlW2tleV0gPSBkZWZTdHlsZVtrZXldO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb3Zlci5pZCA9ICdjb3Zlcl9fZGl2LS0nICsgZ2V0UmFuZG9tKDUpO1xyXG5cclxuICAgICAgICBjb3Zlci5pbm5lckhUTUwgPSBvYmouaW5uZXJIVE1MIHx8ICcnO1xyXG5cclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGNvdmVyKTtcclxuICAgICAgICB0aGlzLmVsID0gY292ZXI7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrpga7nvanlsYJcclxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH0g5peg6L+U5Zue5YC8XHJcbiAgICAgKi9cclxuICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gdGhpcy5sb2NrID8gJ2hpZGRlbicgOiAnJztcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/pga7nvanlsYJcclxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH0g5peg6L+U5Zue5YC8XHJcbiAgICAgKi9cclxuICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5hbmltYXRlKTtcclxuICAgIH1cclxufTtcclxuIiwiKGZ1bmN0aW9uKG93bmVyKSB7XHJcbiAgICAvL+mqjOivgeaYr+WQpuS4uuepulxyXG4gICAgb3duZXIuSXNOdWxsT3JFbXB0eSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9IHVuZGVmaW5lZCAmJiB2YWwgIT0gbnVsbCAmJiB2YWwgIT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG93bmVyLmluQXR0ciA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgIFx0aWYgKHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09ICd0cnVlJyB8fCB2YWwgPT09ICcnKSB7XHJcbiAgICBcdFx0cmV0dXJuIHRydWU7XHJcbiAgICBcdH0gZWxzZSB7XHJcbiAgICBcdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgXHR9XHJcbiAgICB9XHJcblxyXG4gICAgLy/muIXnqbrlr7nosaHlhoXlrrlcclxuICAgIG93bmVyLmVucHR5X29iaiA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFx0T2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgXHRcdG9ialtrZXldID0gbnVsbDtcclxuICAgIFx0fSlcclxuICAgIFx0cmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvL+mqjOivgeaYr+WQpuS4uuaVsOWtl1xyXG4gICAgb3duZXIuSXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIFx0aWYgKGlzTmFOKHZhbHVlKSkge1xyXG4gICAgXHRcdHJldHVybiAwO1xyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wvueixoea3seaLt+i0nVxyXG4gICAgb3duZXIuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBcdC8vIEhhbmRsZSB0aGUgMyBzaW1wbGUgdHlwZXMsIGFuZCBudWxsIG9yIHVuZGVmaW5lZFxyXG4gICAgXHRpZiAobnVsbCA9PSBvYmogfHwgXCJvYmplY3RcIiAhPSB0eXBlb2Ygb2JqKSByZXR1cm4gb2JqO1xyXG5cclxuICAgIFx0Ly8gSGFuZGxlIERhdGVcclxuICAgIFx0aWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIFx0XHR2YXIgY29weSA9IG5ldyBEYXRlKCk7XHJcbiAgICBcdFx0Y29weS5zZXRUaW1lKG9iai5nZXRUaW1lKCkpO1xyXG4gICAgXHRcdHJldHVybiBjb3B5O1xyXG4gICAgXHR9XHJcblxyXG4gICAgXHQvLyBIYW5kbGUgQXJyYXlcclxuICAgIFx0aWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICBcdFx0dmFyIGNvcHkgPSBbXTtcclxuICAgIFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICBcdFx0XHRjb3B5W2ldID0gY2xvbmUob2JqW2ldKTtcclxuICAgIFx0XHR9XHJcbiAgICBcdFx0cmV0dXJuIGNvcHk7XHJcbiAgICBcdH1cclxuXHJcbiAgICBcdC8vIEhhbmRsZSBPYmplY3RcclxuICAgIFx0aWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgXHRcdHZhciBjb3B5ID0ge307XHJcbiAgICBcdFx0Zm9yICh2YXIgYXR0ciBpbiBvYmopIHtcclxuICAgIFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoYXR0cikpIGNvcHlbYXR0cl0gPSBjbG9uZShvYmpbYXR0cl0pO1xyXG4gICAgXHRcdH1cclxuICAgIFx0XHRyZXR1cm4gY29weTtcclxuICAgIFx0fVxyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGNvcHkgb2JqISBJdHMgdHlwZSBpc24ndCBzdXBwb3J0ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKlxyXG4gICAg5pWw57uE5ou85qCRXHJcbiAgICB0YXJnZXRBcnLnm67moIfmlbDnu4RcclxuICAgIHBhcmVudEtleVdvcmTniLbnuqflhbPplK7lrZdcclxuICAgIHNlbGZLZXlXb3Jk6Ieq6Lqr5YWz6ZSu5a2XXHJcbiAgICAqL1xyXG4gICAgb3duZXIuYXJyQnVpbGRUcmVlID0gZnVuY3Rpb24gKHRhcmdldEFyciwgcGFyZW50S2V5V29yZCwgc2VsZktleVdvcmQpIHtcclxuICAgIFx0dmFyIGFycl90cmVlID0gW107XHJcblxyXG4gICAgXHR0YXJnZXRBcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgXHRcdGl0ZW0uY2hpbGRyZW4gPSBbXTtcclxuICAgIFx0fSlcclxuICAgIFx0dGFyZ2V0QXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIFx0XHRpZiAoIShpdGVtW3BhcmVudEtleVdvcmRdID09PSAwIHx8IGl0ZW1bcGFyZW50S2V5V29yZF0gPT09ICcwJykpIHtcclxuICAgIFx0XHRcdHZhciB0aGF0ID0gaXRlbTtcclxuICAgIFx0XHRcdHRhcmdldEFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICBcdFx0XHRcdGlmIChpdGVtW3NlbGZLZXlXb3JkXSA9PSB0aGF0W3BhcmVudEtleVdvcmRdKSB7XHJcbiAgICBcdFx0XHRcdFx0aXRlbS5jaGlsZHJlbi5wdXNoKHRoYXQpO1xyXG4gICAgXHRcdFx0XHR9XHJcbiAgICBcdFx0XHR9KVxyXG4gICAgXHRcdH0gZWxzZSB7XHJcbiAgICBcdFx0XHRhcnJfdHJlZS5wdXNoKGl0ZW0pO1xyXG4gICAgXHRcdH1cclxuICAgIFx0fSk7XHJcbiAgICBcdC8q5riF6ZmkY2hpbGRyZW7kuLrnqbrnmoTpobkqL1xyXG4gICAgXHR0YXJnZXRBcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgXHRcdGlmIChpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICBcdFx0XHRkZWxldGUgaXRlbS5jaGlsZHJlblxyXG4gICAgXHRcdH1cclxuICAgIFx0fSlcclxuICAgIFx0cmV0dXJuIGFycl90cmVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCR57uT5p6E5ouG5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R8YXJyYXl9IHRhcmdldFRyZWUg5qCR5b2i57uT5p6E5a+56LGh5oiW5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNoaWxkS2V5ICAg5a2Q6aG557Si5byVa2V5XHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICAg6L+U5Zue55qE5a+56LGh77yMYXJyYXnkuLrmi4bliIblkI7nmoTmlbDnu4TvvIxkZXB0aOS4uuagkeeahOa3seW6plxyXG4gICAgICovXHJcbiAgICBvd25lci50cmVlQnJlYWtBcnIgPSBmdW5jdGlvbiAodGFyZ2V0VHJlZSwgY2hpbGRLZXkpIHtcclxuICAgIFx0dmFyIGFyciA9IFtdLFxyXG4gICAgXHRcdGRlZXAgPSAwLFxyXG4gICAgXHRcdGNoaWxkS2V5ID0gY2hpbGRLZXkgfHwgJ2NoaWxkcmVuJztcclxuXHJcbiAgICBcdGZ1bmN0aW9uIGRlZXBMb29wKHRyZWUsIGxldmVsKSB7XHJcbiAgICBcdFx0dmFyIGRlcHRoID0gbGV2ZWwgKyAxO1xyXG4gICAgXHRcdGRlZXAgPSAoZGVlcCA+IGxldmVsKSA/IGRlZXAgOiBsZXZlbDtcclxuICAgIFx0XHR0cmVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIFx0XHRcdGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbVtjaGlsZEtleV0pICYmIGl0ZW1bY2hpbGRLZXldLmxlbmd0aCA+IDApIHtcclxuICAgIFx0XHRcdFx0ZGVlcExvb3AoaXRlbVtjaGlsZEtleV0sIGRlcHRoKTtcclxuICAgIFx0XHRcdH1cclxuICAgIFx0XHR9KVxyXG4gICAgXHR9O1xyXG5cclxuICAgIFx0aWYgKHR5cGVvZiB0YXJnZXRUcmVlID09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0VHJlZSkpIHtcclxuICAgIFx0XHRkZWVwTG9vcCh0YXJnZXRUcmVlLCAxKTtcclxuICAgIFx0fSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0VHJlZSA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh0YXJnZXRUcmVlKSkge1xyXG4gICAgXHRcdHZhciBhID0gW107XHJcbiAgICBcdFx0YS5wdXNoKHRhcmdldFRyZWUpO1xyXG4gICAgXHRcdGRlZXBMb29wKGEsIDEpO1xyXG4gICAgXHR9O1xyXG5cclxuICAgIFx0cmV0dXJuIHtcclxuICAgIFx0XHRhcnJheTogYXJyLFxyXG4gICAgXHRcdGRlcHRoOiBkZWVwXHJcbiAgICBcdH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqXHJcbiAgICDmjqXmlLblnLDlnYDmoI/lj4LmlbBcclxuICAgIGtleTrlj4LmlbDlkI3np7BcclxuICAgICoqKioqKioqKiovXHJcbiAgICBvd25lci5nZXRTZWFyY2ggPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBcdHZhciBoYXNoID0gW107XHJcbiAgICBcdHRyeSB7XHJcbiAgICBcdFx0aGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoJz8nKVsxXS5zcGxpdChcIiZcIik7XHJcbiAgICBcdH0gY2F0Y2ggKGUpIHt9XHJcbiAgICBcdHZhciBoYXNoT2JqID0ge307XHJcbiAgICBcdGhhc2guZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgXHRcdGhhc2hPYmpbaXRlbS5zcGxpdChcIj1cIilbMF1dID0gaXRlbS5zcGxpdChcIj1cIilbMV07XHJcbiAgICBcdH0pO1xyXG4gICAgXHRpZiAoISFrZXkpXHJcbiAgICBcdFx0cmV0dXJuIC8ldS8udGVzdChoYXNoT2JqW2tleV0pID8gdW5lc2NhcGUoaGFzaE9ialtrZXldKSA6IGhhc2hPYmpba2V5XTtcclxuICAgIFx0ZWxzZVxyXG4gICAgXHRcdHJldHVybiBoYXNoT2JqO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG5a+56LGh6L2s5YyW5oiQc2VhcmNo5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiAg5a+56LGh5oiW5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBmbGFnIOaYr+WQpuaQuuW4pic/J1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgICAgIOi/lOWbnueahOagvOW8j+WMluWQjuWtl+espuS4slxyXG4gICAgICovXHJcbiAgICBvd25lci50b1NlYXJjaCA9IGZ1bmN0aW9uIChvYmosIGZsYWcpIHtcclxuICAgIFx0dmFyIHJlcyA9ICc/J1xyXG4gICAgXHRpZiAodHlwZW9mIG9iaiA9PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgIFx0XHRvYmouZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgIFx0XHRcdHJlcyArPSAoJ1snICsgaW5kZXggKyAnXT0nICsgb3duZXIudG9TZWFyY2goaXRlbSwgdHJ1ZSkgKyAnJicpO1xyXG4gICAgXHRcdH0pO1xyXG4gICAgXHR9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcclxuICAgIFx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgXHRcdFx0aWYgKHR5cGVvZiBvYmpba2V5XSA9PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KG9ialtrZXldKSkge1xyXG4gICAgXHRcdFx0XHRvYmpba2V5XS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgXHRcdFx0XHRcdHJlcyArPSAoa2V5ICsgJ1snICsgaW5kZXggKyAnXT0nICsgb3duZXIudG9TZWFyY2goaXRlbSwgdHJ1ZSkgKyAnJicpXHJcbiAgICBcdFx0XHRcdH0pO1xyXG4gICAgXHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT0gJ29iamVjdCcgJiYgb2JqW2tleV0gIT0gbnVsbCkge1xyXG4gICAgXHRcdFx0XHRyZXMgKz0gKG93bmVyLnRvU2VhcmNoKG9ialtrZXldLCB0cnVlKSArICcmJyk7XHJcbiAgICBcdFx0XHR9IGVsc2Uge1xyXG4gICAgXHRcdFx0XHR2YXIgaXRlbSA9IC9bXFx1MzIyMC1cXHVGQTI5XS8udGVzdChvYmpba2V5XSkgPyBlc2NhcGUob2JqW2tleV0pIDogb2JqW2tleV07XHJcbiAgICBcdFx0XHRcdHJlcyArPSAoa2V5ICsgJz0nICsgKGl0ZW0gfHwgJycpICsgJyYnKTtcclxuICAgIFx0XHRcdH1cclxuXHJcbiAgICBcdFx0fSk7XHJcbiAgICBcdH0gZWxzZSB7XHJcbiAgICBcdFx0cmV0dXJuIG9iajtcclxuICAgIFx0fVxyXG4gICAgXHRyZXR1cm4gISFmbGFnID8gcmVzLnNsaWNlKDEsIC0xKSA6IHJlcy5zbGljZSgwLCAtMSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5oiQaGFzaOWAvOW5tuaUvue9ruWmgndpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAga2V5ICAgICAg6ZSuXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdmFsdWUgICAg5YC8XHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcmV0dXJuIHtudWxsfSAgICAgICAgICAgIOi/lOWbnuWAvFxyXG4gICAgICovXHJcbiAgICBvd25lci5zZXRIYXNoID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgXHR2YXIgaGFzaCA9IFtdO1xyXG4gICAgXHR0cnkge1xyXG4gICAgXHRcdGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdCgnIycpWzFdLnNwbGl0KFwiJlwiKTtcclxuICAgIFx0fSBjYXRjaCAoZSkge31cclxuICAgIFx0dmFyIGhhc2hPYmogPSB7fTtcclxuICAgIFx0JChoYXNoKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgIFx0XHRoYXNoT2JqW3RoaXMuc3BsaXQoXCI9XCIpWzBdXSA9IHRoaXMuc3BsaXQoXCI9XCIpWzFdO1xyXG4gICAgXHR9KTtcclxuXHJcbiAgICBcdGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xyXG4gICAgXHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgXHRcdGhhc2hPYmpba2V5XSA9IHZhbHVlO1xyXG5cclxuICAgIFx0fSBlbHNlIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgXHRcdGNhbGxiYWNrID0gdmFsdWUgfHwgZnVuY3Rpb24gKCkge307XHJcbiAgICBcdFx0T2JqZWN0LmtleXMoa2V5KS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICBcdFx0XHRoYXNoT2JqW2l0ZW1dID0ga2V5W2l0ZW1dXHJcbiAgICBcdFx0fSlcclxuICAgIFx0fVxyXG5cclxuICAgIFx0dmFyIGhhc2hTdHIgPSAnIyc7XHJcbiAgICBcdGZvciAodGtleSBpbiBoYXNoT2JqKSB7XHJcbiAgICBcdFx0aGFzaFN0ciArPSAodGtleSArICc9JyArIGhhc2hPYmpbdGtleV0gKyAnJicpO1xyXG4gICAgXHR9O1xyXG4gICAgXHRpZiAoISF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gICAgXHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLmhhc2gsIGhhc2hTdHIuc2xpY2UoMCwgLTEpKSk7XHJcbiAgICBcdH0gZWxzZSB7XHJcbiAgICBcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLmhyZWYgKyBoYXNoU3RyLnNsaWNlKDAsIC0xKSlcclxuICAgIFx0fVxyXG5cclxuICAgIFx0Y2FsbGJhY2soKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5Z3aW5kb3cubG9jYXRpb24uaGFzaOS4reeJueWumuWAvFxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkg5b6F6I635Y+W55qEa2V5XHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICDojrflj5bliLDnmoTlgLxcclxuICAgICAqL1xyXG4gICAgb3duZXIuZ2V0SGFzaCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIFx0dmFyIGhhc2ggPSBbXTtcclxuICAgIFx0dHJ5IHtcclxuICAgIFx0XHRoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoJyMnKVsxXS5zcGxpdChcIiZcIik7XHJcbiAgICBcdH0gY2F0Y2ggKGUpIHt9XHJcbiAgICBcdHZhciBoYXNoT2JqID0ge307XHJcbiAgICBcdGhhc2guZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgXHRcdGhhc2hPYmpbaXRlbS5zcGxpdChcIj1cIilbMF1dID0gaXRlbS5zcGxpdChcIj1cIilbMV07XHJcbiAgICBcdH0pO1xyXG4gICAgXHRpZiAoISFrZXkpXHJcbiAgICBcdFx0cmV0dXJuIGhhc2hPYmpba2V5XTtcclxuICAgIFx0ZWxzZVxyXG4gICAgXHRcdHJldHVybiBoYXNoT2JqO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572uc3RvcmFnZeWfuuaWueazlVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB0eXBlIHNlc3Npb25TdG9yYWdl5oiWbG9jYWxTdG9yYWdlXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGtleSAg6KaB5Y+W55qEa2V5XHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd8T2JqZWN0fSAgICAgIOWvueW6lOWtmOWCqOeahOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRTdG9yYWdlKHR5cGUsIGtleSkge1xyXG4gICAgXHR2YXIgcmVzID0gISFrZXkgP1xyXG4gICAgXHRcdHdpbmRvd1t0eXBlXVtrZXldID9cclxuICAgIFx0XHQoKC97fH18JTdCfCU3RHxcXFt8XFxdfCU1QnwlNUQvLnRlc3Qod2luZG93W3R5cGVdW2tleV0pID9cclxuICAgIFx0XHRcdEpTT04ucGFyc2UodW5lc2NhcGUod2luZG93W3R5cGVdW2tleV0pKSA6XHJcbiAgICBcdFx0XHR1bmVzY2FwZSh3aW5kb3dbdHlwZV1ba2V5XSkpKSA6IHVuZGVmaW5lZCA6XHJcbiAgICBcdFx0d2luZG93W3R5cGVdO1xyXG4gICAgXHRyZXR1cm4gcmVzIHx8IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZzdG9yYWdl5Z+65pa55rOVXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAgc2Vzc2lvblN0b3JhZ2XmiJZsb2NhbFN0b3JhZ2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0ga2V5ICAg6KaB6K6+572u55qEa2V55oiW5pW05Liq5a+56LGhXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUg5bey6K6+572u55qE57uT5p6cXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldFN0b3JhZ2UodHlwZSwga2V5LCB2YWx1ZSkge1xyXG4gICAgXHRpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcclxuICAgIFx0XHR3aW5kb3dbdHlwZV1ba2V5XSA9ICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IGVzY2FwZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpIDogZXNjYXBlKHZhbHVlKTtcclxuICAgIFx0fSBlbHNlIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgXHRcdE9iamVjdC5rZXlzKGtleSkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgXHRcdFx0d2luZG93W3R5cGVdW2l0ZW1dID0gKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gZXNjYXBlKEpTT04uc3RyaW5naWZ5KGtleVtpdGVtXSkpIDogZXNjYXBlKGtleVtpdGVtXSk7XHJcbiAgICBcdFx0fSk7XHJcbiAgICBcdH07XHJcbiAgICBcdHJldHVybiB3aW5kb3dbdHlwZV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5Zsb2NhbFN0b3JhZ2Xph4znmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IOW+heiOt+WPlueahGtleVxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfE9iamVjdH0g5Y+W5Zue55qE5YC8XHJcbiAgICAgKi9cclxuICAgIG93bmVyLmdldExvY2FsID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgXHRyZXR1cm4gZ2V0U3RvcmFnZSgnbG9jYWxTdG9yYWdlJywga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuWAvOWtmOWFpWxvY2FsU3RvcmFnZVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfE9iamVjdH0ga2V5ICAg5b6F5a2Y5YC855qEa2V55oiWanNvbuWvueixoVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gdmFsdWUg5b6F5a2Y5YC855qEdmFsdWVcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgICAg5a2Y5YWl5ZCObG9jYWxTdG9yYWdl5a+56LGhXHJcbiAgICAgKi9cclxuICAgIG93bmVyLnNldExvY2FsID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgIFx0cmV0dXJuIHNldFN0b3JhZ2UoJ2xvY2FsU3RvcmFnZScsIGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+Wc2Vzc2lvblN0b3JhZ2Xph4znmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IOW+heiOt+WPlueahGtleVxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfE9iamVjdH0g5Y+W5Zue55qE5YC8XHJcbiAgICAgKi9cclxuICAgIG93bmVyLmdldFNlc3Npb24gPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBcdHJldHVybiBnZXRTdG9yYWdlKCdzZXNzaW9uU3RvcmFnZScsIGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIblgLzlrZjlhaVzZXNzaW9uU3RvcmFnZVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfE9iamVjdH0ga2V5ICAg5b6F5a2Y5YC855qEa2V55oiWanNvbuWvueixoVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gdmFsdWUg5b6F5a2Y5YC855qEdmFsdWVcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgICAg5a2Y5YWl5ZCOc2Vzc2lvblN0b3JhZ2Xlr7nosaFcclxuICAgICAqL1xyXG4gICAgb3duZXIuc2V0U2Vzc2lvbiA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICBcdHJldHVybiBzZXRTdG9yYWdlKCdzZXNzaW9uU3RvcmFnZScsIGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo55uu5qCHcmVm5LiK55Sf5oiQ5LiA5Liq6ZqP5py6aWRcclxuICAgICAqIEBwYXJhbSAge29ian0gcmVmIHZ1ZeeahOS4gOS4qnJlZuWunuS+i1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgICAg55Sf5oiQ55qE6ZqP5py6aWRcclxuICAgICAqL1xyXG4gICAgb3duZXIuc2V0UmFuZG9tSWQgPSBmdW5jdGlvbiAocmVmKSB7XHJcbiAgICBcdHZhciB0YXJnZXQgPSB0aGlzLiRyZWZzW3JlZl0sXHJcbiAgICBcdFx0cmFuZG9tID0gKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAgKyAnJykuc2xpY2UoMCwgNSk7XHJcblxyXG4gICAgXHR2YXIgcmFuZG9tSWQgPSByZWYgKyAnLScgKyByYW5kb207XHJcbiAgICBcdHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2lkJywgcmFuZG9tSWQpO1xyXG5cclxuICAgIFx0cmV0dXJuIHJhbmRvbUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8q5qC85byP5YyW5o6S5bqP6aG65bqP5YWz6ZSu5a2XKi9cclxuICAgIG93bmVyLnNvcnRvcmRlciA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgIFx0dHJ5IHtcclxuICAgIFx0XHRpZiAoc3RyLmluZGV4T2YoJ2FzYycpID4gLTEpIHtcclxuICAgIFx0XHRcdHJldHVybiAnYXNjJ1xyXG4gICAgXHRcdH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoJ2Rlc2MnKSA+IC0xKSB7XHJcbiAgICBcdFx0XHRyZXR1cm4gJ2Rlc2MnXHJcbiAgICBcdFx0fVxyXG4gICAgXHR9IGNhdGNoIChlKSB7XHJcbiAgICBcdFx0cmV0dXJuIHN0clxyXG4gICAgXHR9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5ZmaWxlZ3VpZFxyXG4gICAgb3duZXIuR2V0R3VpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFx0dmFyIGd1aWQgPSBcIlwiO1xyXG4gICAgXHQkLmFqYXhTZXR1cCh7XHJcbiAgICBcdFx0YXN5bmM6IGZhbHNlXHJcbiAgICBcdH0pO1xyXG4gICAgXHR0aGlzLiRnZXQoc3lzVXJsICsgXCIvc3lzZmlsZS9nZXRndWlkXCIsIHt9LCBmdW5jdGlvbiAoZGF0YSwgcmVzKSB7XHJcbiAgICBcdFx0Z3VpZCA9IGRhdGE7XHJcbiAgICBcdH0pXHJcbiAgICBcdCQuYWpheFNldHVwKHtcclxuICAgIFx0XHRhc3luYzogdHJ1ZVxyXG4gICAgXHR9KTtcclxuICAgIFx0cmV0dXJuIGd1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgb3duZXIuZ2V0T2JqQnlWYWx1ZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFx0dmFyIHJlcyA9IG51bGw7XHJcbiAgICBcdHZhciBhcnIgPSBvYmouYXJyLFxyXG4gICAgXHRcdHRhcmdldCA9IG9iai50YXJnZXQsXHJcbiAgICBcdFx0a2V5ID0gb2JqLmtleSB8fCAna2V5JyxcclxuICAgIFx0XHR2YWx1ZSA9IG9iai52YWx1ZSB8fCAndmFsdWUnLFxyXG4gICAgXHRcdG1hcGtleSA9IG9iai5tYXBrZXkgfHwga2V5LFxyXG4gICAgXHRcdG1hcHZhbHVlID0gb2JqLm1hcHZhbHVlIHx8IHZhbHVlLFxyXG4gICAgXHRcdGFkZCA9IG9iai5hZGQgfHwgZmFsc2VcclxuXHJcbiAgICBcdHZhciBhcnJNYXAgPSB7fTtcclxuXHJcbiAgICBcdGlmICh0eXBlb2YgKG9iai50YXJnZXQpID09ICdzdHJpbmcnKSB7XHJcbiAgICBcdFx0YXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIFx0XHRcdGFyck1hcFtlc2NhcGUoaXRlbVt2YWx1ZV0pXSA9IGl0ZW07XHJcbiAgICBcdFx0fSk7XHJcblxyXG4gICAgXHRcdHJlcyA9IHt9O1xyXG4gICAgXHRcdGlmIChhZGQpIHtcclxuICAgIFx0XHRcdHJlcyA9IGNsb25lKGFyck1hcFtlc2NhcGUodGFyZ2V0KV0pO1xyXG4gICAgXHRcdH07XHJcbiAgICBcdFx0cmVzW21hcGtleV0gPSBhcnJNYXBbZXNjYXBlKHRhcmdldCldW2tleV07XHJcbiAgICBcdFx0cmVzW21hcHZhbHVlXSA9IHRhcmdldDtcclxuICAgIFx0fSBlbHNlIGlmICgodHlwZW9mIChvYmoudGFyZ2V0KSA9PSAnb2JqZWN0JykgJiYgQXJyYXkuaXNBcnJheShvYmoudGFyZ2V0KSkge1xyXG4gICAgXHRcdHJlcyA9IFtdO1xyXG4gICAgXHRcdGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICBcdFx0XHRhcnJNYXBbZXNjYXBlKGl0ZW1bdmFsdWVdKV0gPSBpdGVtO1xyXG4gICAgXHRcdH0pO1xyXG5cclxuICAgIFx0XHR0YXJnZXQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgXHRcdFx0cmVzLnB1c2goYXJyTWFwW2VzY2FwZShpdGVtKV0pXHJcbiAgICBcdFx0fSlcclxuICAgIFx0fVxyXG5cclxuICAgIFx0cmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIh+WIhnl5eXktTU0tZGQgaGg6bW06c3PmoLzlvI/nmoTlrZfnrKbkuLLmiJB5eXl5LU1NLWRk5qC85byPXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHRpbWUg5pe26Ze05qC85byP5a2X56ym5LiyXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAg5pel5pyf5qC85byP5a2X56ym5LiyXHJcbiAgICAgKi9cclxuICAgIG93bmVyLnRpbWVUb0RhdGUgPSBmdW5jdGlvbiAodGltZSkge1xyXG4gICAgXHRpZiAoLyAvLnRlc3QodGltZSkpIHtcclxuICAgIFx0XHRyZXR1cm4gdGltZS5zcGxpdCgnICcpWzBdO1xyXG4gICAgXHR9IGVsc2Uge1xyXG4gICAgXHRcdHJldHVybiB0aW1lXHJcbiAgICBcdH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+aIkOafkOmVv+W6pumaj+acuuaVsOWtl+espuS4slxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBsZW5ndGgg6ZqP5py65a2X56ym5Liy6ZW/5bqmXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICDpmo/mnLrmlbDlrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgb3duZXIuZ2V0UmFuZG9tID0gZnVuY3Rpb24gKGxlbmd0aCkge1xyXG4gICAgXHR2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKSArICcnO1xyXG4gICAgXHRyZXR1cm4gcmFuZG9tLnNsaWNlKDIsIGxlbmd0aCArIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5oiQ5b2T5YmN5pe26Ze05oizXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IOeUn+aIkOeahOaXtumXtOaIs1xyXG4gICAgICovXHJcbiAgICBvd25lci5nZXRUaW1lU3RybXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBcdHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCP5pWw6L2s55m+5YiG5pWw5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IG51bSAgICDlsI/mlbBcclxuICAgICAqIEBwYXJhbSAge251bWJlcn0gbGVuZ3RoIOeUn+aIkOeZvuWIhuavlOeahOWwj+aVsOeCueWQjuS9jeaVsFxyXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gcmFuZ2Ug5piv5ZCm5bCG57uT5p6c6ZmQ5Yi25ZyoMC0xMDAlXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICDnmb7liIbmr5TlrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgb3duZXIuZmxvYXRUb1BlcmNlbnQgPSBmdW5jdGlvbiAobnVtLCBsZW5ndGgsIHJhbmdlKSB7XHJcbiAgICBcdHZhciBjYWxjID0gKE51bWJlcihudW0pICogMTAwKTtcclxuICAgIFx0aWYgKGNhbGMgPiAxMDAgJiYgISFyYW5nZSkgY2FsYyA9IDEwMDtcclxuICAgIFx0cmV0dXJuIGNhbGMudG9GaXhlZChsZW5ndGgpICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIG93bmVyLnd4UGF5ID0gZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2ssIGVycmNhbGxiYWNrKSB7XHJcbiAgICBcdC8v6LCD6LW35pSv5LuYXHJcbiAgICBcdFdlaXhpbkpTQnJpZGdlLmludm9rZSgnZ2V0QnJhbmRXQ1BheVJlcXVlc3QnLCB7XHJcbiAgICBcdFx0XCJhcHBJZFwiOiBvYmouYXBwSWQsXHJcbiAgICBcdFx0XCJ0aW1lU3RhbXBcIjogb2JqLnRpbWVTdGFtcCxcclxuICAgIFx0XHRcIm5vbmNlU3RyXCI6IG9iai5ub25jZVN0cixcclxuICAgIFx0XHRcInBhY2thZ2VcIjogb2JqLnBhY2thZ2UsXHJcbiAgICBcdFx0XCJzaWduVHlwZVwiOiBcIk1ENVwiLFxyXG4gICAgXHRcdFwicGF5U2lnblwiOiBvYmoucGF5U2lnblxyXG4gICAgXHR9LCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICBcdFx0Ly/mlK/ku5jmiJDlip9cclxuICAgIFx0XHRpZiAocmVzLmVycl9tc2cgPT0gXCJnZXRfYnJhbmRfd2NwYXlfcmVxdWVzdDpva1wiKSB7XHJcbiAgICBcdFx0XHRhbGVydChcIuaUr+S7mOaIkOWKn1wiKTtcclxuICAgIFx0XHRcdCEhY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgIFx0XHR9IGVsc2UgaWYgKHJlcy5lcnJfbXNnID09IFwiZ2V0X2JyYW5kX3djcGF5X3JlcXVlc3Q6ZmFpbFwiKSB7XHJcbiAgICBcdFx0XHRhbGVydChcIuaUr+S7mOWksei0pe+8jOivt+mHjeivlVwiKTtcclxuICAgIFx0XHRcdCEhZXJyY2FsbGJhY2sgJiYgZXJyY2FsbGJhY2soKTtcclxuICAgIFx0XHR9IGVsc2UgaWYgKHJlcy5lcnJfbXNnID09IFwiZ2V0X2JyYW5kX3djcGF5X3JlcXVlc3Q6Y2FuY2VsXCIpIHtcclxuICAgIFx0XHRcdGFsZXJ0KFwi55So5oi35Y+W5raI5pSv5LuYXCIpO1xyXG4gICAgXHRcdFx0ISFlcnJjYWxsYmFjayAmJiBlcnJjYWxsYmFjaygpO1xyXG4gICAgXHRcdH0gZWxzZSB7XHJcbiAgICBcdFx0XHRhbGVydChyZXMuZXJyX21zZyk7XHJcbiAgICBcdFx0XHQhIWVycmNhbGxiYWNrICYmIGVycmNhbGxiYWNrKCk7XHJcbiAgICBcdFx0fTtcclxuICAgIFx0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIvovb3lip/og71cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcGF0aCDpmYTku7bmnI3liqHlmajlrozmlbTlnLDlnYBcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAg57uT5p6cXHJcbiAgICAgKi9cclxuICAgIG93bmVyLmRvd25sb2FkZXIgPSBmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgXHR2YXIgZWxlQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIFx0aWYgKCdkb3dubG9hZCcgaW4gZWxlQSkge1xyXG4gICAgXHRcdGVsZUEuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIHBhdGgpO1xyXG4gICAgXHRcdGVsZUEuc2V0QXR0cmlidXRlKCdocmVmJywgcGF0aCk7XHJcblxyXG4gICAgXHRcdGVsZUEuaW5uZXJIVE1MID0gJ2Rvd25sb2FkaW5nJztcclxuXHJcbiAgICBcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVBKTtcclxuXHJcbiAgICBcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBcdFx0XHRlbGVBLmNsaWNrKCk7XHJcbiAgICBcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZUEpO1xyXG4gICAgXHRcdH0sIDEwMDAgLyAyNCk7XHJcbiAgICBcdFx0cmV0dXJuIHRydWU7XHJcbiAgICBcdH07XHJcblxyXG4gICAgXHR0cnkge1xyXG4gICAgXHRcdHZhciBlbGVtSUYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xyXG4gICAgXHRcdGVsZW1JRi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtSUYpO1xyXG4gICAgXHRcdGVsZW1JRi5zcmMgPSBwYXRoO1xyXG4gICAgXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtSUYpO1xyXG4gICAgXHRcdH0sIDMzMyk7XHJcbiAgICBcdFx0cmV0dXJuIHRydWU7XHJcbiAgICBcdH0gY2F0Y2ggKGUpIHtcclxuICAgIFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgIFx0XHRmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ2dldCcpO1xyXG4gICAgXHRcdGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLCBwYXRoKTtcclxuICAgIFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xyXG4gICAgXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgXHRcdFx0Zm9ybS5zdWJtaXQoKTtcclxuICAgIFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZm9ybSk7XHJcbiAgICBcdFx0fSwgMTAwMCAvIDI0KTtcclxuICAgIFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgIFx0fVxyXG5cclxuICAgIFx0aWYgKCF3aW5kb3cub3Blbih1cmwpKSB7IC8vIHBvcHVwIGJsb2NrZWQsIG9mZmVyIGRpcmVjdCBkb3dubG9hZDpcclxuICAgIFx0XHRpZiAoY29uZmlybShcIuivt+S9v+eUqOWPs+mUri3lj6blrZjkuLrov5vooYzkuIvovb3vvIzlrozmiJDlkI7ngrnlh7vlkI7pgIDov5Tlm57lvZPliY3pobXpnaJcIikpIHtcclxuICAgIFx0XHRcdGxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICBcdFx0fVxyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zu+54mH6L2sYmFzZTY057yW56CBXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdXJsICAgICAgICAgIOaWh+S7tuWtmOWCqOi3r+W+hFxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrICAgICDlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICBvdXRwdXRGb3JtYXQg5Zu+54mH57yW56CB57G75Z6LXHJcbiAgICAgKiBAcmV0dXJuIHtudWxsfSAgICAgICAgICAgICAgICDov5Tlm57lgLxcclxuICAgICAqL1xyXG4gICAgb3duZXIuaW1nVG9CYXNlNjQgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaywgb3V0cHV0Rm9ybWF0KSB7XHJcbiAgICBcdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdDQU5WQVMnKSxcclxuICAgIFx0XHRjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcclxuICAgIFx0XHRpbWcgPSBuZXcgSW1hZ2U7XHJcbiAgICBcdGltZy5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xyXG4gICAgXHRpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgXHRcdGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xyXG4gICAgXHRcdGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcclxuICAgIFx0XHRjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcbiAgICBcdFx0dmFyIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKG91dHB1dEZvcm1hdCB8fCAnaW1hZ2UvcG5nJyk7XHJcbiAgICBcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBkYXRhVVJMKTtcclxuICAgIFx0XHRjYW52YXMgPSBudWxsO1xyXG4gICAgXHR9O1xyXG4gICAgXHRpbWcuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f5Z6L6ZO+57un5om/XHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gc3ViVHlwZSAgIOWtkOexu1xyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IHN1cGVyVHlwZSDniLbnsbtcclxuICAgICAqIEByZXR1cm4ge251bGx9ICAgICAgICAgICDov5Tlm57lgLxcclxuICAgICAqL1xyXG4gICAgb3duZXIuaW5oZXJpdFByb3RvdHlwZSA9IGZ1bmN0aW9uIChzdWJUeXBlLCBzdXBlclR5cGUpIHtcclxuICAgIFx0dmFyIHByb3RvVHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJUeXBlLnByb3RvdHlwZSk7XHJcbiAgICBcdC8vIE9iamVjdC5jcmVhciA9IGZ1bmN0aW9uKHN1cGVyVHlwZSkge1xyXG4gICAgXHQvLyBcdFx0dmFyIEYgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgXHQvLyBcdFx0Ri5wcm90b3R5cGUgPSBzdXBlclR5cGU7XHJcbiAgICBcdC8vIFx0XHRyZXR1cm4gbmV3IEYoKTtcclxuICAgIFx0Ly8gfVxyXG4gICAgXHRwcm90b1R5cGUuY29uc3RydWN0b3IgPSBzdWJUeXBlO1xyXG4gICAgXHRzdWJUeXBlLnByb3RvdHlwZSA9IHByb3RvVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8guatpeWKoOi9vWpzXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHNyYyBqc+aWh+S7tui3r+W+hFxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgIOWKoOi9vee7k+aenFxyXG4gICAgICovXHJcbiAgICBvd25lci5sb2FkU2NyaXB0ID0gZnVuY3Rpb24gKHNyYykge1xyXG4gICAgXHRpZiAoIXNyYykge1xyXG4gICAgXHRcdHRocm93IG5ldyBFcnJvcign6K+35oyH5a6a6KaB5Yqg6L2955qEanPmlofku7bot6/lvoQnKTtcclxuICAgIFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICBcdH07XHJcbiAgICBcdHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBcdHMudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgXHRzLmFzeW5jID0gdHJ1ZTtcclxuICAgIFx0cy5zcmMgPSBzcmM7XHJcbiAgICBcdHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xyXG4gICAgXHR4LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHMsIHgpO1xyXG4gICAgXHRyZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOWtl+i9rOS4reaWh+mHkeminVxyXG4gICAgICogQHBhcmFtICB7bnVtYmVyfHN0cmluZ30gbiDmlbDlrZfph5Hpop1cclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gICAgIOi9rOaNouWQjueahOS4reaWh+mHkeminVxyXG4gICAgICovXHJcbiAgICBvd25lci5BcmFiaWFfdG9fQ2hpbmVzZSA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgdmFyIGZyYWN0aW9uID0gWyfop5InLCAn5YiGJ107XHJcbiAgICAgICAgdmFyIGRpZ2l0ID0gWyfpm7YnLCAn5aO5JywgJ+i0sCcsICflj4EnLCAn6IKGJywgJ+S8jScsICfpmYYnLCAn5p+SJywgJ+aNjCcsICfnjpYnXTtcclxuICAgICAgICB2YXIgdW5pdCA9IFsgWyflhYMnLCAn5LiHJywgJ+S6vyddLCBbJycsICfmi74nLCAn5L2wJywgJ+S7nyddICBdO1xyXG4gICAgICAgIHZhciBoZWFkID0gbiA8IDAgPyAn5qygJzogJyc7XHJcbiAgICAgICAgbiA9IE1hdGguYWJzKG4pO1xyXG5cclxuICAgICAgICB2YXIgcyA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZyYWN0aW9uLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcyArPSAoZGlnaXRbTWF0aC5mbG9vcihuICogMTAgKiBNYXRoLnBvdygxMCwgaSkpICUgMTBdICsgZnJhY3Rpb25baV0pLnJlcGxhY2UoL+mbti4vLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHMgPSBzIHx8ICfmlbQnO1xyXG4gICAgICAgIG4gPSBNYXRoLmZsb29yKG4pO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVuaXRbMF0ubGVuZ3RoICYmIG4gPiAwOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHVuaXRbMV0ubGVuZ3RoICYmIG4gPiAwOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHAgPSBkaWdpdFtuICUgMTBdICsgdW5pdFsxXVtqXSArIHA7XHJcbiAgICAgICAgICAgICAgICBuID0gTWF0aC5mbG9vcihuIC8gMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHMgPSBwLnJlcGxhY2UoLyjpm7YuKSrpm7YkLywgJycpLnJlcGxhY2UoL14kLywgJ+mbticpICArIHVuaXRbMF1baV0gKyBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGVhZCArIHMucmVwbGFjZSgvKOmbti4pKumbtuWFgy8sICflhYMnKS5yZXBsYWNlKC8o6Zu2LikrL2csICfpm7YnKS5yZXBsYWNlKC9e5pW0JC8sICfpm7blhYPmlbQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmBjeWOhuWei+Wvueixoea3t+WFpe+8jOWwhm9iaua3t+WFpXRhcmdldFxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogICAg5b6F5re35YWl55qE5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHRhcmdldCDmt7flhaXnm67moIflr7nosaFcclxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHN0YXRlICDmmK/lkKbopobnm5bmt7flhaVcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgIOa3t+WFpeWQjueahOWvueixoVxyXG4gICAgICovXHJcbiAgICBvd25lci5taXhpbiA9IGZ1bmN0aW9uIChvYmosIHRhcmdldCwgc3RhdGUpIHtcclxuICAgIFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIFx0XHRpZiAoc3RhdGUpIHtcclxuICAgIFx0XHRcdHRhcmdldFtrZXldID0gb2JqW2tleV07XHJcbiAgICBcdFx0fSBlbHNlIHtcclxuICAgIFx0XHRcdGlmICghdGFyZ2V0W2tleV0pXHJcbiAgICBcdFx0XHRcdHRhcmdldFtrZXldID0gb2JqW2tleV07XHJcbiAgICBcdFx0fVxyXG4gICAgXHR9KTtcclxuICAgIFx0cmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxufSkod2luZG93KVxyXG4iLCIoZnVuY3Rpb24oZmFjdG9yeSkge1xyXG4gICAgaWYoIXdpbmRvdy5WdWUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCfml6Dms5Xmib7liLBWdWXlr7nosaEnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZighd2luZG93LiQpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCfml6Dms5Xmib7liLAk5a+56LGhJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZmFjdG9yeSgpO1xyXG59KShmdW5jdGlvbigpIHtcclxuICAgIC8v5bel5YW357uE5Lu2YnVzXHJcblx0d2luZG93LiRidXMgPSBuZXcgVnVlKHtcclxuXHJcblx0fSk7XHJcblxyXG5cdFZ1ZS5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7XHJcblx0XHR2YXIgdXJsLCBkYXRhLCBjYWxsYmFjaywgZnp0eXBlO1xyXG5cclxuXHRcdHVybCA9IGE7XHJcblx0XHRkYXRhID0gJyc7XHJcblx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xyXG5cdFx0Znp0eXBlID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMiAmJiB0eXBlb2YgKGIpID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0Y2FsbGJhY2sgPSBiO1xyXG5cdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgdHlwZW9mIChiKSAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdGRhdGEgPSBiO1xyXG5cdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDMpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiAoYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXSkgPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdFx0ZGF0YSA9IGI7XHJcblx0XHRcdFx0Znp0eXBlID0gYztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkYXRhID0gYjtcclxuXHRcdFx0XHRjYWxsYmFjayA9IGM7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSA0KSB7XHJcblx0XHRcdGRhdGEgPSBiO1xyXG5cdFx0XHRjYWxsYmFjayA9IGM7XHJcblx0XHRcdGZ6dHlwZSA9IGQ7XHJcblx0XHR9XHJcblxyXG5cdFx0QWpheFJlcXVlc3QuY2FsbCh0aGlzLCB7XHJcblx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHR0eXBlOiAnZ2V0JyxcclxuXHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uIChkYXRhLCByZXMpIHtcclxuXHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIGRhdGEsIHJlcylcclxuXHRcdFx0fS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRmenR5cGU6IGZ6dHlwZVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdFZ1ZS5wcm90b3R5cGUuJHBvc3QgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xyXG5cdFx0dmFyIHVybCwgZGF0YSwgY2FsbGJhY2ssIGZ6dHlwZTtcclxuXHJcblx0XHR1cmwgPSBhO1xyXG5cdFx0ZGF0YSA9ICcnO1xyXG5cdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcclxuXHRcdGZ6dHlwZSA9IGZhbHNlO1xyXG5cclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgdHlwZW9mIChiKSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdGNhbGxiYWNrID0gYjtcclxuXHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyICYmIHR5cGVvZiAoYikgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRkYXRhID0gYjtcclxuXHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAzKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgKGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0pID09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdGRhdGEgPSBiO1xyXG5cdFx0XHRcdGZ6dHlwZSA9IGM7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGF0YSA9IGI7XHJcblx0XHRcdFx0Y2FsbGJhY2sgPSBjO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gNCkge1xyXG5cdFx0XHRkYXRhID0gYjtcclxuXHRcdFx0Y2FsbGJhY2sgPSBjO1xyXG5cdFx0XHRmenR5cGUgPSBkO1xyXG5cdFx0fVxyXG5cclxuXHRcdEFqYXhSZXF1ZXN0LmNhbGwodGhpcywge1xyXG5cdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKGRhdGEsIHJlcykge1xyXG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgZGF0YSwgcmVzKVxyXG5cdFx0XHR9LmJpbmQodGhpcyksXHJcblx0XHRcdGZ6dHlwZTogZnp0eXBlXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICoqKuWPkemAgWFqYXjor7fmsYJcclxuXHQgKioqIHVybCDor7fmsYJ1cmwvL2FcclxuXHQgKioqIGRhdGEg5o+Q5Lqk5pWw5o2uLy9iXHJcblx0ICoqKiB0eXBlIOivt+axguexu+Weiy8vY1xyXG5cdCAqKioqKiogY2FsbGJhY2sg6K+35rGC5oiQ5Yqf5Zue6LCDLy9jXFxkXHJcblx0ICpmenR5cGUg5piv5ZCm5aSN5p2C5Zue6LCDXHJcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHRmdW5jdGlvbiBBamF4UmVxdWVzdChzZXR0aW5ncykge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0JHZ1ZS5sb2FkaW5nQ29udHJvbGxlciA9IHRydWU7XHJcblx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHZhciBjX2RhdGEgPSBjbG9uZShzZXR0aW5ncy5kYXRhKTtcclxuXHJcblx0XHRjX2RhdGEgPSAhIXNldHRpbmdzLmZ6dHlwZSA/IEpTT04uc3RyaW5naWZ5KGNfZGF0YSkgOiBjX2RhdGE7XHJcblx0XHR2YXIgY29udGVudFR5cGUgPSAhIXNldHRpbmdzLmZ6dHlwZSA/ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JztcclxuXHRcdHZhciBjYWxsYmFjayA9IHNldHRpbmdzLmNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAvXFw/Ly50ZXN0KHNldHRpbmdzLnVybCkgPyBzZXR0aW5ncy51cmwgKyAnJnJhbmRvbT0nICsgZ2V0VGltZVN0cm1wKCkgOiBzZXR0aW5ncy51cmwgKyAnP3JhbmRvbT0nICsgZ2V0VGltZVN0cm1wKCksXHJcblx0XHRcdHR5cGU6IHNldHRpbmdzLnR5cGUgfHwgJ2dldCcsXHJcblx0XHRcdGRhdGE6IGNfZGF0YSxcclxuXHRcdFx0Y29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0cGFnZXVzZXI6IGdldFNlc3Npb24oJ3VzZXInKSA/IGdldFNlc3Npb24oJ3VzZXInKS51c2VyaWQgOiAnJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuXHRcdFx0XHR2YXIgb2JqID0gKHR5cGVvZiAoZGF0YSkgPT0gJ3N0cmluZycgJiYgL3t8fS8udGVzdChkYXRhKSkgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YTtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0JHZ1ZS5sb2FkaW5nQ29udHJvbGxlciA9IGZhbHNlO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRcdC8v5Y+N57yW56CBXHJcblx0XHRcdFx0ZnVuY3Rpb24gZGVjb2RlKHRhcmdldCkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXQgPT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XHJcblx0XHRcdFx0XHRcdHRhcmdldC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtID09ICdzdHJpbmcnKSBpdGVtID0gZGVjb2RlKGl0ZW0pO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2UgZGVjb2RlKGl0ZW0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHRhcmdldCA9PSAnb2JqZWN0JyAmJiAhIXRhcmdldCkge1xyXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gPT0gJ3N0cmluZycpIHRhcmdldFtrZXldID0gZGVjb2RlKHRhcmdldFtrZXldKTtcclxuXHRcdFx0XHRcdFx0XHRlbHNlIGRlY29kZSh0YXJnZXRba2V5XSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0YXJnZXQuaHRtbCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkZWNvZGUob2JqKTtcclxuXHJcblxyXG5cdFx0XHRcdGFqYXhSZXNDaGVjay5jYWxsKHRoaXMsIG9iaiwgc2V0dGluZ3MsIGNhbGxiYWNrKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Ly9BSkFY6K+35rGC57uT5p2f5ZCO77yMXHJcblx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0aWYgKHhoci5yZXNwb25zZUpTT04ucmVzdWx0ID09IFwibG9naW4taW5kZXhcIikge1xyXG5cdFx0XHRcdFx0XHRpZiAod2luZG93LnBhcmVudCAhPSB3aW5kb3cpIHtcclxuXHRcdFx0XHRcdFx0XHR3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYgPSBodG1sVXJsICsgXCIvbG9naW4uaHRtbFwiO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGxvY2F0aW9uLmhyZWYgPSBodG1sVXJsICsgXCIvbG9naW4uaHRtbFwiO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Ly8gVE9ETzogaGFuZGxlIGV4Y2VwdGlvblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2FqYXgtZXJyb3I6JyArIHNldHRpbmdzLnVybCwgZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIC8v5Yib5bu6bWFpblZ1ZVxyXG5cdGZ1bmN0aW9uIG1haW5WdWUob3B0aW9uKSB7XHJcblx0XHR3aW5kb3cuJHZ1ZSA9IG51bGw7XHJcblxyXG5cdFx0aWYgKCEhb3B0aW9uKSB7XHJcblx0XHRcdHRoaXMuaW5pdChvcHRpb24pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bWFpblZ1ZS5wcm90b3R5cGUgPSB7XHJcblx0XHRkYXRhOiB7fSxcclxuXHRcdG1ldGhvZHM6IHt9LFxyXG5cdFx0Y29tcHV0ZWQ6IHt9LFxyXG5cdFx0d2F0Y2g6IHt9LFxyXG5cdFx0Y3JlYXRlZDogZnVuY3Rpb24gKCkge30sXHJcblx0XHRtb3VudGVkOiBmdW5jdGlvbiAoKSB7fSxcclxuXHJcblx0XHRpbml0OiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRcdHZhciBvYmplY3QgPSAhIW9iaiA/IG9iaiA6IHRoaXM7XHJcblxyXG5cdFx0XHRpZiAoISFvYmopIHtcclxuXHRcdFx0XHRvYmplY3QubW91bnRlZCA9IG9iamVjdC5tb3VudGVkIHx8IGZ1bmN0aW9uICgpIHt9O1xyXG5cdFx0XHRcdG9iamVjdC5jcmVhdGVkID0gb2JqZWN0LmNyZWF0ZWQgfHwgZnVuY3Rpb24gKCkge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ldyBWdWUoe1xyXG5cdFx0XHRcdGVsOiBcIiNtYWluX2NvblwiLFxyXG5cdFx0XHRcdGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBvYmplY3QuZGF0YVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29tcHV0ZWQ6IG9iamVjdC5jb21wdXRlZCxcclxuXHRcdFx0XHR3YXRjaDogb2JqZWN0LndhdGNoLFxyXG5cdFx0XHRcdG1ldGhvZHM6IG9iamVjdC5tZXRob2RzLFxyXG5cdFx0XHRcdG1vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHdpbmRvdy4kdnVlID0gdGhpcztcclxuXHRcdFx0XHRcdG9iamVjdC5tb3VudGVkLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjcmVhdGVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHR3aW5kb3cuJHZ1ZSA9IHRoaXM7XHJcblx0XHRcdFx0XHRmb3JtVmFsaWRhdGVUcmFucygpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMubG9hZGluZ0NvbnRyb2xsZXIgPSB0aGlzLmxvYWRpbmdDb250cm9sbGVyIHx8IGZhbHNlO1xyXG5cdFx0XHRcdFx0dGhpcy5kaWFsb2dWaXNpYmxlID0gdGhpcy5kaWFsb2dWaXNpYmxlIHx8IGZhbHNlO1xyXG5cdFx0XHRcdFx0dGhpcy5zZWFyY2hLZXkgPSB0aGlzLnNlYXJjaEtleSB8fCAnJztcclxuXHRcdFx0XHRcdHRoaXMudGFibGVEYXRhID0gdGhpcy50YWJsZURhdGEgfHwgW107XHJcblxyXG5cdFx0XHRcdFx0b2JqZWN0LmNyZWF0ZWQuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRkYXRhOiBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAzKSB7XHJcblx0XHRcdFx0dmFyIGFfdXJsID0gYSxcclxuXHRcdFx0XHRcdGFfZGF0YV9vYmogPSBiLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc19jYWxsYmFjayA9IGMgfHwgZnVuY3Rpb24gKCkge307XHJcblx0XHRcdFx0KGZ1bmN0aW9uIChhMSwgYjEsIGMxKSB7XHJcblx0XHRcdFx0XHRBamF4UmVxdWVzdChhMSwgYjEsIFwiZ2V0XCIsIGZ1bmN0aW9uIChkYXRhLCByZXMpIHtcclxuXHRcdFx0XHRcdFx0YzEoZGF0YSwgcmVzKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSkoYV91cmwsIGFfZGF0YV9vYmosIHN1Y2Nlc3NfY2FsbGJhY2spXHJcblx0XHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSA0KSB7XHJcblx0XHRcdFx0dmFyIGFfdXJsID0gYSxcclxuXHRcdFx0XHRcdGFfZGF0YV9vYmogPSBiLFxyXG5cdFx0XHRcdFx0YV90eXBlID0gYyxcclxuXHRcdFx0XHRcdHN1Y2Nlc3NfY2FsbGJhY2sgPSBkIHx8IGZ1bmN0aW9uICgpIHt9O1xyXG5cdFx0XHRcdChmdW5jdGlvbiAoYTEsIGIxLCBjMSwgZDEpIHtcclxuXHRcdFx0XHRcdEFqYXhSZXF1ZXN0KGExLCBiMSwgYzEsIGZ1bmN0aW9uIChkYXRhLCByZXMpIHtcclxuXHRcdFx0XHRcdFx0ZDEoZGF0YSwgcmVzKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSkoYV91cmwsIGFfZGF0YV9vYmosIGFfdHlwZSwgc3VjY2Vzc19jYWxsYmFjaylcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuICAgIC8qKlxyXG5cdCAqIOmqjOivgeWxnuaAp+aYr+WQpuWtmOWcqO+8jOS4unRydWXmiJYnJ1xyXG5cdCAqIEBwYXJhbSAge3N0cn0gIHRhcmdldCDlvoXpqozor4Hnm67moIdcclxuXHQgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAg6L+U5Zue5YC877yM5a2Y5Zyo5pyqdHJ1Ze+8jOWPjeS5i2ZhbHNlXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gaXNFeGlzdCh0YXJnZXQpIHtcclxuXHRcdGlmICh0YXJnZXQgIT0gbnVsbCAmJiB0YXJnZXQgIT0gdW5kZWZpbmVkICYmIHRhcmdldCAhPSAnZmFsc2UnKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly/ooajljZXpqozor4HpooTlpITnkIZcclxuXHRmdW5jdGlvbiBmb3JtVmFsaWRhdGVUcmFucygpIHtcclxuXHJcblx0XHR2YXIgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdlbC1mb3JtLWl0ZW0nKSxcclxuXHRcdFx0dHlwZUFyciA9IFsnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJywgJ21ldGhvZCcsICdyZWdleHAnLCAnaW50ZWdlcicsICdmbG9hdCcsICdhcnJheScsICdvYmplY3QnLCAnZW51bScsICdkYXRlJywgJ3VybCcsICdoZXgnLCAnZW1haWwnXTtcclxuXHRcdFx0dHlwZU1hcCA9IFsn5a2X56ym5LiyJywgJ+aVsOWtlycsICfluIPlsJQnLCAnbWV0aG9kJywgJ+ato+WImScsICdpbnRlZ2VyJywgJ+a1rueCueaVsCcsICfmlbDnu4QnLCAn5a+56LGhJywgJ2VudW0nLCAn5pel5pyfJywgJ3VybOWcsOWdgCcsICflk4jluIwnLCAn55S15a2Q6YKu5Lu2J107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgcnVsZXMgPSBbXSxcclxuXHRcdFx0XHRtb2JpbGVWYWxTdHIgPSAnJztcclxuXHJcblx0XHRcdGlmIChpc0V4aXN0KG5vZGVMaXN0W2ldLmdldEF0dHJpYnV0ZSgncmVxdWlyZWQnKSkpIHtcclxuXHRcdFx0XHR2YXIgdHJpZ2dlciA9IFsnYmx1ciddXHJcblx0XHRcdFx0aWYgKGlzRXhpc3Qobm9kZUxpc3RbaV0uZ2V0QXR0cmlidXRlKCdjaGFuZ2UnKSkpIHtcclxuXHRcdFx0XHRcdHRyaWdnZXIucHVzaChcImNoYW5nZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cnVsZXMucHVzaCh7XHJcblx0XHRcdFx0XHQncmVxdWlyZWQnOiAndHJ1ZScsXHJcblx0XHRcdFx0XHQnbWVzc2FnZSc6ICfor7fovpPlhaUnICsgbm9kZUxpc3RbaV0uZ2V0QXR0cmlidXRlKCdsYWJlbCcpLFxyXG5cdFx0XHRcdFx0J3RyaWdnZXInOiB0cmlnZ2VyXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRub2RlTGlzdFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ3JlcXVpcmVkJyk7XHJcblx0XHRcdFx0bm9kZUxpc3RbaV0ucmVtb3ZlQXR0cmlidXRlKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGlzRXhpc3Qobm9kZUxpc3RbaV0uZ2V0QXR0cmlidXRlKCdtaW4nKSkpIHtcclxuXHRcdFx0XHRydWxlcy5wdXNoKHtcclxuXHRcdFx0XHRcdCdtaW4nOiBwYXJzZUludChub2RlTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ21pbicpKSxcclxuXHRcdFx0XHRcdCdtZXNzYWdlJzogJ+iHs+Wwkei+k+WFpScgKyBub2RlTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ21pbicpICsgJ+S4quWtl+espicsXHJcblx0XHRcdFx0XHQndHJpZ2dlcic6ICdibHVyJ1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0bm9kZUxpc3RbaV0ucmVtb3ZlQXR0cmlidXRlKCdtaW4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGlzRXhpc3Qobm9kZUxpc3RbaV0uZ2V0QXR0cmlidXRlKCdtYXgnKSkpIHtcclxuXHRcdFx0XHRydWxlcy5wdXNoKHtcclxuXHRcdFx0XHRcdCdtYXgnOiBwYXJzZUludChub2RlTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ21heCcpKSxcclxuXHRcdFx0XHRcdCdtZXNzYWdlJzogJ+iHs+Wkmui+k+WFpScgKyBub2RlTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ21heCcpICsgJ+S4quWtl+espicsXHJcblx0XHRcdFx0XHQndHJpZ2dlcic6ICdibHVyJ1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0bm9kZUxpc3RbaV0ucmVtb3ZlQXR0cmlidXRlKCdtYXgnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGlzRXhpc3Qobm9kZUxpc3RbaV0uZ2V0QXR0cmlidXRlKCdtb2JpbGUnKSkpIHtcclxuXHRcdFx0XHRtb2JpbGVWYWxTdHIgPSAneyBcInZhbGlkYXRvclwiOnZhbGlkYXRvck9iai5tb2JpbGUsXCJ0cmlnZ2VyXCI6IFtcImJsdXJcIiwgXCJjaGFuZ2VcIl19JztcclxuXHRcdFx0XHRub2RlTGlzdFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ21vYmlsZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpc0V4aXN0KG5vZGVMaXN0W2ldLmdldEF0dHJpYnV0ZSgnYXJyYXl2YWx1ZScpKSkge1xyXG5cdFx0XHRcdG1vYmlsZVZhbFN0ciA9ICd7IFwidmFsaWRhdG9yXCI6dmFsaWRhdG9yT2JqLmFycmF5dmFsdWUsXCJ0cmlnZ2VyXCI6IFtcImJsdXJcIiwgXCJjaGFuZ2VcIl19JztcclxuXHRcdFx0XHRub2RlTGlzdFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ2FycmF5dmFsdWUnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0eXBlQXJyLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0aWYgKG5vZGVMaXN0W2ldLmdldEF0dHJpYnV0ZSh0eXBlQXJyW2pdKSAhPSBudWxsICYmIG5vZGVMaXN0W2ldLmdldEF0dHJpYnV0ZSh0eXBlQXJyW2pdKSAhPSB1bmRlZmluZWQgJiYgbm9kZUxpc3RbaV0uZ2V0QXR0cmlidXRlKHR5cGVBcnJbal0pICE9ICdmYWxzZScpIHtcclxuXHRcdFx0XHRcdHJ1bGVzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHQndHlwZSc6IHR5cGVBcnJbal0sXHJcblx0XHRcdFx0XHRcdCdtZXNzYWdlJzogJ+ivt+i+k+WFpeato+ehrueahCcgKyB0eXBlTWFwW2pdICsgJ+agvOW8jycsXHJcblx0XHRcdFx0XHRcdCd0cmlnZ2VyJzogWydibHVyJywgJ2NoYW5nZSddXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0XHR2YXIgb2xkUnVsZXMgPSBub2RlTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJzpydWxlcycpIHx8ICdbXScsXHJcblx0XHRcdFx0c2xpY2VkUnVsZXMgPSBKU09OLnN0cmluZ2lmeShydWxlcykuc2xpY2UoMSwgLTEpO1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gZG90QnVpbGRlcihzdHIpIHtcclxuXHRcdFx0XHRyZXR1cm4gISFzdHIgPyAnLCcgOiAnJ1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbmV3UnVsZXNTdHIgPSAnWycgKyBzbGljZWRSdWxlcyArIGRvdEJ1aWxkZXIoc2xpY2VkUnVsZXMpICsgbW9iaWxlVmFsU3RyICsgZG90QnVpbGRlcihtb2JpbGVWYWxTdHIpICsgb2xkUnVsZXMuc2xpY2UoMSwgLTEpICsgJ10nO1xyXG5cdFx0XHRuZXdSdWxlc1N0ciA9IG5ld1J1bGVzU3RyLnJlcGxhY2UoL1wiL2csIFwiJ1wiKTtcclxuXHRcdFx0bm9kZUxpc3RbaV0uc2V0QXR0cmlidXRlKCc6cnVsZXMnLCBuZXdSdWxlc1N0cik7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IG1haW5WdWU7XHJcbn0pXHJcbiIsIi8qKlxyXG4gKiBhamF4IGNvZGXmn6Xor6JcclxuICogQHBhcmFtICB7T2JqZWN0fSAgIG9iaiAgICAgIOi/lOWbnueahOWvueixoVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgc2V0dGluZ3Mg5o6l5Y+j55u45YWz5rWL6K+V77yI6Z2e5b+F6aG777yJXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayDlm57osIPlh73mlbBcclxuICogQHJldHVybiB7bnVsbH0gICAgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAqL1xyXG53aW5kb3cuYWpheFJlc0NoZWNrID0gZnVuY3Rpb24gKG9iaiwgc2V0dGluZ3MsIGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xyXG5cdFx0Y2FsbGJhY2sgPSBzZXR0aW5ncztcclxuXHR9XHJcblxyXG5cdHZhciBzd2l0Y2hPYmogPSB7XHJcblx0XHQndic6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ISFjYWxsYmFjayAmJiBjYWxsYmFjayhvYmoudGRhdGEsIG9iaik7XHJcblx0XHR9LFxyXG5cdFx0J3BnbGlzdCc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ISFjYWxsYmFjayAmJiBjYWxsYmFjayhvYmopO1xyXG5cdFx0fSxcclxuXHRcdCd2YWxlcnJvcic6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCFJc051bGxPckVtcHR5KG9iai5tc2cpKSB7XHJcblx0XHRcdFx0U2hvd01zZ0JveChvYmoubXNnLCBcImVycm9yXCIpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdCdsb2dpbi1pbmRleCc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0U2hvd01zZ0JveChvYmoubXNnLCAnZXJyb3InLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGNvbXBhbnkgPSBnZXRTZXNzaW9uKCdjb21wYW55JyksXHJcblx0XHRcdFx0XHR1c2VyID0gZ2V0U2Vzc2lvbigndXNlcicpO1xyXG5cdFx0XHRcdHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcblx0XHRcdFx0aWYgKCFjb21wYW55KSB7XHJcblx0XHRcdFx0XHRpZiAodXNlci51c2VyaWQgPT0gJzEnKSB7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy50b3AubG9jYXRpb24uaHJlZiA9IChodG1sVXJsICsgXCIvcGxhdGxvZ2luLmh0bWxcIik7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHdpbmRvdy50b3AubG9jYXRpb24uaHJlZiA9IChodG1sVXJsICsgXCIvbG9naW4uaHRtbFwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0d2luZG93LnRvcC5sb2NhdGlvbi5ocmVmID0gKCcvJyArIGNvbXBhbnkgKyBcIi9sb2dpblwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdCdqdW1wLXVybCc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0U2hvd01zZ0JveChvYmoubXNnLCAnaW5mbycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYgPSAoaHRtbFVybCArIG9iai51cmwpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiAhIXN3aXRjaE9ialtvYmouY29kZV0gPyBzd2l0Y2hPYmpbb2JqLmNvZGVdKCkgOiAoL14odGhyb3ctKS8udGVzdChvYmouY29kZSkgPyAoZnVuY3Rpb24oKXtcclxuXHRcdG9iai5jb2RlID0gb2JqLmNvZGUuc3BsaXQoJ3Rocm93LScpWzFdO1xyXG5cdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2sob2JqKTtcclxuXHR9KCkpIDogU2hvd01zZ0JveChvYmoubXNnLCAnZXJyb3InLCBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpKTtcclxuXHR9KSk7XHJcblxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqXHJcbiAqKiogTm90aWZpY2F0aW9uIOa2iOaBr+mAmuefpVxyXG4gKioqIG1zZyDmj5DnpLrkv6Hmga9cclxuICoqKiB0eXBlIOa2iOaBr+exu+Wei1xyXG4gKioqKioqKioqKioqKioqKioqL1xyXG53aW5kb3cuU2hvd01zZyA9IGZ1bmN0aW9uIChtc2csIHR5cGUsIGNhbGxiYWNrKSB7XHJcblx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcclxuXHR3aW5kb3cudG9wLiR2dWUuJG5vdGlmeSh7XHJcblx0XHRtZXNzYWdlOiBtc2csXHJcblx0XHR0eXBlOiB0eXBlIHx8IFwid2FybmluZ1wiLFxyXG5cdFx0b25DbG9zZTogY2FsbGJhY2tcclxuXHR9KTtcclxuXHQvLyRtZXNzYWdlKHsgc2hvd0Nsb3NlOiB0cnVlLCBtZXNzYWdlOiBtc2csIHR5cGU6IHR5cGUgfHwgXCJ3YXJuaW5nXCIsIGR1cmF0aW9uOiAxNTAwIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogY29uZmlybeehruiupOmAieaLqeahhlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1zZyAg5o+Q56S65L+h5oGvXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZSDmj5DnpLrnsbvlnotcclxuICogQHBhcmFtICB7ZnVuY3Rpb259IGNiMSAg56Gu6K6k5Zue6LCDXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYjIgIOWPlua2iOWbnuiwg1xyXG4gKiBAcmV0dXJuIHtudWxsfSAgICAgIOaXoOi/lOWbnuWAvFxyXG4gKi9cclxud2luZG93LlNob3dDb25maXJtID0gZnVuY3Rpb24gKG1zZywgdHlwZSwgY2IxLCBjYjIpIHtcclxuXHRjYjEgPSBjYjEgfHwgZnVuY3Rpb24gKCkge307XHJcblx0Y2IyID0gY2IyIHx8IGZ1bmN0aW9uICgpIHt9O1xyXG5cdHdpbmRvdy50b3AuJHZ1ZS4kY29uZmlybShtc2csICfmj5DnpLonLCB7XHJcblx0XHRjb25maXJtQnV0dG9uVGV4dDogJ+ehruWumicsXHJcblx0XHRjYW5jZWxCdXR0b25UZXh0OiAn5Y+W5raIJyxcclxuXHRcdHR5cGU6IHR5cGUgfHwgJ3dhcm5pbmcnLFxyXG5cdFx0c2hvd0Nsb3NlOiBmYWxzZSxcclxuXHRcdGNhbGxiYWNrOiBmdW5jdGlvbiAoYWN0aW9uLCBpbnN0YW5jZSkge1xyXG5cdFx0XHRpZiAoYWN0aW9uID09ICdjb25maXJtJykge1xyXG5cdFx0XHRcdGNiMSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNiMigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG4iLCIvKipcclxuICog5a+5RGF0ZeeahOaJqeWxle+8jOWwhiBEYXRlIOi9rOWMluS4uuaMh+WumuagvOW8j+eahFN0cmluZ1xyXG4gKiDmnIgoTSnjgIHml6UoZCnjgIExMuWwj+aXtihoKeOAgTI05bCP5pe2KEgp44CB5YiGKG0p44CB56eSKHMp44CB5ZGoKEUp44CB5a2j5bqmKHEpIOWPr+S7peeUqCAxLTIg5Liq5Y2g5L2N56ymXHJcbiAqIOW5tCh5KeWPr+S7peeUqCAxLTQg5Liq5Y2g5L2N56ym77yM5q+r56eSKFMp5Y+q6IO955SoIDEg5Liq5Y2g5L2N56ymKOaYryAxLTMg5L2N55qE5pWw5a2XKVxyXG4gKiBlZzpcclxuICogKG5ldyBEYXRlKCkpLnBhdHRlcm4oXCJ5eXl5LU1NLWRkIGhoOm1tOnNzLlNcIikgPT0+IDIwMDYtMDctMDIgMDg6MDk6MDQuNDIzXHJcbiAqIChuZXcgRGF0ZSgpKS5wYXR0ZXJuKFwieXl5eS1NTS1kZCBFIEhIOm1tOnNzXCIpID09PiAyMDA5LTAzLTEwIOS6jCAyMDowOTowNFxyXG4gKiAobmV3IERhdGUoKSkucGF0dGVybihcInl5eXktTU0tZGQgRUUgaGg6bW06c3NcIikgPT0+IDIwMDktMDMtMTAg5ZGo5LqMIDA4OjA5OjA0XHJcbiAqIChuZXcgRGF0ZSgpKS5wYXR0ZXJuKFwieXl5eS1NTS1kZCBFRUUgaGg6bW06c3NcIikgPT0+IDIwMDktMDMtMTAg5pif5pyf5LqMIDA4OjA5OjA0XHJcbiAqIChuZXcgRGF0ZSgpKS5wYXR0ZXJuKFwieXl5eS1NLWQgaDptOnMuU1wiKSA9PT4gMjAwNi03LTIgODo5OjQuMThcclxu5L2/55So77yaKGV2YWwodmFsdWUucmVwbGFjZSgvXFwvRGF0ZVxcKChcXGQrKVxcKVxcLy9naSwgXCJuZXcgRGF0ZSgkMSlcIikpKS5wYXR0ZXJuKFwieXl5eS1NLWQgaDptOnMuU1wiKTtcclxuICovXHJcbndpbmRvdy5EYXRlLnByb3RvdHlwZS5wYXR0ZXJuID0gZnVuY3Rpb24gKGZtdCkge1xyXG5cdHZhciBvID0ge1xyXG5cdFx0XCJNK1wiOiB0aGlzLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG5cdFx0XCJkK1wiOiB0aGlzLmdldERhdGUoKSwgLy/ml6VcclxuXHRcdFwiaCtcIjogdGhpcy5nZXRIb3VycygpICUgMTIgPT0gMCA/IDEyIDogdGhpcy5nZXRIb3VycygpICUgMTIsIC8v5bCP5pe2XHJcblx0XHRcIkgrXCI6IHRoaXMuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuXHRcdFwibStcIjogdGhpcy5nZXRNaW51dGVzKCksIC8v5YiGXHJcblx0XHRcInMrXCI6IHRoaXMuZ2V0U2Vjb25kcygpLCAvL+enklxyXG5cdFx0XCJxK1wiOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG5cdFx0XCJTXCI6IHRoaXMuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5JcclxuXHR9O1xyXG5cdHZhciB3ZWVrID0ge1xyXG5cdFx0XCIwXCI6IFwiL3U2NWU1XCIsXHJcblx0XHRcIjFcIjogXCIvdTRlMDBcIixcclxuXHRcdFwiMlwiOiBcIi91NGU4Y1wiLFxyXG5cdFx0XCIzXCI6IFwiL3U0ZTA5XCIsXHJcblx0XHRcIjRcIjogXCIvdTU2ZGJcIixcclxuXHRcdFwiNVwiOiBcIi91NGU5NFwiLFxyXG5cdFx0XCI2XCI6IFwiL3U1MTZkXCJcclxuXHR9O1xyXG5cdGlmICgvKHkrKS8udGVzdChmbXQpKSB7XHJcblx0XHRmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsICh0aGlzLmdldEZ1bGxZZWFyKCkgKyBcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcclxuXHR9XHJcblx0aWYgKC8oRSspLy50ZXN0KGZtdCkpIHtcclxuXHRcdGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKChSZWdFeHAuJDEubGVuZ3RoID4gMSkgPyAoUmVnRXhwLiQxLmxlbmd0aCA+IDIgPyBcIi91NjYxZi91NjcxZlwiIDogXCIvdTU0NjhcIikgOiBcIlwiKSArIHdlZWtbdGhpcy5nZXREYXkoKSArIFwiXCJdKTtcclxuXHR9XHJcblx0Zm9yICh2YXIgayBpbiBvKSB7XHJcblx0XHRpZiAobmV3IFJlZ0V4cChcIihcIiArIGsgKyBcIilcIikudGVzdChmbXQpKSB7XHJcblx0XHRcdGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT0gMSkgPyAob1trXSkgOiAoKFwiMDBcIiArIG9ba10pLnN1YnN0cigoXCJcIiArIG9ba10pLmxlbmd0aCkpKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGZtdDtcclxufVxyXG5cclxud2luZG93LkRhdGUucHJvdG90eXBlLkZvcm1hdCA9IGZ1bmN0aW9uIChmbXQpIHsgLy9hdXRob3I6IG1laXp6XHJcblx0dmFyIG8gPSB7XHJcblx0XHRcIk0rXCI6IHRoaXMuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcblx0XHRcImQrXCI6IHRoaXMuZ2V0RGF0ZSgpLCAvL+aXpVxyXG5cdFx0XCJIK1wiOiB0aGlzLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcblx0XHRcIm0rXCI6IHRoaXMuZ2V0TWludXRlcygpLCAvL+WIhlxyXG5cdFx0XCJzK1wiOiB0aGlzLmdldFNlY29uZHMoKSwgLy/np5JcclxuXHRcdFwicStcIjogTWF0aC5mbG9vcigodGhpcy5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuXHRcdFwiU1wiOiB0aGlzLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcblx0fTtcclxuXHRpZiAoLyh5KykvLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAodGhpcy5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XHJcblx0Zm9yICh2YXIgayBpbiBvKVxyXG5cdFx0aWYgKG5ldyBSZWdFeHAoXCIoXCIgKyBrICsgXCIpXCIpLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PSAxKSA/IChvW2tdKSA6ICgoXCIwMFwiICsgb1trXSkuc3Vic3RyKChcIlwiICsgb1trXSkubGVuZ3RoKSkpO1xyXG5cdHJldHVybiBmbXQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIOeJueauiuWtl+espui9rOS5ieWPiuWPjei9rOS5iVxyXG4gKiBAcGFyYW0gIHtCb29sZWFufSBlbmNvZGUg57G75Z6LdHJ1ZeS4uui9rOS5iWZhbHNl5Li65Y+N6L2s5LmJXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgIOe7k+aenOWtl+espuS4slxyXG4gKi9cclxud2luZG93LlN0cmluZy5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uIChlbmNvZGUpIHtcclxuXHR2YXIgcmVwbGFjZSA9IFtcIiYjMzk7XCIsIFwiJ1wiLFxyXG5cdFx0XCImcXVvdDtcIiwgJ1wiJyxcclxuXHRcdFwiJm5ic3A7XCIsIFwiIFwiLFxyXG5cdFx0XCImZ3Q7XCIsIFwiPlwiLFxyXG5cdFx0XCImbHQ7XCIsIFwiPFwiLFxyXG5cdFx0XCImYW1wO1wiLCBcIiZcIixcclxuXHRcdFwiJnllbjtcIiwgXCLCpVwiLFxyXG5cdFx0XCImbHNxdW87XCIsIFwi4oCYXCIsXHJcblx0XHRcIiZyc3F1bztcIiwgXCLigJlcIixcclxuXHRcdFwiJmhlbGxpcDtcIiwgXCLigKZcIixcclxuXHRcdFwiJmxkcXVvO1wiLCBcIuKAnFwiLFxyXG5cdFx0XCImcmRxdW87XCIsIFwi4oCdXCIsXHJcblx0XHRcIiZtZGFzaDtcIiwgXCLigJRcIlxyXG5cdF07XHJcblx0aWYgKGVuY29kZSkge1xyXG5cdFx0cmVwbGFjZS5yZXZlcnNlKCk7XHJcblx0fVxyXG5cdGZvciAodmFyIGkgPSAwLCBzdHIgPSB0aGlzOyBpIDwgcmVwbGFjZS5sZW5ndGg7IGkgKz0gMikge1xyXG5cdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChyZXBsYWNlW2ldLCAnZycpLCByZXBsYWNlW2kgKyAxXSk7XHJcblx0fVxyXG5cdHJldHVybiBzdHI7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=