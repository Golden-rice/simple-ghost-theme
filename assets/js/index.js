/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    // nav show/hide
    var screenWidth = document.body.clientWidth;
    if(screenWidth > 900){
        var $nav = $(".nav"),
            prescroll = 0,
            scroll = $document.scrollTop();

        $(window).scroll(function(){
            var curScroll = $document.scrollTop();
            // console.log('curscroll:'+curScroll+',prescroll:'+prescroll);
            if(curScroll < prescroll && prescroll != 0){
                $nav.removeClass('hide-nav');
            }else if(curScroll > prescroll){
                $nav.addClass('hide-nav');
            }else if(curScroll == 0){
                $nav.removeClass('hide-nav');
            }
            prescroll = curScroll;
        })
    }

    //  生成目录
    var $post = $(".post-content"),
        $targetHead = $(".post-content h2,.post-content h3,.post-content h4,.post-content h5,.post-content h6"),
        $category = $("#category");

    if($post.length > 0){
        console.log('make category');
        $targetHead.each(function(i, item){
            var tag = $(item).get(0).localName;
            $(item).attr("id","wow"+i);
            $category.append('<li class="cat-li"><a class="new'+tag+'" href="#wow'+i+'" >'+$(this).text()+'</a></li>');
        });
        $(".newh2").css("margin-left",0);
        $(".newh3").css("margin-left",10);
        $(".newh4").css("margin-left",20);
        $(".newh5").css("margin-left",30);
        $(".newh6").css("margin-left",40);

        $('.cat-li').on('click', function(e){
            $(this).addClass('cat-li-active').siblings().removeClass('cat-li-active');
        })
    }
  

    // category fixed
    var screenWidth = document.body.clientWidth;
    if(screenWidth > 900){
        var category = $('.category-warp'),
            categoryTop = category.offset().top;

        // 初始
        if( $document.scrollTop() + 40 >categoryTop ){
            category.addClass('category-fixed');
        }
        $(window).scroll(function(){
            var curScroll = $document.scrollTop();
            if(curScroll + 40 >categoryTop){
                category.addClass('category-fixed');
            }else{
                category.removeClass('category-fixed');
            }
            // console.log(categoryTop);
        })
    }

    // post img decoration
    var $img = $('.post-content img');
    if($img.length >0){
        $img.wrap('<div class="img-wrap"></div>')
    }

    // 生成二维码
    $('#qrcode').qrcode({width: 128,height: 128,text: window.location.href});


})(jQuery);
