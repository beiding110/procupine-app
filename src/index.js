require('@/lib/app')(window)
require('@/lib/window')

window.Chain = require('@/lib/Chain')
window.Hasher = require('@/lib/Hasher')
window.ShadeBox = require('@/lib/Shade')
// window.eObj = require('@/lib/echarts-baseclass')
window.win = require('@/lib/win')

require('@/proto/Date')
require('@/proto/String')

var mainVue = require('@/lib/mainVue')

module.exports = mainVue;
