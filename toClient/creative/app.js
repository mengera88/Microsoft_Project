//xxx
"use strict";
var $video, vp, $videoPlayer;
var $videoContainer = $('.video-container');
/* Extended  UTCommonModule Begin*/
UT_CM.$ad_choices = $('#ad_choices');
UT_CM.ignoreIDArray = ["ut_open", "ut_close", "COLLAPSED_BACKGROUND_EXIT", "EXPANDED_BACKGROUND_EXIT", "ad_choices"];
UT_CM.ignoreWraps = "#ut_open, #ut_close";

var cBtn=false;

//自己编写的函数

setTimeout(function(){
        fixVideo();
},3000);

function buttonHover(){
    if(platform.isDesktop){
         $('.cta').mouseenter(function() {
         TweenMax.to($('.normal'),.2,{y:'40'});
         setTimeout(function(){
            TweenMax.to($('.normal'),.2,{y:'0'});
         },100);
        
        
    });
  }
 }

function bgHover(){
     if(platform.isDesktop){
        $('.bgFrame').mouseover(function(){
        TweenMax.to($('.playBtn'),.1,{autoAlpha:0.6});
        TweenMax.to($('.bgFrame'),.1,{autoAlpha:0.94});
    });
        $('.bgFrame').mouseout(function(event) {
        /* Act on the event */
        TweenMax.to($('.playBtn'),.1,{autoAlpha:1});
        TweenMax.to($('.bgFrame'),.1,{autoAlpha:1});
    });
     }
      if(platform.isDesktop){
        $('.playBtn').mouseover(function(){
        TweenMax.to($('.playBtn'),.001,{autoAlpha:0.6});
        TweenMax.to($('.bgFrame'),.1,{autoAlpha:0.94});
    });
    //     $('.playBtn').mouseout(function(event) {
    //     /* Act on the event */
    //     TweenMax.to($('.playBtn'),.1,{autoAlpha:1});
    //     TweenMax.to($('.bgFrame'),.1,{autoAlpha:1});
    // });
     }
    
}

function playControl(){
    if(platform.isiPhone){
        $('.playBtn').click(function(){
            $('.bgFrame').append("<div class='video'></div>");
            $(".utvp_play_toggle_wrapper").trigger('click');
            undertone.creative.trackEvent("CLICK", "OPEN_VIDEO");
            return false;
        })
        
    }
    else{
        $('.bgFrame').click(function(){
        TweenMax.to($('.mengban'), .2, {
            autoAlpha: 1
        });
        TweenMax.to($('.video-container'), .2, {
            autoAlpha: 1
        });
        $(".utvp_play_toggle_wrapper").trigger('click');
        undertone.creative.trackEvent("CLICK", "OPEN_VIDEO");
        return false;
    });
    $('.playBtn').click(function(){
            TweenMax.to($('.mengban'),.2,{autoAlpha:1});
            TweenMax.to($('.video-container'),.2,{autoAlpha:1});
            $(".utvp_play_toggle_wrapper").trigger('click');
            undertone.creative.trackEvent("CLICK", "OPEN_VIDEO");
            return false;

    });
    }
    
    
};

function closePlay(){
	$('#vdo_close').click(function(){
		TweenMax.to($('.mengban'),.2,{autoAlpha:0});
        TweenMax.to($('.video-container'),.2,{autoAlpha:0});
        vp.pause();
        undertone.creative.trackEvent("CLICK", "CLOSE_VIDEO");
		return false;
	});
};



function leavePlay(){
	$('.four').click(function(){
		$openButton.trigger('click');
		TweenMax.to($('.mengban'),.2,{autoAlpha:1});
       	TweenMax.to($('.video-container'),.2,{autoAlpha:1});
        $('video').get(0).currentTime = 0;
        
        // setTimeout(function(){
        //     $(".utvp_play_toggle_wrapper").trigger('click');
        // },1500);
            
        //  undertone.creative.trackEvent("CLICK","CLICK_TO_WATCH_BUTTON");
        $(".utvp_play_toggle_wrapper").trigger('click');
   
        
       
		return false;
	});
};


playControl();
closePlay();
leavePlay();
buttonHover();
bgHover(); 
UT_CM.openAnimation = function() {      //进场动画，页面第一次载入时触发，只会触发一次
    //undertone.creative.trackEvent("event", "id");
    //do opening animating  
    // $('#instagram').instagram_feed();

    initVideo();
//  setTimeout(initVideo, 3000);
   
    setTimeout(fixVideo, 10);

    // console.log(UT_CM.trackingList);
};




UT_CM.expandAd = function() {        //点击展开按钮时触发
    initVideo();
};

UT_CM.afterExpandAd = function() {        //完全展开时触发
    //console.log('=== afterExpandAd ===');

}

UT_CM.collapseAd = function() {        //点击关闭按钮时触发
   // console.log('=== collapseAd ===');
   TweenMax.to($('.mengban'),.2,{autoAlpha:0});
        TweenMax.to($('.video-container'),.2,{autoAlpha:0});
        vp.pause();
};

UT_CM.afterCollapseAd = function() {        //完全关闭时触发
   // console.log('=== afterCollapseAd ===');
}

UT_CM.resizeAd = function(width, height) {        //页面第一次载入时触发;浏览器窗口大小改变时触发;
	                                               //旋转手机屏幕时触发
//  console.log(width, height);
    $video && fixVideo();
    if (platform.isMobile && !platform.isiPhone && width > height && vp) {
        vp.pause();
    }
};
/* Extended  UTCommonModule End*/

function initVideo() {

    var sourceMp4 = platform.isMobile ? 'video/Mvideo.mp4' : 'video/video.mp4';
    var startCover = platform.ltIE9 ? "video/firstFrameIE.jpg" : "video/firstFrame.jpg";
    var endCover = platform.ltIE9 ? "video/endFrameIE.jpg" : "video/endFrame.jpg";
    var config = {
        aspectRatio: "16:9",
        source_mp4: sourceMp4,
        slate: startCover,
        endSlate: endCover,
        displayHidden: false,
        preload: 'auto',
        clickID: 7
    };

    if ($('#VIDEO_PLAYER').data("ut_videoplayer")) $('#VIDEO_PLAYER').data("ut_videoplayer").videoPlayer._instances["VIDEO_PLAYER"].params.clickID = config.clickID
   // if (platform.isiPhone){
   // 	    vp = $(".video-iphone .video").attr("id", "VIDEO_PLAYER").ut_videoplayer(config);
   //      $videoPlayer = $('.video-iphone .video');
   // }
   // else{
   //  vp = $(".video-container .video").attr("id", "VIDEO_PLAYER").ut_videoplayer(config);
   
   //  /*$('video').on('play pause', function() {
   //      $(".utvp_controls").css("-webkit-transform", "translate3d(0,0,0)");
   //  });*/
   //  $videoPlayer = $('.video-container .video');
   
   // }
     vp = $(".video").attr("id", "VIDEO_PLAYER").ut_videoplayer(config);
     $videoPlayer = $('.video');
     $video = $('video');
     //$video = document.getElementsByTagName('video')[0];
     
     $video.on('ended', function() {
        $html.addClass('videoComplete');
    });
    $video.on('play', function() {
        $html.removeClass('videoComplete');
        fixVideo();
    });
}



function fixVideo() {  //调整宽高
//	alert(1);
    if (!platform.isDesktop) {
        var h = $videoContainer.width() * 9 / 16 - 0;
        if (!h) return; 
        $videoContainer.height(h);
        if (platform.isiPhone) {
            $video.css({
                'height': Math.ceil(h) + 'px!important',
                '-webkit-transform': 'scale(1.001)'
            });
        }
        if (platform.isTablet) {
            h = h + (h > 300 ? 2 : 1);
            $video.css('height', h + 'px!important');
        }
    } else {
        var h = $video.height();
        if (!h) return;
        platform.isIE10 && (h = h - 2);
        $videoContainer.height(h);
    }
}

UT_CM.pictureLoad();
UT_CM.registerEvent();
UT_CM.fixAdChoices();
UT_CM.checkPlatform();
UT_CM.updateUI();
// keep the unused css rules
function tmp() {
    var tmp = {};
    tmp.className = "normal";
    tmp.className = ".utvp_player_frame, .utvp_video";
    tmp.className = ".preload img";
    tmp.className = "ul, ol, li";
    tmp.className = ".clear_both";
    tmp.className = ".clearfix:after";
    tmp.className = ".clearfix";
    tmp.className = "* html .clearfix";
    tmp.className = "a";
    tmp.className = "a:active, a:focus, input";
    tmp.className = ".video-container video";
    tmp.className = ".interactive .icon";
    tmp.className = "#ut_close.rotate-ani, #ut_open.rotate-ani";
    tmp.className = "#ut_close.opacity-ani, #ut_open.opacity-ani";
    tmp.className = "undefined";
    tmp.className = ".utvp_player_frame, .utvp_video, .utvp_slate, .utvp_cover, .utvp_play_toggle_wrapper_insert";
    tmp.className = ".utvp_player_frame, object";
    tmp.className = ".utvp_play_toggle";
    tmp.className = "table";
    tmp.className = "video";
    tmp.className = ".utvp_time_current, .utvp_time_duration";
    tmp.className = ".utvp_volume_slider";
    tmp.className = ".utvp_player_frame";
    tmp.className = ".utvp_controls, .picture-holder, .utvp_play_toggle, .utvp_buffer_wrapper, .utvp_slate, .utvp_player_frame";
    tmp.className = ".icon-play-toggle:before";
    tmp.className = ".utvp_play_toggle_wrapper:hover .icon-play-toggle:before";
    tmp.className = ".utvp_control_bar_buttons";
    tmp.className = ".utvp_control_bar_buttons:hover";
    tmp.className = ".utvp_progress_down";
    tmp.className = ".utvp_progress_current";
    tmp.className = ".btn-container";
    tmp.className = ".btn-container .normal";
    tmp.className = ".btn-container .hover";
    tmp.className = "#ad_choices";
    tmp.className = ".leavebehind .icon";
}