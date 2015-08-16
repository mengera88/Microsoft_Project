

$(document).ready(function(){
    var nowFrame=1;
	var maxFrame=4;		
	setInterval(function(){
		 var w=$('.carpool').width();
		for (var i=1;i<(maxFrame+1);i++) {
			
			if(i==nowFrame)
		     	{
		     		$("#img"+nowFrame).css("display","block");
		     		$("#img"+nowFrame).css("opacity","0");
  	     		    $("#img"+nowFrame).animate({opacity:1},2000);
  	     		}
		     else
		     {   
		        $("#img"+i).css('display','none');
		        //$("#img"+i).animate({opacity:0},0);
		     }
		     
		}
		if(nowFrame==maxFrame)
		    nowFrame=1;
		else
		    nowFrame++;
	},3000);
	
	
//	var imagescroll=function(){
//	
//	    var w=$('.carpool').width();
//		for (var i=1;i<(maxFrame+1);i++) {
//			
//			if(i==nowFrame)
//		     	{
//		     		$("#img"+nowFrame).css("display","block");
////		     		$("#img"+nowFrame).animate({marginLeft:-w},500);
//
//		     	}
//		     else
//		     {
//   	
//		        $("#img"+i).css('display','none');
//		     }
//		     
//		}
//		if(nowFrame==maxFrame)
//		nowFrame=1;
//		else
//		nowFrame++;
//};
		     	
});
//$(document).ready(function(){
//	var nowFrame=1;
//	var maxFrame=4;
//	setInterval(imagescroll(nowFrame,maxFrame),3000);
//
//
////图片转换函数
//function imagescroll(nowFrame,maxFrame){
//	
//	for (var i=1;i<(maxFrame+1);i++) {
//			if(i==nowFrame)
//		     	{
//		     		$("#img"+nowFrame).css('display','block');
////		     	    $("#img"+nowFrame).animate({width:"100%"});
//		     	}
//		     else
//		     {
////		     	
//		        $("#img"+i).css('display','none');
//		     }
//		     
//		}
//		if(nowFrame==maxFrame)
//		nowFrame=1;
//		else
//		nowFrame++;
//};
//
//});