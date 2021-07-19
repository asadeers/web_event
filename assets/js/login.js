$(function() {
    //登录和注册切换和隐藏的显示
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //从layui获取form对象
    var form = layui.form

    //提示信息的对象
    var layer = layui.layer

    //通过form.verify函数自定义校验规则
    form.verify({
        //自定义一个叫做pwd校验规则  \S表示非空格
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，不能出现空格'],

        // 校验两次密码是否一致的规则  value就是用户输入的值
        repwd: function(value) {
            // 1、通过形参可以拿到确认密码框中的值
            //2、还需拿到密码框中的内容
            //3、进行一次等于的判断，如果判断失败，则return一个提示消息即可
            // [name=password]通过值选择
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }


    })


    //监听注册表单的提交事件  
    //这里的话需要注意{里面为需要提交的值}
    //通过jq选择器进行选择  利用元素选择器
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        //通过提出data来进行代码优化
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            // console.log('注册成功');

            //提示组件的改变
            layer.msg('注册成功')
        })
    })


    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            method: 'post',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功');

                //将登录成功的token字符串保存到
                localStorage.setItem('token', res.token)
                console.log(res.token);
                //跳转到后台主页
                // location.href = '/index.html'
            }
        })
    })



})