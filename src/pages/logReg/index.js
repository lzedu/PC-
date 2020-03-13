require(["../../scripts/conf/config.js"], function(){
	require(["jquery","swiper","style","calendar","getData","func1","func2","country","reg","intl","qrcode"], function($,opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,QRC){
		$(function(){
			//your code....
			new opt1('.swiper-container',{
				direction: 'horizontal', // 垂直切换选项
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				slidesPerView:5
			})
			opt2();
			opt4();
			opt5();
			opt6();
			opt7();
			opt8();
			// opt9;
			opt10();
			QRC;
			new QRCode(document.getElementById("qrcode"), "https://www.baidu.com");
			// $("#mobile-number").intlTelInput();
			// $("#mobile-number").opt9;
		})
	})
})