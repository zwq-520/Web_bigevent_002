$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取文章列表 利用模板引擎 渲染出来
    initArtileList()
    function initArtileList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取类别表格失败')
                }
                // layer.msg('获取类别表格成功')
                // 进行模板引擎渲染数据
                //  上传的是对象  使用的是 属性
                var htmlStr = template('tpl-art_cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 添加 类别按钮 弹出提示框
    var indexadd = null
    $('#btnadd').on('click', function () {
        // 框架 弹出警示层
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialog_add').html()
        });

    })

    // 提交增加类别的表单  事件委托
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交类别失败')
                }
                layer.msg('提交类别成功')
                initArtileList()
                layer.close(indexadd)
            }
        })
    })

    // 编辑功能  
    var indexEdit = null
    $('body').on('click', '#btn-edit', function () {
        // 框架 弹出警示层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialog_edit').html()
        });
        // 根据id进行判断编辑哪一个 然后把原数据展示出来
        // 获取到id
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // if (res.status !== 0) {
                //     return layer.msg('修改失败')
                // }
                // layer.msg('修改成功')
                // 把修改的数据填充到表格
                form.val('form_edit', res.data)
            }
        })

    })

    // 编辑功能 里面的提交功能
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败')
                }
                layer.msg('更新分类信息成功')
                initArtileList()
                layer.close(indexEdit)
            }
        })
    })

    // 删除功能
    $('body').on('click', '#btn-delete', function () {
        // 获取id 根据id删除
        var id = $(this).attr('data-id')
        // 弹出提示框
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            // 发起请求后台删除 然后重新渲染表格
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    initArtileList()
                }
            })

            layer.close(index);
        });
    })

})