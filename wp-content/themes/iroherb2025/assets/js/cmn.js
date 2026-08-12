jQuery(function ($) {


    $('body').removeClass('-nofouc');

    scrollToTop();
    menuCtrl();
    spFtMenuCtrl();
    mainHeaderCtrl();
    taglistCtrl();
    fadeInUp();
    // backToList();
    selectEvent();
    anchorLink();
    // adjustFormClass();
    disabledLink();

    flowCtrl();

    // test();

    // function test() {
    //     let test = [];
    //     test[0] = [1, 2, 3];
    //     test[1] = [10, 12, 13];
    //     console.log(test[0],test[1]);

    // }
    // mvScroll();

    /*---------------------------------------------------------------------------
     * 郵便番号にハイフンを自動で追加
     *---------------------------------------------------------------------------*/
    function insertStr(input){
        return input.slice(0, 3) + '-' + input.slice(3,input.length);
    }
    autoHyphen();
    function autoHyphen(input) {
        $("#postcode").on('keyup',function(e){
            var input = $(this).val();

            var key = e.keyCode || e.charCode;
            if( key == 8 || key == 46 ){
              return false;
            }

            if (input.length === 3) {
              $(this).val(insertStr(input));
            }
          });

          $("#postcode").on('blur',function(e){
            var input = $(this).val();
            if(input.length >= 3 && input.substr(3,1) !== '-'){
              $(this).val(insertStr(input));
            }
          });
    }

    /*---------------------------------------------------------------------------
     * 右サイドリンクボタン
     *---------------------------------------------------------------------------*/
    linkBtnsCtrl()
    function linkBtnsCtrl(){
        $(window).on("load scroll resize orientationchange",function() {
            // let adjust = $('#scrollTopBtn').innerHeight();
            let adjust;
            let border = $('.main-footer').offset().top;
            let wW = $(window).innerWidth();
            let wH = $(window).height();
            let scpos = $(window).scrollTop() + wH ;
            let apperBorder = wH+100;

            if (wW > 768 ){
                adjust = 20;
            }else{
                adjust = 10;
            }

            // console.log(scpos,wH,border+adjust);
            // console.log(scpos,adjust,border);

            if (scpos > apperBorder) {
                $('.contact-linkbtn.-home').removeClass('-init');

                // if (scpos >= border + adjust) {
                //     $('.contact-linkbtn').addClass('-stop');
                // } else {
                //     $('.contact-linkbtn').removeClass('-stop');
                // }

            } else {
                $('.contact-linkbtn.-home').addClass('-init');
            }
        });

        $('#scrollTopBtn').click(function(e){
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 },500,'swing');
        });
    }




    /*---------------------------------------------------------------------------
     * メインビジュアル
     *---------------------------------------------------------------------------*/
    function mvScroll() {
        $(window).on("load scroll orientationchange", function () {
            // let ww = $(".homelead").innerWidth();
            // if (ww > 768) {
            let scpos = $(window).scrollTop();
            let hh = $(".homelead").innerHeight();
            let hop = scpos / hh * 1.5;
            // console.log(hh, scpos);
            $(".homelead").css('opacity', hop);
            if (hop >= 1.5) {
                $(".main-visual").addClass('-move');
            } else {
                $(".main-visual").removeClass('-move');
            }
            // } else {
            //     $(".main-visual").addClass('-move');
            // }
        });
    }

    /*---------------------------------------------------------------------------
     * リンク無効
     *---------------------------------------------------------------------------*/
    function disabledLink() {
        $("body").on('click', '.-disabled,.-disabled a, ._disabled02', function (e) {
            e.preventDefault();
        });
    }



    /*---------------------------------------------------------------------------
     * ページトップへ
     *---------------------------------------------------------------------------*/

    // function scrollToTop() {


    //     $('#scrollTopBtn').click(function (e) {
    //         e.preventDefault();
    //         $('html, body').animate({ scrollTop: 0 }, 500, 'swing');
    //     });
    // }


    function scrollToTop(){
        $(window).on("load scroll resize orientationchange",function() {
            // let adjust = $('#scrollTopBtn').innerHeight();
            let adjust;
            let border = $('.main-footer').offset().top;
            let wW = $(window).innerWidth();
            let wH = $(window).height();
            let scpos = $(window).scrollTop() + wH ;
            let apperBorder = wH+100;

            if (wW > 768 ){
                adjust = 20;
            }else{
                adjust = 10;
            }

            // console.log(scpos,wH,border+adjust);
            // console.log(scpos,adjust,border);

            if (scpos > apperBorder) {
                $('#popupFtBnr').removeClass('-init');
                $('#scrollTopBtn').removeClass('-init');
            } else {
                $('#popupFtBnr').addClass('-init');
                $('#scrollTopBtn').addClass('-init');
            }
        });

        $('#scrollTopBtn').click(function(e){
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 },500,'swing');
        });

        //
        $('#popupFtBnrClose').click(function(e){
            e.preventDefault();
            $('#popupFtBnr').hide();
        })
    }





    /*---------------------------------------------------------------------------
     * ハンバーガーメニュー
     *---------------------------------------------------------------------------*/

    function menuCtrl() {
        // $(window).on("load", function () {
        //     console.log($("#menuArea").length);
        //     console.log('test');
        // });
        // let w;
        // $(window).on("load scroll resize orientationchange", function () {
        //     w = $(window).width();
        //     if (w >= 940) {
        //         if ($("#menubtn").prop('checked') == true) {
        //             $("#menubtn").attr('checked', false).trigger('click');
        //             $("html,body").removeAttr("style");
        //         }
        //     }
        // });

        $("#menubtn").prop('checked', false);

        if ($("#menuArea").length == 0) {
            $("body").append('<div id="menuArea" class="menu-area"><div class="menubg" id="menuBg"></div><div class="menucover"></div></div>');
        }

        $('body').on('transitionend webkitTransitionEnd', "#menuArea.-wait", function () {
            $("#menuArea").removeClass('-enlarge');
            $("#menuArea .opend-menu").remove();
            $("#menuArea").removeClass('-wait');
        });

        $("#menubtn").change(function () {
            if ($(this).prop('checked') == true) {
                // console.log($(".-sitemapbtn .-snsicons").html());
                if ($("#menuArea").length != 0) {
                    $("#menuArea").addClass('-enlarge');
                    $("#menuArea").addClass('-open');
                    $(".main-header").addClass('-menuopen');
                    $("#menuArea .menucover").html('<nav class="hamburger-menu">' + $('.hamburger-menu').html() + '</nav>');
                }
            } else {
                if ($("#menuArea").length != 0) {
                    $("#menuArea").addClass('-wait');
                    $("#menuArea").removeClass('-open');
                    $(".main-header").removeClass('-menuopen');
                    // $("html,body").removeAttr("style");
                }
            }
        });

        $("body").on('click', "#menuBg", function (e) {
            $("#menubtn").prop('checked', false).trigger('change');
            // alert('test');
        });

        $("body").on('click', "#menuArea .-haschild", function (e) {
            w = $(window).width();
            if (w <= 768) {
                e.preventDefault();
                let target = $(this).next();
                if ($(this).hasClass('-open')) {
                    $(this).removeClass('-open');
                    target.slideUp();
                } else {
                    $(this).addClass('-open');
                    target.slideDown();
                }
            }
        });
    }


    /*---------------------------------------------------------------------------
     * メインヘッダー footerのspメニュー便乗
     *---------------------------------------------------------------------------*/
    function mainHeaderCtrl() {

        $(window).on("load scroll resize orientationchange", function () {
            let scpos = $(window).scrollTop();
            let ww = $(window).innerWidth();
            let adjust = 130;
            let border = $("#mainVisual").innerHeight() - adjust;
            let ftsp_border = 80;
            if (border < 120) {
                border = 120;
            }

            // console.log(border);


            // console.log(scpos,border);
            if (scpos > border) {
                if ($(".main-header").hasClass('-init')) {
                    $(".main-header").removeClass('-init');
                    $(".menu-ul").removeClass('-init');
                }
            } else {
                if (!$(".main-header").hasClass('-init')) {
                    $(".main-header").addClass('-init');
                    $(".menu-ul").addClass('-init');
                }
            }
            if (scpos > ftsp_border) {
                $(".footer-spmenu").removeClass('-init');
            } else {
                $(".footer-spmenu").addClass('-init');
            }
        });

    }

    /*---------------------------------------------------------------------------
     * スマホフッターメニュー
     *---------------------------------------------------------------------------*/
    function spFtMenuCtrl() {
        $("#ftSpSubTrig").click(function (e) {
            e.preventDefault();
            const subMenu = $("#ftSpSub");
            if (subMenu.hasClass('-opensub')) {
                subMenu.removeClass('-opensub');
            } else {
                subMenu.addClass('-opensub');
            }

        });
    }


    /*---------------------------------------------------------------------------
     * グロナビ
     *---------------------------------------------------------------------------*/
    // function mainHeaderCtrl(winSCT){

    //     if ( $(".container-block").hasClass('-home')){
    //         const mainHeader = $(".main-header.-home");

    //         mainHeader.mouseenter(function(){
    //             mainHeader.addClass('-mon');
    //         }).mouseleave(function(){
    //             mainHeader.removeClass('-mon');
    //         });
    //     }

    //     $(window).on("load scroll resize orientationchange",function() {
    //         let scpos = $(window).scrollTop() ;
    //         const border = 150;
    //         if ( scpos >= border){
    //             $(".container-block").addClass('-menufixed');
    //         }else{
    //             $(".container-block").removeClass('-menufixed');
    //         }
    //     });

    // }

    /*---------------------------------------------------------------------------
     * タグリストmodal
     *---------------------------------------------------------------------------*/

    function taglistCtrl() {
        $('._openmodal').click(function (e) {
            e.preventDefault();
            let target = $(this).data('target');
            const parentsNode = $(this).parents('.contents-block');
            // parentsNode.css('zIndex',9000);
            $(target).addClass('-active');
            $(target).find('.modalcover').removeClass('-close').addClass('-active');
            $(target).find('.inner').removeClass('-close').addClass('-active');
        });
        $('._closemodal').click(function (e) {
            e.preventDefault();
            let target = $(this).parents('.modal-window');
            const parentsNode = $(this).parents('.contents-block');
            $(target).delay(500).queue(function () {
                $(target).removeClass('-active');
                $(target).stop();
                // parentsNode.css('zIndex',20);
            });
            $(target).find('.modalcover').removeClass('-active').addClass('-close');
            $(target).find('.inner').removeClass('-active').addClass('-close');
        });

        $("._stopPropagation").click(function (e) {
            e.stopPropagation();
        });
    }


    /*---------------------------------------------------------------------------
     * FadeInUp
     *---------------------------------------------------------------------------*/

    function fadeInUp() {
        let scpos = $(window).scrollTop() + $(window).height();
        fadeInUpAct(scpos);
        $(window).on("scroll resize orientationchange", function () {
            scpos = $(window).scrollTop() + $(window).height() - 50;
            fadeInUpAct(scpos);
        });
    }
    function fadeInUpAct(scpos) {
        // console.log(scpos);
        $("._fadeiu,._fadeir,._fadeil,._fadeio,._fadeblur,._fadeblurGroup,._round").each(function () {
            if ($(this).offset().top < scpos) {
                $(this).addClass('-active');
            } else {
                $(this).removeClass('-active');
            }
        });
        // $("._fadeir").each(function(){
        //     if ( $(this).offset().top  < scpos){
        //         $(this).addClass('-active');
        //     }else{
        //         // $(this).removeClass('-active');
        //     }
        // });

    }


    /*---------------------------------------------------------------------------
     * リストに戻る
     *---------------------------------------------------------------------------*/
    function backToList() {
        $(".backlink:not(.-through)").click(function (e) {
            e.preventDefault();
            history.back();
        });

    }


    /*---------------------------------------------------------------------------
     * イベント選択
     *---------------------------------------------------------------------------*/
    function selectEvent() {
        $("#evenList").change(function () {
            const event_id = $(this).val();
            $('<form/>', { action: '/eventform/', method: 'get' })
                .append($('<input/>', { type: 'hidden', name: 'ev', value: event_id }))
                .appendTo(document.body)
                .submit();
        });
    }

    /*---------------------------------------------------------------------------
     * アンカーリンク
     *---------------------------------------------------------------------------*/
    function anchorLink() {
        $("body").on('click','._anchor',function (e) {
            e.preventDefault();
            if ($(this).hasClass('-disabled')) {
                return false;
            }
            const target = $(this).attr('href');
            // let adjust = $(".main-header").innerHeight();
            let adjust = 100;
            const distination = $(target).offset().top - adjust;

            $('html, body').animate({ scrollTop: distination }, 500, 'swing');
        });
    }

    /*---------------------------------------------------------------------------
     * アンカーリンク
     *---------------------------------------------------------------------------*/
    function flowCtrl() {
        $(".flowttl").click(function () {
            if ($(this).hasClass('-open')) {
                $(this).removeClass('-open');
                $(this).parent().find('.secinner').slideUp();
            } else {
                $(this).addClass('-open');
                $(this).parent().find('.secinner').slideDown();
            }
        });
    }


    /*---------------------------------------------------------------------------
     * フッターメニュー開閉
     *---------------------------------------------------------------------------*/
    // ftMenuCtrl();
    function ftMenuCtrl() {
        let ww;
        $(window).on("load scroll orientationchange", function () {
            ww = $(window).width();
        });
        $(".fnv-dl .dt .-hascate").click(function (e) {
            if (ww <= 768) {
                e.preventDefault();
                let target = '.-' + $(this).data('taxo');
                console.log(target);
                if ($(this).hasClass('-active')) {
                    $(this).removeClass('-active');
                    $(this).parents('.fnv-dl').find(target).slideUp();
                } else {
                    $(this).addClass('-active');
                    $(this).parents('.fnv-dl').find(target).slideDown();
                    // $(this).parent().find('.secinner').slideDown();
                }
            }
        });

    }

    /*---------------------------------------------------------------------------
     * ハンバーガーメニュー
     *---------------------------------------------------------------------------*/
    hbMenuCtrl();
    function hbMenuCtrl() {
        let ww;
        $(window).on("load scroll orientationchange", function () {
            ww = $(window).width();
        });
        $('body').on('click', ".hamburger-menu .-hascate", function (e) {
            e.preventDefault();
            // let target = $(this).parent().find('.submenu');
            let target = $(this).next('.submenu');
            console.log(target.html());
            if ($(this).hasClass('-active')) {
                $(this).removeClass('-active');
                target.slideUp();
            } else {
                $(this).addClass('-active');
                target.slideDown();
                // $(this).parent().find('.secinner').slideDown();
            }
        });
    }


    /*---------------------------------------------------------------------------
     * もっと見るボタン
     *---------------------------------------------------------------------------*/
    readMoreCtrl();
    function readMoreCtrl() {
        // console.log('test00');
        // $(".readmore-btn a").click(function (e) {
        $('body').on('click', ".readmore-btn a", function (e) {
            e.preventDefault();
            console.log('test01');
            e.preventDefault();
            let target = $(this).attr("href");
            $(target).slideToggle();
        });
    }


    /*---------------------------------------------------------------------------
     * みんなが気になるキーワード
     *---------------------------------------------------------------------------*/
    // directSearch();
    function directSearch() {
        $('.-directsearch').click(function (ev) {
            ev.preventDefault();
            let kw = $(this).data("kw");
            let form = document.createElement('form');
            form.action = '/job/';
            form.method = 'POST';
            form.innerHTML = '<input type="hidden" name="searchword" value="'+kw+'">';
            document.body.append(form);
            form.submit();
        });
    }
    /*---------------------------------------------------------------------------
     * スマホフッター電話タップで２箇所表示
     *---------------------------------------------------------------------------*/
    spTelCtrl();
    function spTelCtrl() {
        $('#telLink').click(function (e) {
            e.preventDefault();
            let target = $(this).attr("href");
            if ($(this).hasClass('-active')) {
                $(this).removeClass('-active');
                $(target).addClass('-hide');
            } else {
                $(this).addClass('-active');
                $(target).removeClass('-hide');
            }
        });
    }


});