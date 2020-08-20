var form = layui.form
$(function () {
    //  1定义昵称输入规则
    // var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1~6之间'
            }
        }
    })

    // 2 获取用户登录信息
    initUserInfo()
    var layer = layui.layer
    // 获取用户表单  定义为全局函数 后面还要使用
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //  成功后 把数据渲染到表单页面
                // form.val('formUserInfo', res.data)
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3 重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 4 提交修改功能  整个表单提交submit事件
    $('.layui-form').on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('提交更改成功')
                // 调用父框架的 获取用户信息然后渲染头像的方法
                window.parent.getUserInfo()
            }
        })
    })

})
