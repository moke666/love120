//专家团队数据
var TEAMDATA = {
	list: [],
	qaList: {},
	users: {}
},
	getTeamQuery = {
		page: 1,
		num: 4
	},
	getTeamStop = true;
//专家详情
var teamDetailTemplate = '<div class="qw-left qw-home-team-users">' +
	'<div class="img"><img src="{{ d.profile_image_detail }}?imageView2/1/w/320/h/427" alt=""></div>' +
	'</div>' +
	'<div class="qw-left qw-home-team-intro">' +
	'<a href="/tutor/{{d.tutor_alias}}/">' +
	'<div class="qw-team-title">{{ d.member_name }}</div>' +
	'<div class="qw-team-subtitle">' +
	'<span>{{ d.member_title }}</span>' +
	'{{# for(var i = 0, len = d.label.length>4?4:d.label.length; i < len; i++){ }}' +
	'<span class="qw-inline-block qw-label-{{i}}">{{ d.label[i] }}</span>' +
	'{{# } }}' +
	'</div>' +
	'<p class="qw-team-intro">{{ d.member_introduction.substring(1,146)+"..." }}</p>' +
	'</a>' +
	'<div class="qw-team-comment">' +
	'<div class="title">最新网友提问</div>' +
	'<div class="qw-cmmont-user qw-clear">' +
	'<div class="qw-user-avatar qw-left">' +
	'<div class="qw-user-avatar-bg"></div>' +
	'<img src="{{ TEAMDATA.users[TEAMDATA.qaList[d.connect_userid].question_created_userid].avatar }}?imageView2/1/w/32/h/32">' +
	'</div>' +
	'<div class="qw-user-nickname qw-left">{{ TEAMDATA.users[TEAMDATA.qaList[d.connect_userid].question_created_userid].nickname }}</div>' +
	'</div>' +
	'<a href="/question/{{TEAMDATA.qaList[d.connect_userid].qid}}/">' +
	'<div class="qw-commont-question">{{ TEAMDATA.qaList[d.connect_userid].question_title }}</div>' +
	'<p class="qw-commont-answer">答：{{ TEAMDATA.qaList[d.connect_userid].answer_details }}</p>' +
	'</a>' +
	'<div class="qw-clear qw-home-team-control">' +
	'<div class="qw-left">' +
	'<a class="qw-button-red qw-hone-team-btn" href="/qa/explore">邀请回答</a>' +
	'<a class="qw-button-red-line qw-hone-team-btn" consult="kst">在线咨询</a>' +
	'</div>' +
	'<div class="qw-right qw-text-right more">' +
	'<a href="/team">查看全部导师 >></a>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';
//专家列表
var teamTemplate = '{{# for(var i = 0, len = d.length; i < len; i++){ }}' +
	'<li class="qw-home-team-item" data-index={{ ((getTeamQuery.page-2)*getTeamQuery.num)+i }}>' +
	'<div class="qw-team-avatar"><div class="qw-team-circle"></div><img src="{{ d[i].profile_image_list }}?imageView2/1/w/60/h/60"></div>' +
	'<div class="qw-team-info">' +
	'<div class="qw-team-title">{{ d[i].member_name }}</div>' +
	'<div class="qw-team-subtitle">{{ d[i].member_title }}</div>' +
	'</div>' +
	'</li>' +
	'{{# } }}';
//页面功能
var indexFunc = function () {
	//开启轮播
	$(".qw-banner-view").TMDslide(5000);
	//专家团队介绍
	// var $list = $(".qw-home-team-list"),
	// 	$listItem,
	// 	$prev = $(".qw-home-team-prev"),
	// 	$next = $(".qw-home-team-next");
	// function getTeam() {
	// 	if (!getTeamStop) {
	// 		return false;
	// 	}
	// 	$.TMDpost('team/get_homepage_list', getTeamQuery, false).done(function (response) {
	// 		if (response.status) {
	// 			response.result.Memberlist.length < getTeamQuery.num ? getTeamStop = false : null;
	// 			getTeamQuery.page++;

	// 			laytpl(teamTemplate).render(response.result.Memberlist, function (html) {
	// 				$("#teamList").append(html)
	// 				TEAMDATA.list = TEAMDATA.list.concat(response.result.Memberlist);
	// 			})

	// 			TEAMDATA.qaList = $.extend(true, response.result.qaList, TEAMDATA.qaList);
	// 			TEAMDATA.users = $.extend(true, response.result.users, TEAMDATA.users);

	// 			$listItem = $list.find(".qw-home-team-item");
	// 			$list.css('width', $listItem.length * 266 + "px");
	// 		}
	// 	})
	// }

	// getTeam();

	// laytpl(teamDetailTemplate).render(TEAMDATA.list[0], function (html) {
	// 	$("#teamDetail").html(html)
	// });

	//左移
	// $next.on("click", function () {
	// 	var oLeft = parseInt($list.css("left"));
	// 	var leftMax = $list.find(".qw-home-team-item").length * 266 - 1064;

	// 	if (Math.abs(oLeft) == leftMax) {
	// 		getTeam();
	// 		leftMax = $list.find(".qw-home-team-item").length * 266 - 1064;
	// 	}
	// 	if (oLeft - 1064 <= -leftMax) {
	// 		oLeft = -leftMax;
	// 		if (!getTeamStop) {
	// 			// for(var i=0;i<4;i++){
	// 			// 	$list.append($list.find(".qw-home-team-item").eq(0))
	// 			// }

	// 			// $list.css("left",oLeft+1064+'px')
	// 			//layer.msg('没有更多的专家了!-_-')
	// 		}
	// 	} else {
	// 		oLeft = oLeft - 1064;
	// 	}
	// 	$list.stop(true, true).animate({ left: oLeft + "px" }, 500);
	// })
	// //右移
	// $prev.on("click", function () {
	// 	var oLeft = parseInt($list.css("left"))
	// 	var len = $list.find(".qw-home-team-item");
	// 	if (oLeft + 1064 > 0) {
	// 		oLeft = 0;
	// 		//layer.msg('已经是第一位了')

	// 		// for(var i=0;i<4;i++){
	// 		// 		$list.prepend($list.find(".qw-home-team-item").eq(len-1))
	// 		// 	}

	// 		// 	$list.css("left",oLeft-1064+'px')
	// 	} else {
	// 		oLeft = oLeft + 1064;
	// 	}
	// 	$list.stop(true, true).animate({ left: oLeft + "px" }, 500);
	// })
	// //切换导师详情
	// $(document).on("click", ".qw-home-team-lists .qw-home-team-item", function () {
	// 	var index = $(this).attr("data-index");
	// 	laytpl(teamDetailTemplate).render(TEAMDATA.list[index], function (html) {
	// 		$("#teamDetail").html(html)
	// 	});
	// })

	// var teamFunc = function () {
	// 	getTeam();

	// 	var $list = $(".qw-home-team-list"),
	// 		$listItem = $list.find(".qw-home-team-item"),
	// 		$prev = $(".qw-home-team-prev"),
	// 		$next = $(".qw-home-team-next"),
	// 		il = $listItem.length - 3,
	// 		W = 266,
	// 		index = 0;
	// 	$list.css({
	// 		width: $listItem.length * 266 + "px",
	// 		left: -W * index + "px"
	// 	});


	// }



	//用户反馈
	// function feedbackFunc(){
	// 	var $list = $(".qw-home-feedback-list"),
	// 	 	$item = $list.find(".qw-home-feedback-item"),
	// 	 	index = 0,
	// 	 	limit = 0,
	// 		timer = null;
	// 	$list.prepend($item.eq($item.length-5).nextAll().clone())
	// 	$item = $list.find(".qw-home-feedback-item");
	// 	limit = $item.length;
	// 	$list.css("width",limit*283+"px");
	// 	function feedbackAni(){
	// 		index++;
	// 		$list.animate({"left":-index*1132+"px"},500,function(){
	// 			if(index==(limit/4)-1){
	// 				$list.css("left",0);
	// 				index=0;
	// 			}
	// 		})
	// 	}
	// 	timer = setInterval(feedbackAni,3000);
	// 	$list.hover(function(){
	// 		clearInterval(timer)
	// 	},function(){
	// 		timer = setInterval(feedbackAni,3000);
	// 	})
	// 	$item.click(function(){
	// 		var imgUrl = eval($(this).attr("data-attachments")),
	// 			h = $(window).height();
	// 		var sL = layer.open({
	// 			  type: 1,
	// 			  title:false,
	// 			  skin: 'qw-popup-preview', //样式类名
	// 			  area: ["800px", h/3*2+"px"],
	// 			  closeBtn: 0, //不显示关闭按钮
	// 			  shadeClose: true, //开启遮罩关闭
	// 			  content: '<img class="qw-popup-preview-img" src='+imgUrl[0]+' />'
	// 			})
	// 		$(document).one("keyup",function(e){
	// 			if(e.which == 27){
	// 				layer.close(sL)
	// 			}
	// 		})

	// 	})

	// }
	// feedbackFunc();
}
//页面加载执行
$(indexFunc)