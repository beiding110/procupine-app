# procupine-app

[完整文档](https://beiding110.github.io/procupine-app-document/#/)

 # app.js
 *存放常用方法及对象

 ## export
 * mainVue类

 ## Vue prototype 拓展
 * $ajax
 * $get
 * $post

 ## window对象拓展
 * ajaxResCheck ajax结果匹配
 * ShowMsgBox 消息弹框
 * ShowMsg 消息通知
 * ShowConfirm 确认弹框

 ## Date对象拓展
 * pattern 日期格式化
 * Format 日期格式化

 ## string对象拓展
 * html 特殊字符转义及反转义

 ## owner对象
 * ajax 用法同jquery中的$.ajax
 * validatorObj.mobile 手机格式验证
 * validatorObj.arrayvalue 数组对象验证
 * Chain 责任链类
 * *link 责任链节点
 * *run 责任链运行
 * IsNullOrEmpty 验证非空
 * inAttr 验证是否存在于标签属性
 * enpty_obj 清空对象内容
 * IsNumber 验证是否数字
 * clone 对象深度复制
 * arrBuildTree 数组拼树
 * treeBreakArr 树拆数组
 * getSearch 获取window.location.search中某个key的值
 * toSearch 将对象序列化成location.search格式
 * getHash 获取window.location.hash中某个key的值
 * setHash 将设定的键值置入window.location.hash中
 * getLocal 获取localStorage里的数据
 * setLocal 将值存入localStorage
 * getSession 获取sessionStorage里的数据
 * setSession 将值存入sessionStorage
 * setRandomId 根据ref在dom结构上生成一个随机数id
 * sortorder 格式化排序顺序关键字
 * GetGuid 获取文件guid
 * getObjByValue 根据值匹配数组中的对象
 * timeToDate 切分日期为年月日
 * getRandom 生成参数长度的随机数字符串
 * getTimeStrmp 生成当前时间戳
 * floatToPercent 将小数转化为百分数
 * wxPay 调起微信支付
 * downloader 下载文件
 * imgToBase64 图片转base64编码
 * inheritPrototype 原型链继承
 * Hasher 导航栏hash值监听反馈类
 * *push 类比history对象pushState方法
 * *raplace 类比history对象replaceState方法
 * loadScript 异步加载js
 * Arabia_to_Chinese 数字转中文金额；
 * mixin 将对象混入对象
 * ShadeBox 遮罩层类
 * * show 显示遮罩层
 * * hide 隐藏遮罩层
