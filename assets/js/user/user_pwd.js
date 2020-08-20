$(function () {
    // 1 定义重置密码的 验证规则
    var form = layui.form
    form.verify({
        // 密码校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 新密码验证 不能与原密码一样
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一样'
            }
        },

        //  确认密码规则
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的新密码不一致'
            }
        }
    })

    // 修改密码的提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })

})