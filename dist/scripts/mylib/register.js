define(['jquery'], function($) {
    return function(){
        let $phone = $('#phoneInputDiv-box');
        let $code = $('#errRandomCode-box');
        $('.mail-wrap').click(function(){
            $('.reg-tab .l').removeClass('sel');
            $(this).addClass('sel');
            $('#birthDateBox').before($phone);
            $('#birthDateBox').before($code);
            $('#errormsgemail-box').css('display','block');
            $('.emailBox').css('display','block');
        })
        $('.phone-wrap').click(function(){
            $('.reg-tab .l').removeClass('sel');
            $(this).addClass('sel');
            $('#errormsgemail-box').css('display','none');
            $('.emailBox').css('display','none');
            $('#randomCodeDiv').before($phone);
            $('#randomCodeDiv').after($code);
        })
    }
})