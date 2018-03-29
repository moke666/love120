// JavaScript Document
$(document).ready(function() {
		var oSrcollLimt = [];
		var caseList = [];
		
		$('.section').each(function () {
			14
		  oSrcollLimt.push({
		    limit: $(this).offset().top - 400,
		    status: true
		  })
		});
		
		$('.case-item').each(function () {
			caseList.push({
			  limit: $(this).offset().top - 900,
			  status: true
			})
		})
		var part1 = true;
		var part2 = true;
		var part3 = true;
		var part4 = true;
		
		$(window).scroll(function () {
			 var h = $(window).scrollTop();
			 //第一部分
			  // if ( h > 0 && h < $('.section2').offset().top - 200 && part1) { 
			  //   part1 = false;
			  //   for (var i = 0, len = $('.Emotional_hidden_danger').find('a').length; i < len; i++) {
				//   $('.Emotional_hidden_danger').find('a').eq(i).find('img').css({
				// 	'transform': 'rotateY(-360deg)',
				// 	'transition-delay': i * 0.2 + 's',
			  //     });
			  //   }
				// return;
			  // };
			  
			  //第二 部分
			  /*if (h > $('.section2').offset().top - 400 && h < $('.section3').offset().top - 200 && part2) {
			    part2 = false;
			    for (var i = 0, len = $('.detailReason').find('a').length; i < len; i++) {
			      $('.detailReason').find('a').eq(i).find('img').css({
//			        'bottom': '0px',
					'margin-top': '45px',
			        'transition-delay': i * 0.1 + 's'
			      });
			    }
			    return;
			  };*/
			  
			  //第三 部分
			  /*if (h > $('.section3').offset().top - 400 && h < $('.section4').offset().top - 200 && part3) {
			    part3 = false;
			      $('.emotion-img').find('img').css({
			        'width': '100%',
			        'margin-left': '-50%'
			      });
			    return;
			  };
			  
			  //第四 部分
			  if (h > $('.section4').offset().top - 400 && h < $('.section5').offset().top - 200 && part4) {
			    part4 = false;
			      $('.emotion-danger').css({
			        'padding-top': '138px'
			      });
			      
			    return;
			  };
			  
			  //最后案例部分 
			 for (var j = 0, caselen = $('.case-item').length; j < caselen; j++) {
			  if (h > caseList[j].limit && caseList[j].limit) {
			    caseList[j].limit = false;
			    $('.case-item').eq(j).animate({ 'margin-top': '50px' });
			  }
			}*/
			  
		});
});
//全局使用
var screenData = {
  w: $(window).width(),
  h: $(window).height()
};
//jquery 自定义方法
(function ($) {
  var isPhone = function (value) {
    if (/^1\d{10}$/.test(value)) {
      return true;
    } else {
      return false;
    }
  }
  $.extend({
    isPhone: isPhone
  })
})(jQuery);

