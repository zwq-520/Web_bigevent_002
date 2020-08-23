$(function () {
    var layer = layui.layer
    var form = layui.form
    // 定义提交的参数
    var q = {
        pagenum: 1,// 默认为1
        pagesize: 2, // 每页显示多少条数据
        cate_id: '',  //文章分类的 Id
        state: ''//文章的状态，可选值有：已发布、草稿
    }

    // 封装时间格式化函数
    template.defaults.imports.dateFormat = function (time) {
        var date = new Date(time)
        var y = date.getFullYear()
        var m = padZero(date.getMonth() + 1)
        var d = padZero(date.getDate())

        var hh = padZero(date.getHours())
        var mm = padZero(date.getMinutes())
        var ss = padZero(date.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 补零函数
    function padZero(n) {
        return n > 10 ? n : "0" + n
    }

    // 渲染初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 分页  total  数据的数量
                renderPage(res.total)
            }
        })
    }

    // 初始化分类选择表单
    initCate()
    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                var htmlSTR = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlSTR)
                form.render()
            }
        })
    }

    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取到表单选择的值 
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        //  赋值给传输属性的 q
        q.state = state
        q.cate_id = cate_id
        // 重新获取的q 再次调用 绘制表格的函数
        initTable()
    })

    // 分页功能
    var laypage = layui.laypage
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum,// 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],// 每页展示多少条
            // 分页发生切换的时候，触发 jump 回调
            jump: function (obj, first) {
                // console.log(obj.curr)
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    //删除功能
    $('tbody').on('click', '.btn-delete', function () {
        // 获取删除按钮的个数
        var len = $('.btn-delete').length
        // 获取点击的id
        var id = $(this).attr('data-id')
        // 弹出提示框 
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了,则让页码值 -1 之后,
                    // 再重新调用 initTable 方法
                    // 4
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index)
        })
    })


})