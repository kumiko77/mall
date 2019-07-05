var _mm = {
    request: function (param) {
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dateType: param.type || 'json',
            data: param.data | '',
            success: function (res) {
                if (0 === res.status) {
                    //请求成功
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                } 
                else if (10 === res.status) {
                    //没有登陆状态需要强制登陆  
                    doLogin();
                }
                else if (1 === res.status) {
                    //请求数据错误
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        });
    },
    //登陆处理
    doLogin: () => {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.herf);
    }
};

module.exports = _mm;