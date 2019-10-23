// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload()
        }
    });
    // 阻止表单默认提交行为
    return false
})

// 发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryListTpl', { data: response })
        $('#categoryBox').html(html)
    }
})

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            var html = template('modifyCategoryTpl', response)
            $('#formBox').html(html)
        }
    })
})

// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize()
        // 获取要修改的分类id
    var id = $(this).attr('data-id')
        // 发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload()
        }
    });
    // 阻止表单默认提交行为
    return false
})

// 当删除按钮被点击的时候
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})