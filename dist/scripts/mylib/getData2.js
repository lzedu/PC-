define(['jquery'], function($) {
    return  function(){
        // console.log(123);
        $.ajax({
            async : true,
            url : '../../static/fonts/propos.json',
            dataType : 'json',
            type:'post',
            success(data){
                // 商品小列表
                // console.log(123);
                let $li1 =$(`<li class="drag-items current swiper-slide swiper-slide-active" style="width: 240px;">
                    <a class="thumb" href="" target="_blank">
                        <p class="drag-img">
                            <img src="">
                        </p>
                        <div class="drag-title">HUAWEI nova 5i</div>
                        <p class="drag-desc">&nbsp; 赠小天鹅音箱丨享6期免息</p>
                        <p class="drag-price">
                            <span>¥1999</span>
                        </p>
                    </a>
                </li>`);
                // var str = ''+$li1 + $li1 + $li1 + $li1 + $li1;
                let nowData = data.data[0]['poslist'];
                console.log(data);
                $('.swiper-container .drag-list').append($li1);
                $('.swiper-container .drag-list li').each(function(i,el){
                    $(this).children('.drag-img img').attr('src',nowData[i]['img']);
                    $(this).children('.drag-title').text(nowData[i]['name']);
                })
            }
        })
    }
})