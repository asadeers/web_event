  $(function() {
      var layer = layui.layer
          // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
          // 1.2 配置选项
      const options = {
          // 纵横比  1代表框是正方形
          aspectRatio: 1,
          // 指定预览区域
          preview: '.img-preview'
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)

      $('#btnChooseImage').on('click', function() {
          //   为上传按钮绑定点击事件,点击上传，就相当于是给file这个文件进行了点击事件
          $('#file').click()
      })

      //为文件选择口file绑定更改事件
      $('#file').on('change', function(e) {
          //   console.log(e);
          //获取用户选择的文件
          var fileList = e.target.files;
          //   console.log(fileList);
          if (fileList.length == 0) {
              return layer.msg('请选择照片')
          }

          //2，更换裁剪模块
          //2.1拿到用户选择的文件
          var file = e.target.files[0]
              //   2.2将文件转化为路径
          var imageUrl = URL.createObjectURL(file)
              //2.3重新初始化裁剪区
          $image
              .cropper('destroy') // 销毁旧的裁剪区域
              .attr('src', imageUrl) // 重新设置图片路径
              .cropper(options) // 重新初始化裁剪区域


      })


      //为确定按钮绑定点击事件，要把裁剪出来的区域上传给服务器
      $('#btnUpload').on('click', function() {
          //1.拿到用户裁剪之后的头像
          var dataURL = $image
              .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                  width: 100,
                  height: 100
              })
              .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串  base64可以减少网络请求
              //   2.调用接口，上传到服务器

          $.ajax({
              method: 'post',
              url: '/my/update/avatar',
              data: {
                  avatar: dataURL
              },
              success: function(res) {
                  if (res.status !== 0) {
                      return layer.msg('更换头像失败')
                  }
                  layer.msg('更新头像成功')
                  window.parent.getUserInfo()
              }
          })
      })

  })