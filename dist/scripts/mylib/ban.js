
define(['jquery','swiper'], function($,opt1) {
    
    let now=0;
    return  function(){
      //banner
        let spans = $('.slider span');
        let lis = $('.slider li');
        spans.eq(0).addClass('current');
        let timer = setInterval(()=>{
            spans.removeClass('current');
            lis.css('display','none').css('opcity','0');
            lis.eq(now).css('display','block').animate({
              opcity:1
            });
            spans.eq(now++).addClass('current');
            if(now == spans.length){
                now = 0;
            }
        },3000);
        spans.each(function(i,el){
            $(el).mouseenter(()=>{
              clearInterval(timer);
              spans.removeClass('current');
              $(el).addClass('current');
              lis.css('display','none').css('opcity','0');
                lis.eq(now).css('display','block').animate({
                  opcity:1
                });
              now = i;
            })
            $(el).mouseleave(()=>{
              timer = setInterval(()=>{
                spans.removeClass('current');
                lis.css('display','none').css('opcity','0');
                lis.eq(now).css('display','block').animate({
                  opcity:1
                });
                spans.eq(now++).addClass('current');
                if(now == spans.length){
                    now = 0;
                }
            },3000);
            })
        })


        // $('.mod-productDrag items')
        $('.drag-items').mouseenter(function(){
            $('.drag-items').removeClass('current');
            $(this).addClass('current');
        }).mouseleave(function(){
          $(this).removeClass('current');
        })

        //日历
        $('#ca').calendar({
          width: 320,
          height: 320,
          data: [
            {
              date: '2015/12/25',
              value: 'Merry Christmas'
            },
            {
              date: '2016/01/01',
              value: 'Happy New Year'
            }
          ],
          weekArray: ['周日','周一','周二','周三','周四','周五','周六'],
          prev : '<',
          next : '>',
          onSelected: function (view, date, data) {
              console.log(date);
              console.log('data:' + (data || 'None'));
          } 
      });

      //导航栏
      // $('.fix-nav-wrap').css('position','fixed');
      let navPos=[1270,1900,3066,7267];
      $(window).scroll(function(){   //开始监听滚动条
        var top = $(document).scrollTop();  //滚动条距离顶部的高度
        // console.log(top);
                if(top>=1064){
                  $('.fix-nav-wrap').css('position','fixed').css('zIndex','400').css('width','100%');
                }else{
                  $('.fix-nav-wrap').css('position','relative');
                }
                for(let i=1;i<navPos.length;i++){
                  if(top<navPos[i] && top>navPos[i-1]){
                    $('.fixed-nav li a').removeClass('current');
                    $('.fixed-nav li a').eq(i-1).addClass('current');
                  }          
                }    
      })

      //1270   1900  3066  7267
      //导航栏跳转
      
      $('.fixed-nav li a').each(function(i,el){
        $(el).click(function(){
          $('.fixed-nav li a').removeClass('current');
          document.documentElement.scrollTop = navPos[i];
          $(this).addClass('current');
        })
      })
      
      //用户名
      // $cookies = document.cookie;

      let loc = location.href;
      let arr = loc.split('username');
      if(arr.length>1){
        let username = arr[1].split('=')[1];
        if(username){
          $('#unlogin_status').html('<a href="">'+username+'</a>')
        }
        document.cookie = `username=${username};path=/`;
          // document.cookie.domain = 'domain';
          // document.cookie.path = 'http://localhost:8000/';
      }
      let $cookies = document.cookie;
      let arr1 = $cookies.split('username=');
      if(arr1.length>1){
        let uname = arr1[1];
        $('#unlogin_status').html('<a href="">'+uname+'</a>');
      }
    }
});

