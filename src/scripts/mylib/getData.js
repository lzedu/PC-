define(['jquery'], function($) {
    return  function(){
        let $li = $(`
        <li class="grid-items" data-track="true" data-sbom-code="2601010102605">
            <a class="thumb" target="_blank" href="">
                <p class="grid-img"> <img alt="" src=""></p>
                <div class="grid-title"></div>
                <p class="grid-price"></p>
            </a>
        </li>
        `)
        $.ajax({
            async : true,
            url : '/api/index/propos',
            dataType : 'json',
            success(data){
                console.log(data.data);
                let nowData = data.data[0]['poslist'];
                $('.naver').mouseover(function(){
                    $('.naver li').each(function(i,el){
                        $(el).mouseenter(function(){
                            $('.grid-list').html('');
                            nowData = data.data[i]['poslist'];
                            $('.p-title a').text(data.data[i]['posname']);
                            $('.p-title a span').text('全部');
                        })
                        $(el).mouseleave(function(){
                            nowData = data.data[i]['poslist'];
                            // $('.p-title a').text(data.data[i]['posname']);
                            // $('.p-title a span').text('全部');
                        })
                    })
                    $('.naver-sub').css('display','block');
                    
                    for(var j=0;j<nowData.length;j++){
                        $('.grid-list').append($li.clone());
                        $('.grid-list li .grid-title').eq(j).text(nowData[j]['name']); 
                        $('.grid-list li .grid-img img').eq(j).attr('src',nowData[j]['img']);
                        $('.grid-list li a').eq(j).attr('href',nowData1[j]['jumpurl']);
                        // let jumpurl = nowData1[i%5]['jumpurl'].split('?')[1]; 
                        $("body").on("click",".grid-items",function(){ 
                            let jumpurl = $(this).children('a').attr('href');
                            jumpurl = jumpurl.split('?')[1];
                            console.log(jumpurl);
                            window.location.href = '../pros/detail.html?'+jumpurl;
                        })
                        // console.log(jumpurl);
                    }
                    
                }).mouseout(function(){
                    // $('.naver-sub').css('display','none');
                    $('.naver-sub').mouseover(function(){
                        $(this).css('display','block');
                    })
                })

                //手机专区
                
                $('.row-1200 .item .p-text').each(function(i,el){
                    // console.log($(el));
                    let num = Math.floor(i/6);
                    let proData = data.data[num]['poslist'];
                    $(el).children('.title').text(proData[i%5]['name']);
                    $(el).children('.desc').text(proData[i%5]['slogan']);
                    $(el).children('.price').text(proData[i%5]['price']);
                    // console.log($(el).parent('.J_mod'));
                    $('.row-1200 .mod-product-single-huawei').eq(i).css('background','url('+proData[i%5]['img']+') no-repeat center center');
                    // $(el).parent('.J_mod').css('background','url('+proData[i%5]['img']+') no-repeat center center')
                })

                // 商品小列表
                let nowData1 = data.data[0]['poslist'];
                for(let i=0;i<$('.drag-list li').length;i++){
                    nowData1 = data.data[Math.floor(i/8)%5]['poslist'];
                    $('a .drag-img img').eq(i).attr('src',nowData1[i%5]['img']);
                    $('a .drag-title').eq(i).text(nowData1[i%5]['name']);
                    $('a .drag-desc').eq(i).text(nowData1[i%5]['slogan']);
                    $('a .drag-price').eq(i).text(nowData1[i%5]['price']);
                }
                
                //详情页跳转
                // console.log(document.querySelectorAll('.grid-items'));
                // setTimeout(()=>{
                    // $('.grid-list').click(function(){
                    //     window.location.href = '../pros/detail.html';
                    // })
                    
                    // $('.grid-list').children('li').each(function(i,el){
                    //     console.log(i);
                    //     $(el).click(function(){
                    //         $(this).children('a').attr('href','../../pages/pros/detail.html');
                    //         window.location.href = '../pros/detail.html';
                    //     })
                    // })
                // },200);
                

            },
            
        });
    }
})