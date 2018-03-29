
$(function(){

	// var limit = [//$('.qw-goddess .qw-home-plan').offset().top,
	// 			 0,
	// 			 $('.qw-goddess .qw-home-curriculum').offset().top-1000,
	// 			 $('.qw-goddess .qw-home-advantage').offset().top-1200,
	// 			 $('.qw-goddess .qw-home-reputation').offset().top-1300
				 
	// ];

	// var limitStop = [true,true,true,true,true,true,true];
	// //第一屏加载
	// limitStop[0]=false;

	// 		$('.qw-goddess .qw-plan-left-item-img').animate({left:'0px'},1700);
	// 		$('.qw-goddess .qw-plan-left-title img').animate({top:'0px',opacity:'1'},1000);
	// 		$('.qw-goddess .qw-plan-left-passage p').animate({top:'0px',opacity:'1'},1500);
	// 		$('.qw-goddess .qw-plan-left-item-label').animate({top:'0px',opacity:'1'},3500);

	// // 鼠标滚动事件
	// $(window).on('scroll',function(){

	// 	var scrollTop = $(document).scrollTop();

	// 	// if(scrollTop>=limit[0] && limitStop[0]==true){
	// 	// 	limitStop[0]=false;

	// 	// 	$('.qw-goddess .qw-plan-left-item-img').animate({left:'0px'},1700);
	// 	// 	$('.qw-goddess .qw-plan-left-title img').animate({top:'0px',opacity:'1'},1000);
	// 	// 	$('.qw-goddess .qw-plan-left-passage p').animate({top:'0px',opacity:'1'},1500);
	// 	// 	$('.qw-goddess .qw-plan-left-item-label').animate({top:'0px',opacity:'1'},3500);
	// 	// }

	// 	if(scrollTop>=limit[1] && limitStop[1]==true){
	// 		limitStop[1]=false;
	// 		$('.qw-goddess .qw-curriculum-form img').slideDown(1000);
	// 		$('.qw-goddess .qw-curriculum-adorn1').slideDown(1000);
	// 		$('.qw-goddess .qw-curriculum-adorn2').slideDown(1000);
	// 		$('.qw-goddess .qw-curriculum-form img').animate({opacity:'1'},2000);
	// 		$('.qw-goddess .qw-curriculum-adorn1').animate({opacity:'1'},2000);
	// 		$('.qw-goddess .qw-curriculum-adorn2').animate({opacity:'1'},2000);
	// 	}

	// 	if(scrollTop>=limit[2] && limitStop[2]==true){
	// 		limitStop[2]=false;

	// 		// $('.qw-goddess .qw-advantage-title img').animate({left:'1500px',opacity:'0'},1500);
	// 		// $('.qw-goddess .qw-advantage-content-img1').animate({left:'1500px',opacity:'0'},1700);
	// 		// $('.qw-goddess .qw-advantage-content-img2').animate({left:'1500px',opacity:'0'},1300);
	// 		// $('.qw-goddess .qw-advantage-content-img3').animate({left:'1500px',opacity:'0'},1500);
	// 		// $('.qw-goddess .qw-advantage-content-img4').animate({left:'1500px',opacity:'0'},2000);
	// 		// $('.qw-goddess .qw-advantage-content-mid img').animate({opacity:'0'},800);
	// 		// $('.qw-goddess .qw-advantage-title img').animate({left:'-3000px',opacity:'0'},200);
	// 		// $('.qw-goddess .qw-advantage-content-img1').animate({left:'-3000px'},200);
	// 		// $('.qw-goddess .qw-advantage-content-img2').animate({left:'-3000px'},200);
	// 		// $('.qw-goddess .qw-advantage-content-img3').animate({left:'-3000px'},200);
	// 		// $('.qw-goddess .qw-advantage-content-img4').animate({left:'-3000px'},200);
	// 		$('.qw-goddess .qw-advantage-title img').animate({left:'0',opacity:'1'},1500);
	// 		$('.qw-goddess .qw-advantage-content-img1').animate({left:'0',opacity:'1'},1700);
	// 		$('.qw-goddess .qw-advantage-content-img2').animate({left:'0',opacity:'1'},1300);
	// 		$('.qw-goddess .qw-advantage-content-img3').animate({left:'0',opacity:'1'},1500);
	// 		$('.qw-goddess .qw-advantage-content-img4').animate({left:'0',opacity:'1'},2000,function(){
	// 			$('.qw-goddess .qw-advantage-content-mid img').animate({opacity:'1'},1700);
	// 		});
	// 	}

	// 	if(scrollTop>=limit[3] && limitStop[3]==true){
	// 		limitStop[3]=false;

	// 		var c3Img = $('.qw-goddess .qw-home-reputation img');
	// 		for(var i=0;i<c3Img.length;i++){

	// 			(function(i){
	// 				setTimeout(function(){
	// 					c3Img.eq(i).fadeIn(1300);
	// 				},i*300)
	// 			})(i)
	// 		}
	// 	}
	// })
	$(".zt-goddess-tutor-item").hover(function(){
		var index = $(".zt-goddess-tutor-item").index($(this));
		$(this).addClass("active").siblings().removeClass("active");
		$(".zt-tutor-main-items").hide().eq(index).stop(true,true).slideDown();
	},function(){
		
	})
});