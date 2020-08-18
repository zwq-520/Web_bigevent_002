$(function () {
    //1 注册点击切换登录和注册界面
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2 自定义 验证规则  
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 密码的验证规则
        pwd: [
            /^[\S]{6,16}$/, "密码必须6-16位，且不能存在空格"
        ],
        // 确认密码的验证规则 value形参接收确认密码框的内容
        repwd: function (value) {
            // 获取密码框的内容 然后进行是不是全等判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次密码输入不一样"
            }
        }

    })

    // 3 注册表单功能
    $('#form_reg').on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功,请登录")
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })

    // 4 登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form_login').serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('res.message')
                }
                layer.msg('恭喜登录成功')
                // 要把token值存下来后面 做入口认证用
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})