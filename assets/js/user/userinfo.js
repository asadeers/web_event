$(function() {
    var form = layui.form
    var layer = layui.layer
        //表单验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return layer.msg('长度必须在1-6个字符之间')
            }
        }
    })
    inituserInfo()

    //初始化用户基本信息
    function inituserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);

                // 调用form.val快速给表单赋值,因为获取回来的昵称和邮箱都是空的，所以没有渲染出来  from.val 在内置模块中可以找到
                form.val('formUserInfo', res.data)
            }
        })
    }


    //重置表单数据
    $('#btnReset').on('click', function(e) {
        //阻止表单的默认重置行为
        e.preventDefault()
        inituserInfo() //阻止默认行为，然后重新获取用户信息
    })


    //监听表单的提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            //快速拿到表单里面填写的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')

                // 要将更新的数据渲染到父页面，只要调用父页面中的方法即可
                // 这个window表示inform代表的窗口
                // 在子页面中调取父页面的方法，利用window.parent即可
                window.parent.getUserInfo()
            }
        })
    })
})