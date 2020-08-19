var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    // alert(params.url)


    // 统一设置 请求头信息 用于后面的验证接口
    if (params.url.indexOf(/my/) !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 3 拦截客户直接输入地址跳转   
    //  ajax  里面有一个函数 complete  请求数据是否成功 都会触发的
    params.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1 清除 本地缓存 
            localStorage.removeItem('token')
            // 2 跳转到登录界面
            location.href = '/login.html'
        }
    }

})