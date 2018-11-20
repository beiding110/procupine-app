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
