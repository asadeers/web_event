$(function() {
    // 调用函数，获取用户基本信息
    getUserInfo()
    var layer = layui.layer
        //点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something

            //跳转到登录也，而且要清除token
            // 清除本地存储里的token
            localStorage.removeItem('token');
            location.href = '/login.html'

            //关闭confirm询问框
            layer.close(index);
        });
    })
})


//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 还需要有headers就是请求头配置对象
        success: function(res) {
            // console.log(res.data.username);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }

            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },

    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户的昵称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //按需渲染用户的头像
    //user_pic如果有这个属性，则说明有图像
    if (user.user_pic !== null) {
        // 3.渲染图片头像 attr设置属性
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 4、渲染文本头像
        $('.layui-nav-img').hide()
            //获取第一个字符toUpperCase 转成字符
        var first = name[0].toUpperCase()
        $('text-avatar').html(first).show()
    }
}