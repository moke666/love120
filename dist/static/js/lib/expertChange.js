//导师 部分 图片切换
var timer = null;
var offset = 5000;
var index = -1; 

//大图交替轮换
function slideImage(i){
    var id = 'image_'+ target[i];
    $('#'+ id).animate({opacity: 1},  function(){
        }).fadeIn()
        .siblings(':visible')
        .find('.pic').animate('fast',function(){
            $(this).parent().animate({opacity: 0}).hide();
        });
}
//小图点击
function hookThumb(){    
    $('#thumbs li a')
        .bind('click', function(){
            if (timer) {
                clearTimeout(timer);
            }                
            var id = this.id;            
            index = getIndex(id.substr(6));
            rechange(index);
            slideImage(index); 
            timer = window.setTimeout(auto, offset);  
            this.blur();            
            return false;
        });
}
//get index
function getIndex(v){
    for(var i=0; i < target.length; i++){
        if (target[i] == v) return i;
    }
}
function rechange(loop){
    var id = 'thumb_'+ target[loop];
    $('#thumbs li a.current').removeClass('current');
    $('#'+ id).addClass('current');

  $(".expert-name").html(nameArray[index]);

  $(".honer1").html(honerArray1[index]);
  $(".honer2").html(honerArray2[index]);
  $(".honer3").html(honerArray3[index]);
  $(".honer4").html(honerArray4[index]);
  $(".honer5").html(honerArray5[index]);
  $(".honer6").html(honerArray6[index]);

  $(".welldetail").html(contentArray[index]);
}
function auto(){
    index++;
    if (index > 2){
        index = 0;
    }
    rechange(index);
    slideImage(index);
    
  $(".expert-name").html(nameArray[index]);

  $(".honer1").html(honerArray1[index]);
  $(".honer2").html(honerArray2[index]);
  $(".honer3").html(honerArray3[index]);
  $(".honer4").html(honerArray4[index]);
  $(".honer5").html(honerArray5[index]);
  $(".honer6").html(honerArray6[index]);

  $(".welldetail").html(contentArray[index]);

    timer = window.setTimeout(auto, offset);
}
$(function(){    
    auto();  
    hookThumb(); 
    
});


//姓名
var name1="阳光老师";
var name2="美籽老师";
var name3="汪琴老师";

var nameArray=new Array();
nameArray[0]=name1;
nameArray[1]=name2;
nameArray[2]=name3;

/*荣誉*/
var honer1="四川大学心理学硕士";
var honer2="IAC国际个人形象管理师";
var honer3="中国首届国际认证高级婚姻家庭指导师";

var honerArray1=new Array();
honerArray1[0]=honer1;
honerArray1[1]=honer2;
honerArray1[2]=honer3;


//
var honer1="国家一级婚姻家庭咨询师；";
var honer2="国家注册高级服装搭配师";
var honer3="中国高级婚姻家庭教育指导师";

var honerArray2=new Array();
honerArray2[0]=honer1;
honerArray2[1]=honer2;
honerArray2[2]=honer3;

//
var honer1="国家二级心理咨询师；";
var honer2="中国流行色协会色彩搭配师";
var honer3="莎提雅治疗师";

var honerArray3=new Array();
honerArray3[0]=honer1;
honerArray3[1]=honer2;
honerArray3[2]=honer3;

//
var honer1="四川省心理协会成员；";
var honer2="中国色彩协会会员";
var honer3="沙盘治疗师";

var honerArray4=new Array();
honerArray4[0]=honer1;
honerArray4[1]=honer2;
honerArray4[2]=honer3;


//
var honer1="美国NGH催眠协会会员；";
var honer2="";
var honer3="《婚姻的启蒙》《婚姻的奥秘》等系列课程编创者";

var honerArray5=new Array();
honerArray5[0]=honer1;
honerArray5[1]=honer2;
honerArray5[2]=honer3;

//
var honer1="全球职业规划师（GCDF）";
var honer2="";
var honer3="";

var honerArray6=new Array();
honerArray6[0]=honer1;
honerArray6[1]=honer2;
honerArray6[2]=honer3;



//简介
var content1="导师寄语：让我们一起来了解真正的自己，提升自我，成为一个有魅力，够吸引力，崭新的自己。";
var content2="导师寄语：不论在生活的任何阶段，我们都不应该放弃对美好的追求，竭尽全力，至善至美。";
var content3="导师寄语：情感咨询是针对亲密关系和自我成长的提升改善，突破舒适区的过程必然伴随着不适和痛苦，但老师希望陪着你最终走上幸福的道路，一起走下每一步。";

var contentArray=new Array();
contentArray[0]=content1;
contentArray[1]=content2;
contentArray[2]=content3;


