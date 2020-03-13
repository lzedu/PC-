define(['jquery'], function($) {
    return function(){
        let now = 0;
        let arr = ['block','none'];
        $('#rememberNameSpan').click(function(){
            now++;
            if(now%2){
                $('.tick-off-icon').css('background','url(https://id1.cloud.huawei.com/CAS/up/idmw_rss_41/css/portal/vmall_rss/loginEMUIV6/img/tick-on-18.png)')
            }
            else{
                $('.tick-off-icon').css('background','url(https://id1.cloud.huawei.com/CAS/up/idmw_rss_41/css/portal/vmall_rss/loginEMUIV6/img/tick-off-18.png)')
            }
            return false;
        })
        $('.loginTitle').click(function(){
            
            $('.loginTitle').removeClass('actived');
            $(this).addClass('actived');
            $('.b-qrCode').css('display',arr[0]);
            $('.b-account').css('display',arr[1]);
            [arr[0],arr[1]] = [arr[1],arr[0]];
        })

        $('#login_userName').focus(function(){
            // console.log(123);
            $(this).siblings('.lb_opacity_Class').children().css('display','none');
        }).blur(function(){
            if($(this).val()==''){
                $(this).siblings('.lb_opacity_Class').children().css('display','block');
            }
        })
        $('#login_password').focus(function(){
            // console.log(123);
            $(this).siblings('.lb_opacity_Class').children().css('display','none');
        }).blur(function(){
            if($(this).val()==''){
                $(this).siblings('.lb_opacity_Class').children().css('display','block');
            }
        })
        $('.button-login').click(function(){
            //判断用户名密码
            let $loginName = $('#login_userName');
            let $loginPassword = $('#login_password');
            if($loginName.val=='' || $loginPassword.val()==''){
                if($loginName.val()==''){
                    $loginName.siblings('.lb_opacity_Class').children().text('登录名不能为空');
                    $loginName.siblings('.lb_opacity_Class').children().css('color','red');
                }if($loginPassword.val()==''){
                    $loginPassword.siblings('.lb_opacity_Class').children().text('密码不能为空');
                    $loginPassword.siblings('.lb_opacity_Class').children().css('color','red');
                }
            }else{
                document.cookie = 'username='+$loginName.val()+'';
                document.cookie = 'password='+$loginPassword.val()+'';
                window.location.href="../home/index.html?username="+$loginName.val();
            }
        });

        //账号登录or扫码登录  扫码登录登不上 扫码到百度页面


    }
})