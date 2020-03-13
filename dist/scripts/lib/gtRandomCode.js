/**
 * 极验图片验证码的实现
 * 表单按钮置灰点亮控制校验方法 function validateFormAllInput
 */

/**
 * captcha对象，目前仅用于标识本脚本是否已经被加载了；如果captchaObj对象存在，说明本脚本已经被加载了；如果不存在，说明本脚本还没有被加载
 */
window.captchaObj = {};

/**
 * 极验图片验证码的实现类
 */
window.gtRamdonCodeObj = {
	register: function()
	{
		var captchaUrl = localHttps + "/ajaxHandler";
	    $.ajax({
	        url: captchaUrl + "/chkPreprocess", //CAS的URL
	        type: "post",
	        dataType: "json",
	        
	        data: {
				captchaType: "1",
		        clientType: "cas",
		        respType: "1",
		        lang: window.languageCode,
		        operType: localInfo.geetestOperType ? localInfo.geetestOperType : ""
	        },
	        beforeSend: function(request) {
                request.setRequestHeader("Page-Token", ("undefined" == typeof pageToken) ? '' : pageToken);
            },
	        success: function (data) {
	        	gtRamdonCodeObj.initGeetestFn(0, data);
	        }
	    });	
	},
	
	initGeetestFn: function(counter, data)
	{
		if (typeof(initGeetest) != "undefined" && initGeetest && initGeetest  instanceof Function)
		{
			var captchaInfo = $("#captchaInfo");
			
			var captchaWidth = captchaInfo.attr("captchaWidth");
			if (!captchaWidth)
			{
				captchaWidth = "100%";
			}
			
			var captchaProduct = captchaInfo.attr("captchaProduct");
			if (!captchaProduct)
			{
				captchaProduct = "float";
			}
			
			//当前极验只支持中英，且voice模式只支持en，en-us会报错
			var captchaLang = captchaInfo.attr("captchaLang");
			var gtSupportLangs = ["zh-cn", "en", "en-gb", "ar", "fr", "de", "ja", "pt", "pt-pt", "ru",
			                      "es", "es-us", "az-az", "be", "bn", "bs", "bg", "ca", "zh-hk", "zh-tw",
			                      "hr", "cs", "da", "nl", "et", "fa", "fi", "ka-ge", "el", "gu",
			                      "iw", "hi", "hu", "id", "it", "kk-kz", "km-kh", "lo-la", "lv", "lt",
			                      "mk", "ms", "mr", "mn", "ne", "nb", "pl", "ro", "sr", "si-lk",
			                      "sk", "sl", "sw", "sv", "tl", "ta", "th", "bo-cn", "tr", "ul",
			                      "ur", "uz-uz", "vi", "am", "eu-es", "gl-es", "kn", "pa", "te", "jv",
			                      "as", "ml", "or", "mi", "mai", "my-zg", "ko"];
			if(captchaLang){
				captchaLang = captchaLang.toLowerCase();
				var matchLang = "";
				$.each(gtSupportLangs, function(index, value){
					if(value == captchaLang){
						matchLang = value;
						return false;
					}
				});
				if(!matchLang){
					var gtSupportLangsPreffix = captchaLang.substring(0,2);
					$.each(gtSupportLangs, function(index, value){
						if(value == gtSupportLangsPreffix){
							matchLang = value;
							return false;
						}
					});
				}
				if(matchLang){
					captchaLang = matchLang;
				}else{
					captchaLang = 'en';
				}
			}else{
				captchaLang = 'en';
			}
			var useconfig = {
				gt : data.gt,// 字符串类型。验证 id，极验后台申请得到
				challenge : data.challenge,// 符串类型。验证流水号，后服务端 SDK
				// 向极验服务器申请得到
				offline : !data.isSuccess, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
				new_captcha : data.new_captcha, // 用于宕机时表示是新验证码的宕机
				// 布尔类型。宕机情况下使用，表示验证是
				// 3.0 还是 2.0，3.0 的 sdk
				// 该字段为 true

				width : captchaWidth,// 字符串类型。设置按钮的长度，单位可以是 px，%，em，rem，pt
				// 等。默认值 300px
				product : captchaProduct, // 字符串类型。设置下一步验证的展现形式，值可以是
				// float、popup、custom、bind（custom、bind的使用有些注意事项，请参照下面的详细说明）。默认值
				// popup
				lang : captchaLang, // 字符串类型。设置验证界面文字的语言，值可以是 zh-cn，en（其它语言会陆续增加）。默认值 zh-cn。
				pure : 1,// 1无loading；0有loading
				// 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
				onError : function() {
					checkRamdomObj.sendErrorLog(3);
				}
			};
			if (data.hwType && data.hwType == 1) {
				var tempGetLib = JSON.parse(data.getLib);
				useconfig.cid = data.gt;
				useconfig.getLib = tempGetLib;
			}
			// 调用 initGeetest 初始化参数
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest(useconfig, gtRamdonCodeObj.initHandler);
            return;
		}
		
		// 循环查询，超时设置为10秒
		if (counter > 100)
		{	
			return;
		}
		else
		{
			counter = counter + 1;
			setTimeout(gtRamdonCodeObj.initGeetestFn, 100, counter, data);
		}	
	},
	
	

	initHandler: function(captchaObj)
	{
		if("object" ==typeof randomCodeObj && "function" == typeof randomCodeObj.gtCallBack){
			randomCodeObj.gtCallBack(captchaObj);
		}
	},
	
	getRandomCode: function()
	{
		if (!captchaObj)
		{
			return;
		}
		
		var result = false;
		if(captchaObj.getValidate instanceof Function){
			result = captchaObj.getValidate();
		}
	    if (!result) {
			return;
	    }
		
		// 上一次的结果
	    if (result == this.lastResult) {
			captchaObj.reset();
	    	return;
		}
			
		var jsonObj = {
		    "challenge": result.geetest_challenge,
		    "validate": result.geetest_validate,
		    "seccode": result.geetest_seccode
		};
			
		var randomCode = JSON.stringify(jsonObj);

		return randomCode;
	},
	
	resetRandomCode: function()
	{
		if (!captchaObj)
		{
			return;
		}

		captchaObj.reset();
		
		var result = captchaObj.getValidate();
	    if (!result) {
			return;
	    }
		this.lastResult = result;
		
		//按钮置灰逻辑控制检查
    	if(typeof (validateFormAllInput) != "undefined" && (validateFormAllInput instanceof Function)){
    		validateFormAllInput();
    	}
	},
	
	getAndResetRandomCode: function() {
		if (!captchaObj)
		{
			return;
		}
		
		var result = captchaObj.getValidate();
	    if (!result) {
			return;
	    }

	    // 上一次的结果
	    if (result == this.lastResult) {
			captchaObj.reset();
	    	return;
	    }
	    
		var jsonObj = {
		    "challenge": result.geetest_challenge,
		    "validate": result.geetest_validate,
		    "seccode": result.geetest_seccode
		};
			
		var randomCode = JSON.stringify(jsonObj);
		
		captchaObj.reset();
		this.lastResult = result;
		
		return randomCode;
	}		
};

/**
 * 完成验证码的注册
 * @returns
 */
function registerRandomCode()
{
	gtRamdonCodeObj.register();	
}

/**
 * 获取验证码的值
 * @returns
 */
function getRandomCode()
{
	return gtRamdonCodeObj.getRandomCode();
}

/**
 * 重置图片验证码
 * @returns
 */
function resetRandomCode()
{
	try {
		return gtRamdonCodeObj.resetRandomCode();
	} catch (e) {}
}


/**
 * 获取验证码的值，同时重置图片验证码
 * @returns
 */
function getAndResetRandomCode()
{
	return gtRamdonCodeObj.getAndResetRandomCode();
}

/**
 * 向外部暴露的接口
 */
window.ramdonCodeImgObj = {
	/**
	 * 获取验证码的值
	 * @returns
	 */
	getRandomCode: function(){
		return gtRamdonCodeObj.getRandomCode();
	},

	/**
	 * 验证码校验成功
	 */
	isValidateRandomCodeSuccess: function(){
		return gtRamdonCodeObj.getRandomCode() ? true : false;
	},
	
	/**
	 * 重置验证码
	 */
	resetRandomCode : function(){
		return gtRamdonCodeObj.resetRandomCode();
	},
	
	/**
	 * 校验验证码错误处理方法
	 */
	validateRandomCodeError : function(){
		if(!gtRamdonCodeObj.getRandomCode()){
			$("#picAuthCode").addClass("input-error-EMUI5");
			$("#randomCode_msg").addClass("addbtmpad-msg-top2p");
			$("#randomCode_msg").text("");
		}else{
			gtRamdonCodeObj.resetRandomCode();
			$("#picAuthCode").addClass("input-error-EMUI5");
			$("#randomCode_msg").addClass("addbtmpad-msg-top2p");
			$("#randomCode_msg").text(rss_new.common_wrong_authcode);
		}
	}
};

/**
 * CAS对接极验图片验证码
 * 说明，这个方法一定要放到脚本的最后，因为动态显示验证码场景，动态加载本js时，document已经是ready了的
 */
$(function() {
	registerRandomCode();
});