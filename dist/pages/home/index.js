require(["../../scripts/conf/config.js"], function(){
	require(["jquery","swiper","style","calendar","getData","func1"], function($,opt1,opt2,opt3,opt4,opt5){
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
			opt4();
			opt5();
		})
	})
})