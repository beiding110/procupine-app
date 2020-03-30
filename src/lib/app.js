module.exports = function(owner) {
    require('./location.js')(owner);
    require('./storage.js')(owner);

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
            var toInt = Math.floor(n * 1000) + '';
            s += (digit[Number(toInt.slice(-(3 - i), -(2 - i)))] + fraction[i]).replace(/零./, '');

            // s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
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

    /**
    * 获取变量类型
    * @param  {All} obj 待获取类型的变量
    * @return {String}     变量类型
    */
    owner.getType = function(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
}
