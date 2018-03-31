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
}
//页面加载执行
$(indexFunc)