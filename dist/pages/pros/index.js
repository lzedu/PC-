require(["../../scripts/conf/config.js"], function(){
	require(["jquery","swiper","style","calendar","func1","func2",,"getData"], function($,opt1,opt2,opt3,opt5,opt6,opt7){
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
			opt3;
			opt5();
			opt6();
			opt7();
		})
	})
})