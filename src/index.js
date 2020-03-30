require('@/lib/window');

(function(owner) {
    require('@/lib/app')(owner);
    owner.Chain = require('@/lib/Chain');
    owner.Hasher = require('@/lib/Hasher');
    //owner.ShadeBox = require('@/lib/Shade');
    // owner.eObj = require('@/lib/echarts-baseclass');
    owner.win = require('@/lib/win');
    // owner.loadFile = require('@/lib/loadFile');
}(window));

require('@/proto/Date');
require('@/proto/String');

var mainVue = require('@/lib/mainVue');

module.exports = mainVue;
