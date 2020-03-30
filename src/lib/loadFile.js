function loadFile (src, callback) {
    if (!src) {
        throw new Error('请指定要加载的文件路径');
        return false;
    };

    var loadChain = [],
        loadChainIndex = 0;

    var regArr = [
        {
            type: 'js',
            reg: /(\.js)$/,
            handler: function(src) {
                loadChain.push(function(next) {
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = src;
                    s.onload = function(e) {
                        next(e)
                    };
                    document.body.appendChild(s);
                });
            }
        }, {
            type: 'css',
            reg: /(\.css)$/,
            handler: function(src) {
                var s = document.createElement('link');
                s.rel = 'stylesheet';
                s.href = src;
                document.head.appendChild(s);
            }
        }
    ];

    function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    };

    function load (fileSrc) {
        regArr.forEach(function(item) {
            if(item.reg.test(fileSrc)) {
                item.handler(fileSrc);
            };
        });
    };

    var switchObj = {
        string: function() {
            load(src);
        },
        array: function() {
            src.forEach(function(item) {
                load(item);
            });
        }
    };

    switchObj[getType(src)]();

    if(!!loadChain.length) {
        function run() {
            loadChain[loadChainIndex](function() {
                if(loadChainIndex < (loadChain.length - 1)) {
                    loadChainIndex ++;
                    run();
                } else {
                    callback && callback();
                };
            });
        };
        run();
    }

    return true;
};

module.exports = loadFile;
