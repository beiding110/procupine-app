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
