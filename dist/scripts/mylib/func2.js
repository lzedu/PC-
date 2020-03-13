
define(['jquery'], function($) {
    return  function(){

        //放大镜
        $zoom = $(`
            <div id = "cloud-zoom-big" class="cloud-zoom-big">
            </div>
        `)
        $lens = $(`
            <div class="cloud-zoom-lens"></div>
        `)
        $('.mousetrap').mouseover(function(){
            $('#wrap').append($zoom);
            $('.relative').append($lens);
            let posX = $('.product-gallery-img').offset().left;
            let posY = $('.product-gallery-img').offset().top;
            $(this).mousemove(function(ev){
                let $el = $('.cloud-zoom img');
                // console.log($el);
                let posx = ev.pageX-posX;
                let posy = ev.pageY-posY;
                let lensPosx = posx;
                let lensPosy = posy;
                let lens = $('.cloud-zoom-lens');
                if(posx<=lens.innerWidth()/2){
                    lensPosx = 0;
                }
                else if(posx > 450-lens.innerWidth()/2){
                    lensPosx = lens.innerWidth();
                }else{
                    lensPosx = posx-lens.innerWidth()/2;
                }
                if(posy<=lens.innerHeight()/2){
                    lensPosy = 0;
                }else if(posy > 450-lens.innerWidth()/2){
                    lensPosy = lens.innerWidth();
                }else{
                    lensPosy = posy-lens.innerWidth()/2;
                }
                
                $('.cloud-zoom-big').css('background','url('+$('#product-img').attr("href")+')').css('background-position',-lensPosx+'px '+-lensPosy+'px');
                $('.cloud-zoom-lens').css('left',lensPosx+'px').css('top',lensPosy+'px');
            })
        }).mouseout(function(){
            $('.cloud-zoom-big').remove();
            $('.cloud-zoom-lens').remove();
        })


        //放大镜图片列表
        $('#pro-gallerys li').each(function(i,el){
            $(el).mouseover(function () {
                $('#pro-gallerys li').removeClass('current');
                $(this).addClass('current');
                // console.log($('#pro-gallerys li').eq(i).children('img').html());
                $('.cloud-zoom img').attr('src',$('#pro-gallerys .current img').attr('src'));
                $('#product-img').attr("href",$('#pro-gallerys .current img').attr('src'));
            })
        })

        //选择商品属性

        $('.product-choose ul li').click(function(){
            $(this).siblings('li').removeClass('selected');
            $(this).addClass('selected');
            let str = '';
            $('.selected').each(function(i,el){
                str =str + $(el).find('span').html()+' / ';
            })
            $('.product-selected').html(str);
        })

        //选择商品数量

        $('.product-stock-btn a').eq(0).click(function(){
            let num = Math.floor($('#pro-quantity').val());
            $('#pro-quantity').val(++num); 
            if(num>1){
                $(this).siblings().removeClass('disabled');
            }else if(num == 1){
                $(this).siblings().addClass('disabled');
            }
        })
        $('.product-stock-btn a').eq(1).click(function(){
            let num = Math.floor($('#pro-quantity').val());
            $('#pro-quantity').val(--num); 
            if(num>1){
                $(this).removeClass('disabled');
            }else if(num == 1){
                $(this).addClass('disabled');
            }
        })


        //选择下方数据
        $('.nav-tabs li').each(function(i,el){
            $(el).click(function(){
                // console.log(1);
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                $('.tab-pane').removeClass('active in');
                $('.tab-pane').eq(i).addClass('active in');
            })
        })


        //加载评论
        let $evalItem = `                                    
        <div class="eval-user">
            <div class="eval-user-img"><img></div>
            <div class="eval-user-name"></div>
        </div>
        <div class="eval-content">
            <div class="star-col"><i class="fa fa-star active"></i><i
                    class="fa fa-star active"></i><i class="fa fa-star active"></i><i
                    class="fa fa-star active"></i><i class="fa fa-star active"></i>
            </div>
            <div class="eval-txt">用了有段时间了，电池续航很不错，音质也很棒，点击游戏进入游戏界面，感觉还是有点慢，总体感官很棒</div>
            <div class="eval-img"></div>
            <div class="eval-prodesc"><span class="eval-pro-name">12GB+256GB
                    冰魄灰</span><span class="eval-date">2019-09-24 22:14:37</span></div>
            <div class="eval-review"></div>
        </div>`
        let prod = location.href;
        prod = prod.split('?')[1];
        $.ajax({
            async : true,
            url : `/api/pro/commentList?pid=&${prod}&page=0&size=10`,
            dataType : 'json',
            success(data){
                // console.log(data.data);
                $('.eval-item').append($evalItem);
                // let nowData = data.data[0]['poslist'];
                loadComment(data);
            },
            
        });
        function loadComment(data){
            $('.eval-user-img img').each(function(i,el){
                $(el).attr('src',data.data[i]['avatar']);
            });
            $('.eval-user-name').each(function(i,el){
                $(el).html(data.data[i]['nickname'])
            });
            $('.eval-txt').each(function(i,el){
                $(el).html(data.data[i]['content'])
            });
            $('.eval-pro-name').each(function(i,el){
                $(el).html(data.data[i]['attrs'])
            });
            $('.eval-date').each(function(i,el){
                $(el).html(data.data[i]['createdateStr'])
            });
        }
        $('.pagination a').click(function(){
            $(this).siblings().removeClass('current');
            $(this).addClass('current');
            let page = Math.floor($(this).text());
            console.log(page);
            page-=1;
            $.ajax({
                async : true,
                url : `/api/pro/commentList?pid=&${prod}&page=${page}&size=10`,
                dataType : 'json',
                success(data){
                    console.log(data.data);
                    // let nowData = data.data[0]['poslist'];
                    loadComment(data);
                },
                
            });
        })
        


        //加载详情图片
        // /pro/detailinfo?pid=&skusn=K19092351889_1&paramkey=infoContent

        $.ajax({
            async : true,
            url : `/api/pro/detailinfo?pid=&${prod}&paramkey=infoContent`,
            dataType : 'json',
            success(data){
                let nowData = data.data['paramval'];
                // loadComment(data);
                $('#infoContent .param').append(nowData);
            },
            
        });


        //加载商品属性
        $.ajax({
            async : true,
            url : `/api/pro/baseinfo?pid=&${prod}`,
            dataType : 'json',
            success(data){
                // let tmp = data.dat
                $('#pro-name').html(data.data['name']);
                $('#pro-price').text(data.data['price']);
                $('#pro-price').prepend('<em></em>');
                $('#pro-price em').text('￥');

                // let nowData = data.data['paramval'];
                // loadComment(data);
                // $('#infoContent .param').append(nowData);
                $('#pro-gallerys li a img').eq(0).attr('src',data.data.skus[0]['imgurl']);
            },
            
        });

        //加载详情图
        // /pro/lbimg?pid=&skusn=K19092351889_1
        $.ajax({
            async : true,
            url : `/api/pro/lbimg?pid=&${prod}`,
            dataType : 'json',
            success(data){
                console.log(data.data);
                // let tmp = data.dat
                // $('#pro-name').html(data.data['name']);
                // $('#pro-price').text(data.data['price']);
                // $('#pro-price').prepend('<em></em>');
                // $('#pro-price em').text('￥');

                // let nowData = data.data['paramval'];
                // loadComment(data);
                // $('#infoContent .param').append(nowData);
                let len = data.data.length;
                for(var i=0;i<len;i++){
                    $('#pro-gallerys li a img').eq(i).attr('src',data.data[i]['url']);
                }
            },
            
        });
        
    }
})