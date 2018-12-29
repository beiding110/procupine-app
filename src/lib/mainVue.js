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
            error: function(XHR, textStatus, errorThrown){
                var switchObj = {
                    '0': '请求发生错误，请检查网络及登录状态',
                    '401': '访问被拒绝',
                    '403': '禁止访问',
                    '404': '未找到',
                    '405': '方法不被允许',
                    '406': '客户端浏览器不接受所请求页面的MIME类型',
                    '407': '要求进行代理身份验证',
                    '412': '前提条件失败',
                    '413': '请求实体太大',
                    '414': '请求URI太长',
                    '415': '不支持的媒体类型',
                    '416': '所请求的范围无法满足',
                    '417': '执行失败',
                    '423': '锁定的错误',
                    '500': '服务器错误',
                    '502': 'Web服务器用作网关或代理服务器时收到了无效响应',
                    '503': '服务不可用',
                    '504': '请求超时，请检查网络'
                };
				ShowMsg((XHR.status && switchObj[XHR.status]) ? (XHR.status + '：' + switchObj[XHR.status]) : '请求失败，请重试');
				console.error('ajax-error:'+settings.url);
                console.warn(XHR);
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
				rules.push.apply(rules, [{
					'required': 'true',
					'message': '请输入' + nodeList[i].getAttribute('label'),
					'trigger': trigger
				}]);

				mobileValStr += (dotBuilder(mobileValStr) + '{"validator": validatorObj.required,"trigger": ["blur", "change"]}');
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
				mobileValStr += (dotBuilder(mobileValStr) + '{ "validator":validatorObj.mobile,"trigger": ["blur", "change"]}');
				nodeList[i].removeAttribute('mobile');
			}
			if (isExist(nodeList[i].getAttribute('arrayvalue'))) {
				mobileValStr += (dotBuilder(mobileValStr) + '{ "validator":validatorObj.arrayvalue,"trigger": ["blur", "change"]}');
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

    //通用方法
	var validatorObj = {
		required: function(rules, value, callback) {
			if(typeof value === 'string') {
				if(!value.replace(/^\s+|\s+$/g,"")) {
					return callback(new Error('内容不能为空格'))
				}
			}
			callback();
		},
		mobile: function (rules, value, callback) {
			if (!/^[1][0-9]{10}$/.test(value)) {
				return callback(new Error('手机号格式错误'));
			}
			callback();
		},
		arrayvalue: function (rules, value, callback) {
			if (!value.join()) {
				return callback(new Error('请填写其它'));
			}
			callback();
		}
	}

    module.exports = mainVue;
})
