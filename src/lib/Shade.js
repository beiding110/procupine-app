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
