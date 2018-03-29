
$(function(){

// 	/*var limit = [$('.qw-home-advantage').offset().top-100,
// 				 $('.qw-home-crisis').offset().top-100,
// 				 $('.qw-home-experience').offset().top-100,
// 				 $('.qw-home-happiness').offset().top-100,
// 				 $('.qw-home-good-head').offset().top-100,
// 				 $('.qw-home-nav-bbs').offset().top-100

// 	];*/
// 	var limit = [0,
// 				 $('.qw-home-crisis').offset().top-500,
// 				 $('.qw-home-experience').offset().top-500,
// 				 $('.qw-home-happiness').offset().top-500,
// 				 $('.qw-home-good-head').offset().top-500,
// 				 $('.qw-home-nav-bbs').offset().top-500

// 	];

// 	var limitStop = [true,true,true,true,true,true];
// 	//第一屏动画提前
// 	limitStop[0]=false;

// 			var c1Img = $('.qw-home-advantage .qw-advantage-item img');

// 			for(var i=0;i<c1Img.length;i++){

// 				(function(i){

// 					setTimeout(function(){

// 						c1Img.eq(i).fadeIn(1000);

// 					},i*500)

// 				})(i)

// 			}


// 	$(window).on('scroll',function(){

// 		var scrollTop = $(document).scrollTop();

// 		if(scrollTop>=limit[0] && limitStop[0]==true){

// 			// limitStop[0]=false;

// 			// var c1Img = $('.qw-home-advantage .qw-advantage-item img');

// 			// for(var i=0;i<c1Img.length;i++){

// 			// 	(function(i){

// 			// 		setTimeout(function(){

// 			// 			c1Img.eq(i).fadeIn(1000);

// 			// 		},i*500)

// 			// 	})(i)

// 			// }

// 		}

// 		if(scrollTop>=limit[1] && limitStop[1]==true){

// 			limitStop[1]=false;

// 			$('.qw-home-crisis .qw-crisis-title img').animate({top:'0px',opacity:'1'},1300);
// 			$('.qw-home-crisis .qw-phases-item-move1').animate({left:'0px',opacity:'1'},0);
// 			$('.qw-home-crisis .qw-phases-item-move2').animate({left:'0px',opacity:'1'},300);
// 			$('.qw-home-crisis .qw-phases-item-move3').animate({left:'0px',opacity:'1'},900);
// 			$('.qw-home-crisis .qw-phases-item-move4').animate({left:'0px',opacity:'1'},2000);
// 			$('.qw-home-crisis .qw-phases-answer').animate({opacity:'1'},2600);
// 		}

// 		if(scrollTop>=limit[2] && limitStop[2]==true){

// 			limitStop[2]=false;

// 			$('.qw-home-experience .qw-experience-title .img').animate({top:'0px',opacity:'1'},1300);

// 		}

// 		if(scrollTop>=limit[3] && limitStop[3]==true){

// 			limitStop[3]=false;

// 			$('.qw-home-happiness .qw-happiness-title img').animate({top:'0px',opacity:'1'},1300);
// 			$('.qw-happiness-move1').animate({top:'0px',opacity:'1'},1000);
// 			$('.qw-happiness-move2').animate({right:'0px',opacity:'1'},1500);
// 			$('.qw-happiness-move3').animate({top:'0px',opacity:'1'},2000);
// 			$('.qw-happiness-move4').animate({left:'0px',opacity:'1'},2500);

// 		}

// 		if(scrollTop>=limit[4] && limitStop[4]==true){

// 			limitStop[4]=false;

// 			$('.qw-home-good-head .qw-good-title img').animate({top:'0px',opacity:'1'},1300);
// 			$('.qw-home-good-middle .qw-middle-exploit img').animate({top:'0px',opacity:'1'},2000);
// 			$('.qw-home-good-middle .qw-middle-iphone img').animate({left:'0px',opacity:'1'},1400);
// 		}

// 		if(scrollTop>=limit[5] && limitStop[5]==true){

// 			limitStop[5]=false;

// 			$('.qw-home-nav-bbs .qw-nav-bbs-title img').animate({top:'0px',opacity:'1'},1300);

// 		}

// 	})

	// 轮播
	
	var $experienceUl = $('.qw-experience-list');
	var $experienceLi = $('.qw-experience-item-whitebg');
	timer = null;

	// Ul的宽度
	$experienceUl.width($experienceLi.length*($experienceLi.width()));

	function experienceAnimate(){
		$experienceUl.stop(true,true).animate({left:'-284px'},700,function(){
			$experienceUl.find('.qw-experience-item-whitebg').first().insertAfter($experienceUl.find('.qw-experience-item-whitebg').last());
			$experienceUl.css({left:'0px'});
		});
	}

	// 定时器开
	timer = setInterval(function(){

		experienceAnimate();

	},3000)

	// 定时器关
	$('.qw-experience-listbox-wrapper').hover(function(){

		clearInterval(timer);

		},function(){

			timer = setInterval(function(){

				experienceAnimate();

		},3000)

	})

	// 下一个按钮
	$('.qw-home-experience .qw-banner-control .qw-btn-next').click(function(){
		experienceAnimate();
	})

	// 上一个按钮
	$('.qw-home-experience .qw-banner-control .qw-btn-prev').click(function(){

		$experienceUl.find('.qw-experience-item-whitebg').last().insertBefore($experienceUl.find('.qw-experience-item-whitebg').first());
		$experienceUl.css({left:'-284px'});
		$experienceUl.stop(true,true).animate({left:'0'},700);
	})

	// Li的鼠标移入
	$experienceLi.mouseover(function(){

			$(this).css({'background-image':'url(/static/images/services/love/c_03_greenbg.png)'});
			$(this).find('.qw-item-subtitle-blackfont').css({'color':'#fff'})
			$(this).find('.qw-item-content-blackfont').css({'color':'#fff'})
			$(this).find('.qw-item-greenline').css({'background':'#fff'})

		})
	// Li的鼠标移出
	$experienceLi.mouseout(function(){

			$(this).css({'background-image':'url(/static/images/services/love/c_03_whitebg.png)'});
			$('.qw-item-subtitle-blackfont').css({'color':'#494949'});
			$('.qw-item-content-blackfont').css({'color':'#494949'});
			$('.qw-item-greenline').css({'background':'#21c8ac'});

		})

	$(".qw-phases-item").hover(function(){
		var index= $(".qw-phases-item").index($(this));
		$(".qw-phases-answer-position").hide().eq(index).show();
	},function(){

	})

});