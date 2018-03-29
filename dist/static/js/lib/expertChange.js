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
var name1="王炜老师";
var name2="李代勤老师";
var name3="李雨恩老师";

var nameArray=new Array();
nameArray[0]=name1;
nameArray[1]=name2;
nameArray[2]=name3;

/*荣誉*/
var honer1="国家情感咨询师；";
var honer2="四川大学应用心理学高级研修班在读";
var honer3="应用心理学学士";

var honerArray1=new Array();
honerArray1[0]=honer1;
honerArray1[1]=honer2;
honerArray1[2]=honer3;


//
var honer1="四川大学心理学硕士；";
var honer2="爱情120两性情感导师";
var honer3="国家二级心理咨询师";

var honerArray2=new Array();
honerArray2[0]=honer1;
honerArray2[1]=honer2;
honerArray2[2]=honer3;

//
var honer1="华西医院认证心理咨询师；";
var honer2="国家三级心理咨询师";
var honer3="国家二级婚姻家庭咨询师";

var honerArray3=new Array();
honerArray3[0]=honer1;
honerArray3[1]=honer2;
honerArray3[2]=honer3;

//
var honer1="冷爱再传弟子；";
var honer2="从事婚恋心理学研究工作10余年";
var honer3="多年婚恋情感咨询实战经历";

var honerArray4=new Array();
honerArray4[0]=honer1;
honerArray4[1]=honer2;
honerArray4[2]=honer3;


//
var honer1="花镇黄埔计划精英咨询师；";
var honer2="";
var honer3="";

var honerArray5=new Array();
honerArray5[0]=honer1;
honerArray5[1]=honer2;
honerArray5[2]=honer3;

//
var honer1="";
var honer2="";
var honer3="";

var honerArray6=new Array();
honerArray6[0]=honer1;
honerArray6[1]=honer2;
honerArray6[2]=honer3;



//简介
var content1="擅长领域：恋爱挽回，婚姻修复，长期关系经营，自我提升";
var content2="擅长领域：恋爱、婚姻心理研究，爱情挽回，两性关系、恋爱指导等等";
var content3="擅长领域：恋爱、婚姻心理研究，婚姻修复，两性关系，长期关系经营";

var contentArray=new Array();
contentArray[0]=content1;
contentArray[1]=content2;
contentArray[2]=content3;


