$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 上传点击事件触发文件上传框的点击事件
    $('#btnChooseImg').on('click', function () {
        $('#file').click()
    })

    // 文件上传框注册change 改变事件
    var layer = layui.layer
    $('#file').on('change', function (e) {
        // 拿到客户上传的文件 
        var file = e.target.files[0]
        // console.log(file);
        // 进行分空校验
        if (file.length === 0) {
            return layer.msg('请选择图片上传')
        }
        // 根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 确定上传裁剪区的 功能
    $('#btnUpload').on('click', function () {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 发送ajax 获取更换头像的数据
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('上传图片失败')
                }
                layer.msg('上传图片成功')
                window.parent.getUserInfo()
            }
        })
    })
})