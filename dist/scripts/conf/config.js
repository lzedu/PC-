//做配置（配置每一个模块的加载路径）
requirejs({
	// baseUrl: "http://localhost:8000/",
	paths : {
		// "jquery" : "static/scripts/jquery-2.0.3",
		"jquery" : "../../static/scripts/jquery-2.0.3",
		// "swiper" : "static/scripts/swiper",
		"swiper" : "../../static/scripts/swiper",
		// "jq.ui" : "static/scripts/jquery-ui",
		"jq.ui" : "../../static/scripts/jquery-ui",
		// "myfun" : "scripts/mylib/ma",
		"myfun" : "../../scripts/mylib/ma",
		// "common" : "scripts/common/common",
		"common" : "../../scripts/common/common",
		// "zoom" : "scripts/lib/jquery.jqzoom-core",
		"zoom" : "../../scripts/lib/jquery.jqzoom-core",
		// "css" : "scripts/lib/css",
		// "css" : "../../scripts/lib/css",
		// "banner" : "scripts/mylib/ban"
		"style" : "../../scripts/mylib/ban",
		"calendar" :"../../scripts/lib/calendar",
		"getData" : "../../scripts/mylib/getData",
		"func1" : "../../scripts/mylib/func1",
		"func2" : "../../scripts/mylib/func2",
		"country" : "../../scripts/lib/niceCountryInput",
		"code" : "../../scripts/lib/gtRandomCode",
		"reg" : "../../scripts/mylib/register",
		"intl" : "../../scripts/lib/intlTelInput.min",
		"login" : "../../scripts/mylib/login",
		"qrcode" : "../../static/scripts/qrcode.min"

	},
	// shim : {
	// 	"zoom" : {
	// 		deps : ["jquery"]
	// 	},
	// 	"cssswiper" : {
	// 		deps : ["css!static/sheets/swiper.css"]
	// 	}
	// }
})
