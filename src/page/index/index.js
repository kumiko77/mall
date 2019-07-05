var _mm = require('../../util/mm')

_mm.request({
    url: '/product/list.do?keyword=1',
    success: function (res) {
        console.log(res)
    },
    error: function (errorMsg) {
        console.log(errorMsg)
    }
})