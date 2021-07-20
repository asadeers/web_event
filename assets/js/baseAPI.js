//每次调用$.get  $post $ajax的时候，会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    //发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //统一为右权限的借口设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        //上面一句可以 用来判断url路径中是否有my 
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //不论成功还是失败，最终都会调用complete,全局统一挂载complete  回调函数  这样每一个请求中就可以自动发起complete了
    options.complete = function(res) {
        // console.log(res);
        //在complete回调中，可以使用res.responseJson拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
                //2.强制登录到登录页面
            location.href = '/login.html'
        }
    }
})