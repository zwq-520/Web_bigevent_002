$(function () {
    // 定义提交的参数
    var q = {
        pagenum: 1,// 默认为1
        pagesize: 10, // 每页显示多少条数据
        cate_id: '',  //文章分类的 Id
        state: ''//文章的状态，可选值有：已发布、草稿
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
            }
        })
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
})