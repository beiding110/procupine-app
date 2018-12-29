var eObj = (function(owner){
    function BaseClass(obj) {
        return this.init(obj);
    };
    BaseClass.prototype = {
        init: function(obj) {
            return {
                title: {
                    show: !!obj.title ? true : false,
                    text: obj.title || '',
                    x:'center',
                    y: 10,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '16px'
                    }
                },
                color: obj.color || [],
                legend: {
                    data: !!obj.legend ? (!!obj.legend.data ? obj.legend.data : obj.legend) : '',
                    x: 'center',
                    y: 35,
                    textStyle: {
                        fontSize: '12px'
                    },
                    itemWidth: 12,
                    itemHeight: 12
                },
                grid: {
                    top: 85,
                    left: 28,
                    right: 45,
                    bottom: 28,
                    containLabel: true
                },
                toolbox: {

                },
                series: []
            }
        }
    };

    function toolboxObj(obj) {
        obj = obj || {};
        return {
            show: (obj.show!==undefined && obj.show!=null) ? obj.show : true,
            orient: obj.orient || 'vertical',
            right: obj.right || 'right',
            top: obj.top || 'center',
            feature: {
                mark: {show: true},
                magicType: {show: !!obj.feature ? obj.feature.magicType.show : true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        }
    }

    function dataZoomObj(obj) {
        obj = obj || {};
        return [
            {
                show: !!obj.show ? obj.show : false
            },{
                type: 'inside'
            }
        ]
    }

    function Lines(obj) {
        return this.init(obj);
    };
    Lines.prototype = {
        init: function(obj) {
            var baseObj = new BaseClass(obj);

            baseObj.yAxis = !!obj.yAxis ? obj.yAxis : {
                type: 'value',
                splitLine: {
                    show: false
                }
            };
            baseObj.xAxis = !!obj.xAxis ? obj.xAxis : {
                type: 'category',
                boundaryGap: false,
                nameTextStyle: {
                    fontSize: 11
                },
                data: !!obj.xAxis.data ? obj.xAxis.data : obj.xAxis
            };
            baseObj.series = obj.series.map(function(item) {
                item.type = 'line'
                return item;
            });

            baseObj.tooltip = {
                trigger: 'axis',
                axisPointer: {
                    label: {
                        show: true
                    }
                }
            };

            baseObj.toolbox = new toolboxObj(obj.toolbox);
            baseObj.dataZoom = new dataZoomObj(obj.dataZoom);

            return baseObj;
        }
    };

    function Pie(obj) {
        return this.init(obj)
    };
    Pie.prototype = {
        init: function(obj) {
            var baseObj = new BaseClass(obj);

            var seriesData = !!obj.series.data ? obj.series.data : obj.series;

            var seriesItem = function(item){
                return {
                    type: 'pie',
                    label: {
                        normal: {
                            formatter: '{c}，{d}%'
                        }
                    },
                    center: ['50%', '60%'],
                    radius: '50%',
                    data: item
                }
            };
            if(typeof seriesData == 'object' && Array.isArray(seriesData)){
                if(Array.isArray(seriesData[0])) {
                    baseObj.series = seriesData.map(function(item) {
                        return seriesItem(item);
                    })
                }else {
                    baseObj.series = seriesItem(seriesData);
                }
            };

            baseObj.toolbox = new toolboxObj({
                feature: {
                    magicType: {
                        show: false
                    }
                }
            })

            return baseObj;
        }
    }

    function Bar(obj) {
        return this.init(obj);
    };
    Bar.prototype = {
        init: function(obj) {
            var baseObj = new Lines(obj);
            baseObj.series.forEach(function(item) {
                item.type = 'bar';
                item.barGap = 0;
            });

            baseObj.tooltip.axisPointer.type = 'shadow';
            return baseObj;
        }
    }

    function BarLine(obj) {
        return this.init(obj);
    };
    BarLine.prototype = {
        init: function(obj) {
            var baseObj = new Lines(obj);

            baseObj.series = [];

            baseObj.tooltip.axisPointer.type = 'shadow';

            var itemObj = function(item, type){
                return {
                    type: type || 'bar',
                    data: item.data,
                    name: item.name,
                    yAxisIndex: type=='bar' ? 0 : 1,
                }
            };
            var mixinHandler = function(type) {
                if(!!obj[type] && Array.isArray(obj[type])){
                    baseObj.series.push.apply(baseObj.series, obj[type].map(function(item) {
                        return itemObj(item, type);
                    }));
                }else if(!!obj[type] && !Array.isArray(obj[type])){
                    baseObj.series.push(itemObj(obj[type], type));
                }
            }

            mixinHandler('bar');
            mixinHandler('line');

            return baseObj;
        }
    }

    function Radar(obj) {
        return this.init(obj);
    }
    Radar.prototype = {
        init: function(obj) {
            var baseObj = new BaseClass(obj);

            baseObj.legend.data = Array.isArray(obj.legend) ? obj.legend : (typeof obj.legend === 'object' ? obj.legend.data : []);

            baseObj.radar = {
                center: ['50%', '65%'],
                indicator: !!obj.radar ? obj.radar.indicator || [] : [],
                splitArea: {
                    show: false
                },
                splitLine: {
                lineStyle: {
                        color: [
                            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                        ].reverse()
                    }
                },
            };

            baseObj.tooltip = {};

            if(Array.isArray(obj.series)) {
                baseObj.series = {
                    type: 'radar',
                    data: obj.series.map(function(item) {
                        item.lineStyle = {
                            normal: {}
                        }
                        return item;
                    })
                }
            }else if(typeof obj.series == 'object') {
                baseObj.series = {
                    type: 'radar',
                    data: obj.series.data.map(function(item) {
                        item.lineStyle = {
                            normal: {}
                        }
                        return item;
                    })
                }
            }


            return baseObj;
        }
    };

    return {
        Lines: Lines,
        Pie: Pie,
        Bar: Bar,
        BarLine: BarLine,
        Radar: Radar
    }
})()

module.exports = eObj
