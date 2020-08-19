$(function () {
    // 1 获取用户信息 渲染头像
    getUserInfo()

    // 2 退出功能
    $('#btnLogout').on('click', function () {
        // 弹出提示框 是否退出
        layer.confirm('是否要确定退出', { icon: 3, title: '提示' }, function (index) {
            //1 清除 本地缓存 
            localStorage.removeItem('token')
            // 2 跳转到登录界面
            location.href = '/login.html'
            // 下面是 清除提示框的
            layer.close(index);
        })
    })




})


// // 获取 用户基本登录信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            // 要把数据渲染到页面
            renderAvatar(res.data)
        }
    })
}


// 渲染页面的头像
function renderAvatar(user) {
    // 渲染欢迎部分 昵称优先 然后在用户名
    var name = user.nickname || user.username
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
    // 根据是否传头像进行选择渲染
    // 有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user-avatar').hide()
    } else {
        // 没有头像  
        var first = name[0].toUpperCase()
        $('.user-avatar').html(first).show()
        $('.layui-nav-img').hide()

    }


}