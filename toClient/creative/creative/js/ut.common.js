// store references to DOM elements to save on subsequent traversals
var $window = $(window),
    $html = $("html"),
    $body = $('body'),
    $closeButton = $('#ut_close'),
    $openButton = $('#ut_open'),
    $leavebehind = $('.leavebehind'),
    $interactive = $('.interactive');

// var EXPANDED_BACKGROUND_EXIT = $("#EXPANDED_BACKGROUND_EXIT");
// var COLLAPSED_BACKGROUND_EXIT = $("#COLLAPSED_BACKGROUND_EXIT");
var clickButton = false;

var ua = window.navigator.userAgent.toLowerCase();//alert(ua);
window.platform = {
    isHD: window.devicePixelRatio > 1,
    isiPad: ua.match(/ipad/i) !== null,
    isiPhone: ua.match(/iphone/i) !== null,
    isAndroid: ua.match(/android/i) !== null,
    isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
    // isAndroid404: ua.match(/android 4\.0\.4/i) !== null,
    // isAndroid412: ua.match(/android 4\.1\.2/i) !== null,
    isAndroid444: ua.match(/android 4\.4\.4/i) !== null,
    isAndroid422: ua.match(/android 4\.2\.2/i) !== null,
    isAndroid43: ua.match(/android 4\.3/i) !== null,
    // isDuos: ua.match(/gt\-s7562/i) !== null,
    isS3: ua.match(/gt\-i93/i) !== null,
    isS4: ua.match(/gt\-i95/i) !== null,
    isS5: ua.match(/sm\-g900p/i) !== null,
    isNote3: ua.match(/sm\-n9/i) !== null,
    isNexus7: ua.match(/Nexus 7/gi) !== null,
    // isSMT210: ua.match(/sm\-t210/i) !== null,
    isIE: /(msie|trident)/i.test(navigator.userAgent), //window.navigator.appName.indexOf("Microsoft") !== -1,
    // isIE8: ua.match(/msie 8/) !== null,
    isIE11: ua.match(/Trident\/7\.0/i) !== null,
    isIE9 : $("html").hasClass('ie9'),
    ltIE9 : $("html").hasClass("lt-ie9"),
    isIE10: ua.match(/msie 10/) !== null,
    isChrome: ua.match(/Chrome/gi) !== null,
    isFirefox: ua.match(/firefox/gi) !== null,
    isWebkit: ua.match(/webkit/gi) !== null,
    isGecko: ua.match(/gecko/gi) !== null,
    isOpera: ua.match(/opera/gi) !== null,
    isMobile: navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) && navigator.userAgent.match(/Mobile/i) !== null,
    hasTouch: ('ontouchstart' in window),
    supportsSvg: !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
};

window.platform.isAndroidPad = platform.isAndroid && !platform.isMobile;
window.platform.isTablet = platform.isiPad || platform.isAndroidPad;
window.platform.isDesktop = !(platform.isMobile || platform.isTablet);
window.platform.isIOS = platform.isiPad || platform.isiPhone;

// window.platform.isIOS5 = window.platform.isIOS && ua.match(/os 5/i) !== null;
// window.platform.isIOS6 = window.platform.isIOS && ua.match(/os 6/i) !== null;
window.platform.isIOS7 = window.platform.isIOS && ua.match(/os 7/i) !== null;
window.platform.isIOS8 = window.platform.isIOS && ua.match(/os 8/i) !== null;

if(!window.console){
    window.console = {
        log:function (){}
    };
}

var startAdIsCalled = false;

TweenMax.delayedCall(0.5,function(){
    window.startAd();
});
/* event begin */
window.startAd = function() {
    if (startAdIsCalled) return;
    startAdIsCalled = true;
    if (!UT_CM.isAutoOpened) {
        UT_CM.isAutoOpened = true;
        $closeButton.css("visibility","visible");
        $openButton.css("visibility","hidden");
        $body.removeClass('closed').addClass('opened');
        UT_CM.openAnimation();
    }
};

window.closeAd = function() {
    if ($body.hasClass('opened')) {
        UT_CM.clickCloseBtn();
    } 
};

$openButton.on("click", function() {
    if(clickButton) return false;
    clickButton = true;

    UT_CM.clickOpenBtn();
});

$closeButton.on("click", function() {
    if(clickButton) return false;
    clickButton = true;
    
    UT_CM.clickCloseBtn();
});

$window.on("resize", function(){
    UT_CM.updateUI();
});
/* event end */

/*  UTCommonModule begin  */
var UT_CM = {};
UT_CM.isAutoOpened = false;
UT_CM.width = $window.width();
UT_CM.height = $window.height();
UT_CM.trackingList = [
["COLLAPSED_BACKGROUND_EXIT",1,''],
['COLLAPSED_LOGO',2,'.five'],
['COLLAPSED_PRODUCT',3,'.two'],
['COLLAPSED_PRODUCT',3,'.twoTablet']
["EXPANDED_BACKGROUND_EXIT",4,''],
['EXPANDED_LOGO',5,'.microLogo'],
['EXPANDED_LERN_MORE_BUTTON',6,'.cta'],
['EXPANDED_PRODUCT',7,'.computerImg'],
['EXPANDED_PRODUCT',7,'.computerTabletImg'],
,

];

UT_CM.closeBtnClass = "rotate-ani";//rotate-ani & opacity-ani

UT_CM.clickOpenBtn = function(){
    $closeButton.css("visibility","visible");
    $openButton.css("visibility","hidden");
    $openButton.removeClass(UT_CM.closeBtnClass);
    $closeButton.addClass(UT_CM.closeBtnClass);

    TweenMax.to($leavebehind, platform.ltIE9 ? 0 : 0.6, {
        autoAlpha: 0
    });

    $body.removeClass('closed').addClass('opened');
    $interactive.css('display', 'block');
    TweenMax.to($interactive, platform.ltIE9 ? 0 : 1, {
        autoAlpha: 1,
        delay: platform.ltIE9 ? 0 : 0.6,
        onComplete: function(){
            clickButton = false;

            UT_CM.afterExpandAd();
        }
    });

    TweenMax.fromTo(UT_CM.$ad_choices, platform.ltIE9 ? 0 : 0.6, {
        autoAlpha: 0
    },{
        autoAlpha: 1, 
        delay: platform.ltIE9 ? 0 : 0.6
    });

    UT_CM.expandAd();
}

UT_CM.clickCloseBtn = function(){
    $closeButton.css("visibility","hidden");
    $openButton.css("visibility","visible");
    $closeButton.removeClass(UT_CM.closeBtnClass);
    $openButton.addClass(UT_CM.closeBtnClass);

    TweenMax.to($interactive, platform.ltIE9 ? 0 : 0.8, {
        autoAlpha: 0,
        onComplete: function(){
            $interactive.css('display', 'none');
        }
    });

    $body.removeClass('opened').addClass('closed');
    TweenMax.to($leavebehind, platform.ltIE9 ? 0 : 0.8, {
        autoAlpha: 1,
        delay: platform.ltIE9 ? 0 : 0.8,
        onComplete: function(){
            clickButton = false;

            UT_CM.afterCollapseAd();
        }
    });

    TweenMax.fromTo(UT_CM.$ad_choices, platform.ltIE9 ? 0 : 0.3, {
        autoAlpha: 1
    },{
        autoAlpha: 0,
        onComplete: function(){

        }
    });

    TweenMax.fromTo(UT_CM.$ad_choices, platform.ltIE9 ? 0 : 0.2, {
        autoAlpha: 0
    },{
        autoAlpha: 1,
        delay: 1.2
    });

    UT_CM.collapseAd();
}

UT_CM.updateUI = function(){
    UT_CM.width = $window.width();
    UT_CM.height = $window.height();

    if(typeof UT_CM.resizeAd == "function"){
        UT_CM.resizeAd(UT_CM.width, UT_CM.height);
    }
}

UT_CM.checkPlatform = function(){
    if(platform.isDesktop) $html.addClass('desktop');
    if(platform.isMobile) $html.addClass('mobile');
    if(platform.isiPhone) $html.addClass('iphone');
    if(platform.isAndroid) $html.addClass('android');
    if(platform.isIOS) $html.addClass('ios');
    // if(platform.isIOS5) $html.addClass('ios5');
    // if(platform.isIOS6) $html.addClass('ios6');
    if(platform.isIOS7) $html.addClass('ios7');
    if(platform.isIOS8) $html.addClass('ios8');

    // if(platform.isDuos) $html.addClass('duos'); 
    if(platform.isS3) $html.addClass('s3');
    if(platform.isS4) $html.addClass('s4');
    if(platform.isS5) $html.addClass('s5');
    if (platform.isNexus7) $html.addClass('nexus7');
    // if(platform.isNote3) $html.addClass('note3');
    // if(platform.isSMT210) $html.addClass('smt210');

    if(platform.isTablet) $html.addClass('tablet');
    if(platform.isiPad) $html.addClass('ipad');

    if(platform.hasTouch) $html.addClass('has-touch');
    if(!platform.hasTouch) $html.addClass('no-touch');

    if(platform.isIE) $html.addClass('ie');
}

UT_CM.pictureLoad = function(){
   $(".preload").each(function() {
        var $this = $(this);
        var clickID = $this.data("utclickid");
        var src = $this.data("source");

        if($this.hasClass("use1x")){
            src = src.replace("002x","");
        }

        if($this.hasClass("useMobile")){
            src = src.replace(".","Mobile.");
        }
        var img = $("<img>").attr({
            src: src,
            alt: '',
            'data-utclickid': clickID
        });
        $this.append(img);

        /*if(platform.isIE8 && !$this.hasClass('unFilter')){
            var wrapper = $("<div>").addClass("picture-holder").css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + src + ',sizingMethod="scale");BACKGROUND: none transparent scroll repeat 0% 0%');
            if(clickID) wrapper.attr("data-utclickid", clickID);

            img.wrap(wrapper).addClass('ie8_hidden');
        }*/
    });
}

UT_CM.registerEvent = function(){
    if(platform.isDesktop){
        $('.btn-container').on('mouseenter', function(){
            var normal = $(this).find('.normal');
            TweenMax.to(normal, 0.2, {
                autoAlpha: 0
            });
            
        });

        $('.btn-container').on('mouseleave', function(e){
            var normal = $(this).find('.normal');
            TweenMax.to(normal, 0.2, {
                autoAlpha: 1
            });
        });
    }


    $(UT_CM.trackingList).each(function(index, el) {
        if (el[2]) {
            $(el[2]).on('click', function() {
                undertone.creative.redirectTo(el[1],el[0]);
                return false;
            });
        }
    });

    $('.wrapper-container').on("click", function(e) {
        //ignore self id
        if ($.inArray(e.target.id, UT_CM.ignoreIDArray) != -1) {
            return;
        }

        //ignore parents
        if ($(e.target).parents(UT_CM.ignoreWraps).length > 0) {
            return;
        }

        if ($(e.target).parents('.utvp_controls').length > 0) {
            // alert(0)
            return;
        }
        if ($(e.target).parents('.placeholder').length > 0) {
            return;
        }
        if ($(e.target).hasClass('placeholder')) {
            return;
        }
        if ($(e.target).parents(UT_CM.ignoreWraps).length > 0) {
            return;
        }
        if (!$(e.target).data("utclickid")) {
            if ($body.hasClass("opened")) {
                undertone.creative.redirectTo(UT_CM.trackingList[1][1],UT_CM.trackingList[1][0]);
            } else {
                undertone.creative.redirectTo(UT_CM.trackingList[0][1],UT_CM.trackingList[0][0]);
            }
            return false;
        }
    });
}

UT_CM.fixAdChoices = function(){
    //
    UT_CM.$ad_choices.appendTo($('.wrapper-1280'));
}

/*  UT_CM end  */



