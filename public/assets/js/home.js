$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        var html = template('slidesTpl', { data: response })
            // console.log(html);
        $('#slidesBox').html(html)

        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })

        for (var i = 0; i < $('#slidesBox li').length; i++) {
            // console.log($('#slidesBox li').length);
            // 创建span
            var span = $('<span></span>');
            // 讲li插入ol里面
            $('.cursor').append(span);
            //4. 给li添加点击事件  排它思想
            $('.cursor span').eq(i).addClass('active').siblings('.active').removeClass('active');
        }
    }
})


// 向服务器端发送请求 索要最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(response) {
        // console.log(response)
        var html = template('lastedTpl', { data: response });
        $('#lastedBox').html(html);
    }
})