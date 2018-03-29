/*自定义jq方法*/
(function(win,doc,$){

	/*常用参数*/
	var dataBase = {
		url:'/apis/'
	}

	/*判断是否支持css3*/
	var supportCss3 = function(style) { 
		var prefix = ['webkit', 'Moz', 'ms', 'o'], 
		i, 
		humpString = [], 
		htmlStyle = document.documentElement.style, 
		_toHumb = function (string) { 
		return string.replace(/-(\w)/g, function ($0, $1) { 
		return $1.toUpperCase(); 
		}); 
		}; 
		 
		for (i in prefix) 
		humpString.push(_toHumb(prefix[i] + '-' + style)); 
		 
		humpString.push(_toHumb(style)); 
		 
		for (i in humpString) 
		if (humpString[i] in htmlStyle) return true; 
		 
		return false; 
	}
	/*轮播*/
	var TMDslide = function(speed){
		var result = [];
		$(this).each(function(){
			var self = $(this).get(0);
			result.push(new TMDslide.prototype.init(self,speed));
		})
		return result; 
	};
	TMDslide.prototype.init = function(that,speed) {
		var self = this;
		self.Object = that;
		self.speed = speed?speed:3000;
		self.options = {
			w:1920,
			h:$(that).height(),
			l:$(that).children(".qw-banner").children("li").length,
			zI:$(that).children(".qw-banner").children("li").length,
			index:0
		}
		self.timer = null;

		$(that).children(".qw-banner").children("li").css({
			position:'absolute',
			top:0,
			left:0,
			width:self.options.w+'px',
			height:self.options.h+'px'
		}).each(function(index){
			$(this).css("z-index",self.options.l-index);
		})

		self.start();
		
	};

	TMDslide.prototype.init.prototype.stop = function(){
		clearInterval(this.timer)
	}

	TMDslide.prototype.init.prototype.start = function(){
		var self = this;
		self.timer = setInterval(function(){
			self.options.index+1<self.options.l?self.options.index= self.options.index+1:self.options.index= self.options.index=0;
			self.cut()
		},self.speed)
	}

	TMDslide.prototype.init.prototype.cut = function(){
		var self = this,
			oStyle;
		self.options.zI++;
		if(self.options.index&2>0){
			oStyle = {
				c:{'z-index':self.options.zI,
						height:0},
				a:{height:self.options.h+'px'}
			}
		}else{
			oStyle = {
				c:{'z-index':self.options.zI,
						width:0},
				a:{width:self.options.w+'px'}
			}
		}
		$(self.Object).children(".qw-banner").children("li")
			.eq(self.options.index)
			.css(oStyle.c)
			.animate(oStyle.a,1000);
	}

	/*创建选项元素*/
	var createOption = function(t,d){
		var data;
		if(!d||!t||!t.name){
			throw '缺少必要参数'
			return;
		}
		if(Object.prototype.toString.call(d) == '[object Array]'){
			data = {};
			for(var i=0;i<d.length;i++){
				data[i] = d[i];
			}
		}else{
			data = d;
		}

		var options = [];
		for(var name in data){
			options.push('<'+t.name+(t.className?' class="'+t.className+'"':'')+' value="'+name+'" >'+data[name]+'</'+t.name+'>')
		}
		return options.join("");
	}
	/*倒计时*/
	var interdict = function(o){
		var options = {
				type:'forbid',
				className:'QWinterdict',
				start:60,
				end:0,
				text:'发送中'
			};
			
		for(var n in o){
			options[n] = o[n]
		}

		var self = $(this).eq(0),
			oTple = $('<div></div>',{
				style:'position:relative;top:0;left:0;width:100%;height:100%;z-index:888;background-color:#999',
				text:options.text
			})

		self.css({
			"position":'relative',
			"z-index":1
		}).find(".QWinterdict").remove();
		
		if(options.type=="clear"){
			return false;
		}

		self.prepend(oTple);

		//禁止点击事件
		oTple.addClass(options.className).click(function(){
			return false;
		})

		switch(options.type){
			case 'forbid':
			break;
			case 'countdown':
			var i = options.start,
				timer = null;
			oTple.text(i)
			timer = setInterval(function(){
			i--;
			oTple.text(i);
				if(i==options.end){
					clearInterval(timer);
					oTple.remove();
				}
			},1000)
			break;
			default:
			break;

		}				
		
	}

	/*获取url参数*/
	var getUrlData = function(key) {
        var re = '[\\?&]'+key+'=([^&]+)';
        re = new RegExp(re);
        //console.log(re);
        var rst = location.search.match(re);
        return rst ? decodeURI(rst[1]) : '';
    }

	/*包装get请求*/
	var getJson = function(url,d,b){

		var async = true;

		var data = {
			token:$.cookie('token')
		}

		if(typeof d != 'undefined'){
			if(typeof d === 'boolean' ){
				async = d
			}else{
				for(var name in d){
					data[name] = d[name]
				}
			}
			
		}

		if(typeof b === 'boolean' ){
				async = b
		}

		return $.ajax({
			url:dataBase.url+url,
			type:'GET',
			data:data,
			dataType:'JSON',
			async:async,
			timeout:5000
		})
	}
	/*包装post请求*/
	var postJson = function(url,d,b){
	
		var async = true;

		var data = {
			token:$.cookie('token')
		}
		if(typeof d != 'undefined'){
			if(typeof d === 'boolean' ){
				async = d
			}else{
				for(var name in d){
					data[name] = d[name]
				}
			}
			
		}

		if(typeof b === 'boolean' ){
				async = b
		}
		return $.ajax({
			url:dataBase.url+url,
			type:'POST',
			data:data,
			dataType:'JSON',
			async:async,
			timeout:5000
		})
	}

	/*图片验证码*/
	var imageCaptcha = function(dom){
		var imgUrl = "/captcha/image?token="+$.cookie('token')+"&t="+new Date().getTime();
		dom.attr("src",imgUrl)
	}

	var TMDLoadMore = function(limit, callback) {
        var vH = $(win).height(),
            dH = $(doc).height(),
            sH = dH - vH,
            sT = $(win).scrollTop(),
            loadStop = true,
            limit = limit ? limit : 10;
        if (sT > (sH - limit)) {
            callback ? callback() : null;
        }
        $(win).on("scroll", function() {
            dH = $(doc).height();
            sH = dH - vH;
            sT = $(win).scrollTop();
            if (sT > (sH - limit)) {
                if (loadStop) {
                    loadStop = false;
                    callback ? callback() : null;
                    setTimeout(function() {
                        loadStop = true;
                    }, 500)
                }
            }
        })
    }

    /*时间格式化*/
    var timeFormat = function(time, format){
        if(!time){
            return '暂无'
        }
        if (!format) {
            format = 'Y-n-j H:i:s';
        }

        var timeObj = new Date(time*1000);
        
        var hour = timeObj.getHours();
        var minute = timeObj.getMinutes();
        var second = timeObj.getSeconds();
        var month = timeObj.getMonth()+1;
        var day = timeObj.getDate();

        var timeFmt = format
            .replace('Y', timeObj.getFullYear())
            .replace('n', month>9 ? month :'0'+month)
            .replace('j', day>9 ? day : '0'+day)
            .replace('H', hour>9 ? hour : '0'+hour)
            .replace('i', minute>9 ? minute : '0'+minute)
            .replace('s', second>9 ? second : '0'+second);

        return timeFmt;
        return time
    }

	//$添加方法
    $.extend({
        supportCss3:supportCss3,
        TMDget:getJson,
        TMDpost:postJson,
        TMDcreateOption:createOption,
        TMDcaptcha:imageCaptcha,
        TMDgetUrlData:getUrlData,
		TMDLoadMore:TMDLoadMore,
		TMDtimeFormat:timeFormat,
        dataBase:function(){
        	return dataBase
        }
    })
    //实例添加方法
    $.fn.extend({
    	TMDslide: TMDslide,
    	TMDinterdict:interdict
    })
})(window, document, jQuery);
/**
 * 该JS函数的作用是若快商通的代码加载完成,则调用快商通自带的打开聊天窗口的函数
 * 否则直接打开链接地址,并用网站自己获取到的来源的对话网址参数传递给聊天窗口
 * 注: 会直接打开链接地址的情况是,客户在没有生成快商通的图标前就点击了页面上的咨询链接时触发的
 * 用法举例:
 *      1. <a href="javascript:void(0)" onClick="onKST();">在线咨询</a>;
 *		2. <a href="javascript:void(0)" onClick="onKST('zhuanti');">在线咨询</a>;
 *		3. <a href="javascript:void(0)" onClick="onKST('zhuanti',true);">在线咨询</a>;
 * @param ksChatLink 指定打开链接地址，不指定则取函数中默认的链接地址
 * @param text 对话标识，可不指定
 * @param isMobile 是否是手机，可不指定
 * @author drc
 * @since 2016-04-27
 * @version 2.1
 */
var onKST= function(text,isMobile){
	//请替换成"生成代码 - 链接地址" 中的链接地址,不要去其他地方复制
	ksChatLink = 'https://hztk5.kuaishang.cn/bs/im.htm?cas=69442___591199&fi=79018';
	/**
	 * 若强行打开新窗口,则放开设置,不设置则手机不打开新窗口,pc打开新窗口,此设置只对当前自定义事件有效
	 * 若想全局生效,包括快商通默认的打开聊天窗口事件,则将此变量ksUserDefinedOpenNewChatWin定义在ks.j前即可
	 */
	 window.location.href=ksChatLink;
	//var ksUserDefinedOpenNewChatWin=true;
	
	//eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h Q(a,b){3(!a)9 J;9 z D("(^|&)"+b+"=([^&]*)(&|$)","i").16(a)}h G(a,b){4 c=a.j(\'?\');3(c==-1)9\'\';a=a.14(c+1,a.y);4 d=z D("(^|&)"+b+"=([^&]*)(&|$)","i");4 r=a.K(d);3(r!=L)9 O(r[2]);9\'\'}3(12&&5.j(\'l=1\')==-1){3(5.j(\'?\')==-1){5+=\'?l=1\'}6{5+=\'&l=1\'}}4 7,A=5;4 v=5.11("?");v.17("");3(q P!=\'R\'&&P==w){7=w}6 3(Q(v[1],\'l\')){7=J}6{7=w}h t(){4 a=\'\';u{4 b=G(5,\'X\');3(b){4 c=\'\';4 d=k.V.K(z D(\'(^| )\'+b+\'U\'+b+\'=([^;]*)(;|$)\'));3(d!=L){c=O(d[2])}3(c){a+=\'&Z=\'+c}}}o(e){}4 f="";u{3(N.k.n.y>0){f=N.k.n}}o(e){f=k.n}3(!f||f.y==0){f=k.n}a+=\'&S=\'+C(m.B.x);3(f)a+=\'&T=\'+C(f);3(s)a+=\'&H=\'+C(s);3(5.j(\'?\')==-1){a=\'?\'+a.W(1)}5+=a;3(!7){m.B.x=5}6{4 g=m.Y(5,\'M\');3(g){u{g.10()}o(e){}}6{m.B.x=5}}}3(q 8!=\'R\'){4 p={};3(s)p[\'H\']=s;3(7)p[\'13\']=\'M\';u{3(q 8.F==\'h\'){3(7&&A.j(\'15\')==-1&&!8.E){8.E=A}8.F(p)}6 3(q 8.I==\'h\'){8.I(p)}6{t()}}o(e){t()}}6{t()}',62,70,'|||if|var|ksChatLink|else|openNewChatWin|KS|return||||||||function||indexOf|document|ism|window|referrer|catch||typeof||text|ksOpenLink|try|localArr|true|href|length|new|_ksChatLink|location|encodeURIComponent|RegExp|customUrl|openChatWin|getQueryString|sText|openChatLink|false|match|null|_blank|opener|unescape|ksUserDefinedOpenNewChatWin|checkQueryString|undefined|dp|ref|_KS_|cookie|substring|cas|open|vi|focus|split|isMobile|oTarget|substr|kuaishang|test|push'.split('|'),0,{}))
};


/*下拉选择 样式一*/
var selectStyleHtml = ['<div class="pull-down-s1"></div><div class="pull-down-s2"></div><div class="pull-down-s3"></div><div class="pull-down-s4"></div><div class="pull-down-s5"></div><div class="pull-down-s6"></div><div class="pull-down-s7"></div><div class="pull-down-s8"></div>','<div class="qw-pull-s1"></div><div class="qw-pull-s2"></div><div class="qw-pull-s3"></div><div class="qw-pull-s4"></div><div class="qw-pull-s5"><div class="qw-pull-triangle"></div></div><div class="qw-pull-s6"></div><div class="qw-pull-s7"></div><div class="qw-pull-s8"></div><div class="qw-pull-s9"></div>'];
//下拉默认加载选项
var selectInit = function(n){
	var cName = n?n:'.qw-cm-form-select',
		that = this,
		pullDown = '<div class="pull-down"></div>',
		optionsBox = '<div class="options-list-box"></div>',
		scrollBox = '<div class="options-list-scroll"></div>';


	$(cName).each(function(){
		
		var self = $(this).get(0),
			type = $(this).attr("data-type"),
			oBox = null;
		if(!type||self.options){
			return;
		}
		if(!$(this).find('.pull-down').length){
			$(this).append(pullDown);
		}
		if(!$(this).find('.pull-down .options-list-box').length){
			$(this).find('.pull-down').append(optionsBox);
		}
		if(!$(this).find('.pull-down .options-list-box .options-list-scroll').length){
			$(this).find('.pull-down .options-list-box').append(scrollBox);
		}

		self.options = true;

		switch(type){
			case 'years':
			var data = {},oDate = new Date();
			for(var i = oDate.getFullYear()-18;i>oDate.getFullYear()-70;i--){
				data[i]=i;
			}
			$(this).find('.options-list-scroll').html(that.createOptionsList(data))
			break;
			case 'months':
			var data = {};
			for(var i = 1;i<=12;i++){
				data[i] = i;
			}
			$(this).find('.options-list-scroll').html(that.createOptionsList(data))
			break;
			case 'days':
			var data = {};
			for(var i = 1;i<=31;i++){
				data[i] = i;
			}
			$(this).find('.options-list-scroll').html(that.createOptionsList(data))
			break;
			case 'province':
			$(this).find('.options-list-scroll').html(that.createOptionsList(cityBase['province']));
			$(this).on("onChange",function(e,v){
				var index = $(this).attr("data-picker-index");
				$("[data-picker-id='"+index+"']").find('.options-list-scroll .options-list').html($.TMDcreateOption({name:'li',className:"option"},cityBase['city'][v.value])).end().attr('data-value','').children('.value').text('');
			})
			break;
			case 'city':
			$(this).find('.options-list-scroll').html(that.createOptionsList({'':'请选择'}));

			break;
			default:
			break;
		}


	})
}
selectInit.prototype.createOptionsList = function(d){
	return '<ul class="options-list">'+$.TMDcreateOption({name:'li',className:"option"},d)+'</ul>'
}
/*立即预约*/
// 时间段
var subscribeDate = {
	'10':'10:00 - 11:00',
	'20':'11:00 - 12:00',
	'30':'12:00 - 13:00',
	'40':'14:00 - 15:00',
	'50':'15:00 - 16:00',
	'60':'16:00 - 17:00',
	'70':'17:00 - 18:00',
	'80':'18:00 - 19:00',
	'90':'19:00 - 20:00',
	'100':'20:00 - 21:00',
	'110':'21:00 - 22:00'
}
/*模板*/
//预约
var subscribeTemplate = '<div class="qw-popup-view">'+
        '<div class="qw-popup-main qw-shortcut-main">'+
            '<div class="qw-popup-close"></div>'+
            '<h1>免费申请预约</h1>'+
            '<form>'+
            '<div class="qw-cm-form-item s3">'+
               '<div class="qw-cm-form-value"><div class="qw-cm-pinput">'+
               '<div class="qw-cm-form-placeholder">您的姓名</div>'+
               '<input type="text" class="qw-cm-form-input" id="shortcutName" />'+
               '</div></div>'+
            '</div>'+
            '<div class="qw-cm-form-item s3">'+
               '<div class="qw-cm-form-value"><div class="qw-cm-pinput">'+
               '<div class="qw-cm-form-placeholder">手机号</div>'+
               '<input type="text" class="qw-cm-form-input" id="shortcutPhone" />'+
               '</div></div>'+
            '</div>'+
            '<div class="qw-cm-form-item s3">'+
                '<div class="qw-cm-form-value">'+
                	'<div class="qw-cm-min-font">预约时间</div>'+
                	'<div class="qw-cm-groupView" id="shortcutTime"><div class="qw-cm-groupMian"><div>'+
                	$.TMDcreateOption({name:'div',className:"qw-cm-form-radio"},subscribeDate)+
                	'</div></div></div>'+
                '</div>'+
            '</div>'+
            '<div class="qw-submit-btn qw-button-red" id="shortcutBtn">立即申请'+
            '<div class="qw-fixed-box"><div class="qw-fixed-s1"></div><div class="qw-fixed-s2"></div><div class="qw-fixed-s3"></div><div class="qw-fixed-s4"></div><div class="qw-fixed-s5"></div>'+
                '<div class="qw-fixed-s6"><div class="qw-fixed-triangle"></div></div><div class="qw-fixed-s7"></div><div class="qw-fixed-s8"></div><div class="qw-fixed-s9"></div><div class="qw-fixed-box-main picture-fixed">'+
                    '<div class="picture-captcha">'+
                        '<img class="img-captcha" id="shortcutCaptchaImage">'+
                        '<input type="text" class="qw-cm-form-input" id="shortcutCaptcha">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '</div>'+
            '</form>'+
        '</div>'+
    '</div>';
//电话咨询 
var telTemplate = '<div class="qw-popup-view">'+
    '<div class="qw-popup-main qw-shortcut-main">'+
        '<div class="qw-popup-close"></div>'+
        '<h1>免费电话咨询</h1>'+
        '<form>'+
            '<div class="qw-cm-form-item s3">'+
                '<div class="qw-cm-form-value">'+
                    '<div class="qw-cm-pinput">'+
                        '<div class="qw-cm-form-placeholder">手机号</div>'+
                        '<input type="text" class="qw-cm-form-input telinput" id="telInput" name="vtel">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="qw-submit-btn qw-button-red" id="callBtn">立即免费通话</div>'+
            '<div class="qw-popup-remark">'+
            '<p>手机请直接输入：如1860086xxxx</p>'+
			'<p>座机前加区号：如0105992xxxx</p>'+
			'<p>输入您的电话号码，点击通话，稍后您将接到我们的电话，该通话对您<span class="qw-text-red">完全免费</span>，请放心接听！</p>'+
            '</div>'+
        '</form>'+
    '</div>'+
'</div>';

//登录
var loginTemplate = '<div class="qw-popup-view">'+
        '<div class="qw-popup-main">'+
            '<div class="qw-popup-close"></div>'+
                '<h1>会员登录</h1>'+
                '<form id="loginForm">'+
                    '<div class="qw-cm-form-item s3">'+
                       '<div class="qw-cm-form-value"><div class="qw-cm-pinput">'+
                       '<div class="qw-cm-form-placeholder">手机号</div>'+
                       '<input type="text" class="qw-cm-form-input" id="loginPhone" />'+
                       '</div></div>'+
                    '</div>'+
                    '<div class="qw-cm-form-item s3">'+
                    	'<div class="qw-cm-form-value"><div class="qw-cm-pinput">'+
                       '<div class="qw-cm-form-placeholder">密码</div>'+
                       '<input type="password" class="qw-cm-form-input" id="loginPassword" />'+
                       '</div></div>'+
                    '</div>'+
                    '<div class="qw-cm-form-item s4 hide" id="LoginCaptchaBox">'+
                        '<div class="qw-cm-form-placeholder">图形验证码</div>'+
                        '<div class="qw-cm-form-value"><input type="password" class="qw-cm-form-input" id="LoginCaptcha"  /></div>'+
                        '<img class="img-captcha" id="LoginImageCaptcha">'+
                    '</div>'+
                    '<button type="submit" class="qw-submit-btn qw-button-red" id="loginSubmit" >立即登录</button>'+
                    '<div class="qw-clear qw-form-control">'+
                        '<div class="qw-right qw-text-red"><a href="/forgot_password" class="qw-text-red" target="_blank">忘记密码</a>  |  <a href="/signup" class="qw-text-red" target="_blank">注册</a> </div>'+
                    '</div>'+
                '</form>'+
        	'</div>'+
    	'</div>';
var logginedTemplate = ['<ul class="qw-g-account">'+
                    '<li class="qw-g-account-item qw-account-userinfo">'+
                        '<div class="qw-account-avatar">'+
                            '<div class="qw-account-avatar-circle"></div>'+
                            '<img src="{{ d.userInfo.avatar=="\'\'"?"http://image.aiqingqingwa.com/FhqX4bogJB6yx3HYqPcvhLjTDxKr":d.userInfo.avatar }}?imageView2/1/w/32/h/32">'+
                        '</div>'+
                        '<div class="qw-account-nickname">{{ d.userInfo.nickname }}</div>'+
                        '<div class="qw-fixed-box qw-account-handle">'+
                        '<div class="qw-fixed-s1"></div><div class="qw-fixed-s2"></div><div class="qw-fixed-s3"></div><div class="qw-fixed-s4"></div><div class="qw-fixed-s5"><div class="qw-fixed-triangle"></div></div><div class="qw-fixed-s6"></div><div class="qw-fixed-s7"></div><div class="qw-fixed-s8"></div><div class="qw-fixed-s9"></div><div class="qw-fixed-box-main"><ul class="qw-account-menu"><li><a href="/account/qa"><img src="/static/images/icon_user.png" alt="">个人中心</a></li><li id="logout"><a><img src="/static/images/icon_logout.png" alt="退出登录">退出</a></li></ul></div>'+
                        '</div>'+
                    '</li>'+
                    '<li class="qw-g-account-item qw-account-message"><div class="qw-icon qw-icon-small-msg"></div>'+
                        '<div class="qw-fixed-box qw-account-msg">'+
                        '<div class="qw-fixed-s1"></div><div class="qw-fixed-s2"></div><div class="qw-fixed-s3"></div><div class="qw-fixed-s4"></div><div class="qw-fixed-s5"><div class="qw-fixed-triangle"></div></div><div class="qw-fixed-s6"></div><div class="qw-fixed-s7"></div><div class="qw-fixed-s8"></div><div class="qw-fixed-s9"></div><div class="qw-fixed-box-main">'+
                                '{{# if(d.lastActivityAnswers.length>0 ){ }}'+
                                '<ul class="qw-account-msg-list">'+
                                '{{# for(var i = 0, len = d.lastActivityAnswers.length; i < len; i++){ }}'+
                                	'<li class="qw-account-msg-item"><a href="/question/{{ d.lastActivityAnswers[i].qid }}/" class="qw-clear">'+
                                        '<div class="qw-msg-avatar">'+
                                            '<div class="qw-msg-avatar-circle"></div>'+
                                            '<img src="{{ d.lastActivityAnswers[i].answerer.avatar }}?imageView2/1/w/40/h/40">'+
                                        '</div>'+
                                        '<div class="qw-msg-info">'+
                                            '<div class="title">{{ d.lastActivityAnswers[i].answerer.nickname }}</div>'+
                                            '<div class="des">{{ d.lastActivityAnswers[i].answer_details }}</div>'+
                                        '</div>'+
                                    '</a></li>'+
                                '{{# } }}'+
                                '</ul>'+
                                '<div class="qw-msg-more"><div class="qw-msg-more-line"></div><a href="/account/qa" class="qw-text-blue">查看全部消息</a></div>'+
                                '{{# }else{ }}'+
                                '<div class="qw-msg-hint">暂时没有新消息</div>'+
                                '{{# } }}'+
                            '</div>'+
                        '</div>'+
                    '</li>'+
                '</ul>',
                '<ul class="qw-g-account qw-clear">'+
                   '<li class="qw-g-account-item"><a class="qw-g-account-btn" href="/signup" target="_blank">注册</button></a>'+
                   '<li class="qw-g-account-item"><button type="button" class="qw-g-account-btn" id="login">登录</button></li>'+
               '</ul>'];
var loggined = function(bool,d){
	var data = d?d:{},
		oTemplate;
	if(typeof bool == 'boolean'){
		oTpl = bool?0:1;
		laytpl(logginedTemplate[oTpl]).render(data, function(html){
		  $("#logginedView").html(html)
		});
	}
	
}
/*全局参数*/
var USERDATA = {
	userInfo:{},
	lastActivityAnswers:[],
	upload:{
		url:'http://image.aiqingqingwa.com/'
	}
};
//判断是否登录
	$.TMDpost('user/get_user_info',false)
	 .done(function(response){
	 	if(response.status){
	 		USERDATA.userInfo = response.result.info;
	 		USERDATA.lastActivityAnswers = response.result.last_activity_answers;
	 		loggined(true,USERDATA)
	 	}else{
	 		loggined(false)
	 	}
	 })
var COMFUNC = {
	login:function(){
		//页面层
		var sL = layer.open({
		  type: 1,
		  title:false,
		  skin: 'qw-popup', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  area: ['400px', '460px'], //宽高
		  shadeClose: true, //开启遮罩关闭
		  content: loginTemplate,
		  success:function(){
		  	//关闭弹层
		  	$(".qw-popup-close").click(function(){
		  		layer.close(sL)
		  	})
		  	//刷新图形验证码
			$("#LoginImageCaptcha").click(function(){
				$.TMDcaptcha($(this))
			})
		  	//登录
		  	function Login(e){
		  		e.preventDefault();
		  		var data = {
		  			phone:$("#loginPhone").val(),
		  			password:$("#loginPassword").val()
		  		}
		  		for(var name in data){
		  			if(name==''){
		  				layer.msg('账户密码不能为空');
		  				return;
		  			}	  			
		  		}
		  		data.captcha = $("#LoginCaptcha").val();
		  		$.TMDpost('user/signin',data)
		  		 .done(function(response){
		  		 	if(response.status){
		  		 		USERDATA.userInfo = response.result.info;
	 					USERDATA.lastActivityAnswers = response.result.last_activity_answers;
		  		 		loggined(true,USERDATA);
		  		 		layer.close(sL)
		  		 	}else{
		  		 		if(response.code==1006){
		  		 			$.TMDcaptcha($("#LoginImageCaptcha"))
		 					$("#LoginCaptchaBox").slideDown('fast');
		  		 		}
		  		 		layer.msg(response.msg)
		  		 	}
		  		 })
		  	}
		  	$("#loginSubmit").click(Login);
		  	$("#loginForm").submit(Login);
		  	//图形验证登录
			$("#LoginCaptcha").on("keyup",function(){
				var val = $(this).val();
				if(val.length >= 4){
					$(this).val(val.substring(0,4));
				}
			})

		  	
		  }
		});
	}
}
/*全局函数*/
var TMDinit = function(){
	//快商通跳转按钮
	$(document).on("click","[consult='kst']",function(){
		onKST();
	})
	//页面初始化配置
	new selectInit();
	/*自定义单选*/
	$(document).on("click","div.qw-cm-form-radio",function(){
		$(this).addClass("checked").siblings().removeClass("checked");
	})
	/*自定义多选*/
	$(document).on("click","div.qw-cm-form-checkbox",function(){
		$(this).toggleClass("checked");
	})
	/*自定义选择*/
	//样式一
	$(document).on("click","div.qw-cm-form-select",function(){
		var self = $(this).get(0);
		var limit = 30;
		var $options = $(this).find(".option");
		if($options.length>3){
			limit = 120
		}
		if(!self.tmdSelect){
			self.tmdSelect = true;
			$(this).find(".pull-down").prepend(selectStyleHtml[0]).find(".options-list-scroll").height(limit).panel({
	        	iWheelStep: 32
	    	});
		}else{
			$(this).find(".pull-down").find(".options-list-scroll").height(limit);
		}

		$(this).siblings(".qw-cm-form-placeholder").hide()
		if($(this).hasClass("open")){
			$(this).removeClass("open");
		}else{
			$(".qw-cm-form-select").removeClass("open");
			$(this).addClass("open");
		}
		$("div.qw-cm-choose, div.qw-cm-choice, div.qw-button-picture").removeClass("open");
		return false;
	})
	$(document).on("click","div.qw-cm-form-select div.pull-down",function(e){
		e.stopPropagation();
	})
	$(document).on("click","div.qw-cm-form-select .option",function(e){
		var $select = $(this).parents(".qw-cm-form-select"),
			value = $(this).attr("value")?$(this).attr("value"):$(this).text(),
			text = $(this).text();
		$select.removeClass("open").attr("data-value",value).children(".value").text(text);
		$select.trigger("onChange",{
			value:value,
			text:text
		})
	})
	//样式二
	$(document).on("click","div.qw-cm-choice",function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open");
		}else{
			$(".qw-cm-choose").removeClass("open");
			$(this).addClass("open");
		}
		$("div.qw-cm-choose, div.qw-cm-form-select, div.qw-button-picture").removeClass("open");
		return false;
	})
	$(document).on("click","div.qw-cm-choice div.pull-down",function(e){
		e.stopPropagation();
	})
	$(document).on("click","div.qw-cm-choice .option",function(e){
		var $select = $(this).parents(".qw-cm-choice"),
			value = $(this).attr("value")?$(this).attr("value"):$(this).text(),
			text = $(this).text();
		$select.removeClass("open").attr("data-value",value).children(".value").text(text);
		$select.trigger("onChange",{
			value:value,
			text:text
		})
	})
	//样式三 
	$(document).on("click","div.qw-cm-choose",function(){
		var self = $(this).get(0);
		if(!self.tmdChoose){
			self.tmdChoose = true;
			var $options = $(this).find(".option");
			$(this).find(".pull-down").prepend(selectStyleHtml[1]);
			
		}
		if($(this).hasClass("open")){
			$(this).removeClass("open");
		}else{
			$(".qw-cm-choose").removeClass("open");
			$(this).addClass("open");
		}
		$("div.qw-cm-choice, div.qw-cm-form-select, div.qw-button-picture").removeClass("open");
		return false;
	})
	$(document).on("click","div.qw-cm-choose div.pull-down",function(e){
		e.stopPropagation();
	})
	$(document).on("click","div.qw-cm-choose .option",function(e){
		var $select = $(this).parents(".qw-cm-choose"),
			value = $(this).attr("value")?$(this).attr("value"):$(this).text(),
			text = $(this).text();
		$select.removeClass("open").attr("data-value",value).children(".value").text(text);
		$select.trigger("onChange",{
			value:value,
			text:text
		})
	})
	//当点击其他区域时，下拉选择关闭
	$(document).on("click",function(){
		$("div.qw-cm-choose, div.qw-cm-choice, div.qw-cm-form-select").removeClass("open");
	})
	//取消输入提示
	$(document).on("click","div.qw-cm-form-item .qw-cm-form-placeholder,div.qw-cm-input .qw-cm-form-placeholder,div.qw-cm-textarea .qw-cm-form-placeholder",function(e){
		$(this).siblings("input").focus();
		$(this).siblings("textarea").focus();
		$(this).siblings(".qw-cm-form-input").focus();
		$(this).siblings(".qw-cm-form-select").trigger("click");
	})
	$(document).on("focus","div.qw-cm-form-item .qw-cm-form-input,.qw-cm-input input,.qw-cm-textarea textarea",function(e){
		//$(this).siblings(".qw-cm-form-placeholder").hide();
		$(this).one("blur",function(){
			var v = $(this).val();
			v?null:$(this).siblings(".qw-cm-form-placeholder").show();
		})
	})
	$(document).on("keyup","div.qw-cm-form-item .qw-cm-form-input,.qw-cm-input input,.qw-cm-textarea textarea",function(e){
		var v = $(this).val();
		v==''?$(this).siblings(".qw-cm-form-placeholder").show():$(this).siblings(".qw-cm-form-placeholder").hide();
	})
	//输入框限制
	$(document).on("keyup","input[limit],textarea[limit]",function(){
		var val = $(this).val(),
			limit = $(this).attr("limit"),
			$limit = $(this).siblings(".text-limit");
			if(val.length>=limit){
				layer.msg("只允许输入50个字符以内的标题")
				$(this).val(val.substring(0,limit))
			}
			$limit.text(val.length+"/"+limit);

	})
	//退出登录
	$(document).on("click","#logout",function(){
		$.TMDpost('user/signout')
		 .done(function(response){
		 	if(response.status){
		 		loggined(false)
		 	}
		 	layer.msg(response.msg)
		 })
	})
	//登录按钮
	$(document).on("click","#login",COMFUNC.login);
	//电话咨询
	$(document).on("click","#makingcalls",function(){
		//页面层
		var sL = layer.open({
		  type: 1,
		  title:false,
		  skin: 'qw-popup', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  area: ['400px', '365px'], //宽高
		  shadeClose: true, //开启遮罩关闭
		  content: telTemplate,
		  success:function(){
		  	$(".qw-popup-close").click(function(){
		  		layer.close(sL)
		  	})
		  	
		  	$("#callBtn").on("click",function(){
		  		var phone = $("#telInput").val();
		  		if(/^1[34578]{1}\d{9}$/.test(phone)){
		  			$.TMDpost('lxb/add',{
		  				vtel:phone
		  			}).done(function(){})
		  			lxb.call($("#telInput").get(0))
		  			layer.close(sL)
		  		}else{
		  			layer.msg("请输入正确的手机号码")
		  		}	
		  	})
		  }
		});
	})
	//弹出预约
	$(document).on("click",".qw-g-shortcut .button-contact",function(){
		//页面层
		var sL = layer.open({
		  type: 1,
		  title:false,
		  skin: 'qw-popup', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  area: ['400px', '490px'], //宽高
		  shadeClose: true, //开启遮罩关闭
		  content: subscribeTemplate,
		  success:function(){
		  	$(".qw-popup-close").click(function(){
		  		layer.close(sL)
		  	})
		  	$(".qw-shortcut-main .qw-cm-groupMian").panel({
	        	iWheelStep: 32
	    	});
		  }
		});
	})
	//预约申请
	function shortcutFunc(){
		var data = {
			customer_name:$("#shortcutName").val(),
			phone:$("#shortcutPhone").val(),
			best_time:$("#shortcutTime").find("div.qw-cm-form-radio.checked").attr("value"),
			captcha:$("#shortcutCaptcha").val()
		}
		if(data.customer_name==""){
			layer.msg('请输入您的姓名')
			return;
		}else if(data.phone==""){
			layer.msg('请输入您的手机号')
			return;
		}else if(!data.best_time){
			layer.msg('请选择预约时间段')
			return;
		}
		$.TMDpost('booking/add',data)
		 .done(function(response){
		 	if(response.status){
		 		$("#shortcutBtn").parents(".qw-shortcut-main").children(".qw-popup-close").trigger("click");
		 	}else{
		 		if(response.code == 1006){
		 			$.TMDcaptcha($("#shortcutCaptchaImage"))
		 			$("#shortcutBtn").addClass("open");
		 			$("#shortcutCaptcha").removeAttr("disabled").val('').focus();
		 		}
		 	}
		 	layer.msg(response.msg)
		 })

	}
	//预约按钮
	$(document).on("click","#shortcutBtn",shortcutFunc)
	$(document).on("click","#shortcutCaptchaImage",function(){
		$.TMDcaptcha($("#shortcutCaptchaImage"))
	})
	$(document).on("click",".qw-shortcut-main .qw-fixed-box",function(){
		return false;
	})
	$(document).on("keyup","#shortcutCaptcha",function(){
		var val = $(this).val();
		if(val.length >= 4){
			$(this).val(val.substring(0,4));
			$(this).attr("disabled","disabled");
			shortcutFunc();
		}
	})
	//返回顶部
	$(document).on("click",".qw-g-shortcut #topScroll",function(){
		$("html,body").animate({
            scrollTop: 0
        }, 300);
	})
}
/*注册全局函数*/
$(TMDinit)