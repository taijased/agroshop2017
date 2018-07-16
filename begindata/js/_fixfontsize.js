var fix_interval = null;

$(function(){
    if (!$.browser.opera && !$.browser.safari && !$.browser.msie) {
        fixfontsize_init('normal 12px/12px Tahoma, DejaVu, Geneva, sans-serif', 12);
    }
});

function fixfontsize_init(font, expectedSize, $fix)
{
    if (typeof font == 'undefined' || font == '')
        font = 'normal 16px/16px Arial, sans-serif';
    if (typeof expectedSize == 'undefined' || expectedSize == 0)
        expectedSize = 16;
    if (typeof $fix == 'undefined' || !$fix.length)
        $fix = $('body');

    $fix.prepend('<div id="fontsize_tester">A</div>');
    var $tester = $('#fontsize_tester');
    
    var $topmenu = $('#header_top .submenu div').eq(0);
    
    $tester.css({
        font:        font,
        position:   'absolute',
        left:       '-999em'
    });
    
    _fixfontsize(expectedSize, $fix, $tester, $topmenu);
    fix_interval = setInterval(function(){
        _fixfontsize(expectedSize, $fix, $tester, $topmenu);
    }, 1000);
}

function _fixfontsize(expectedSize, $fix, $tester, $topmenu)
{
    var size = Math.round(expectedSize * expectedSize / $tester.height());
    $fix.css({
        fontSize: size + 'px'
    });
    
    //console.log($topmenu.height(), Math.ceil($tester.height() * 1.58333));
    if ($topmenu.height() > Math.ceil($tester.height() * 1.58333))
        $('#header_top .submenu div').css('padding-right', '2.5em');
    else
        $('#header_top .submenu div').css('padding-right', '4.66em');
    
    /*var newsize = $tester.height();
    if (newsize != size)
        fixdesign(newsize, expectedSize, $fix, $tester);*/
}

/*
function fixdesign(size, expectedSize, $fix, $tester)
{
    var sizes = {
        '12': {path: 'i/', font: 'normal 12px/12px Tahoma, DejaVu, Geneva, sans-serif'},
        '14': {path: 'i/14px', font: 'normal 14px/14px Tahoma, DejaVu, Geneva, sans-serif'},
        '16': {path: 'i/16px', font: 'normal 16px/16px Tahoma, DejaVu, Geneva, sans-serif'},
        '18': {path: 'i/18px', font: 'normal 18px/18px Tahoma, DejaVu, Geneva, sans-serif'},
        '20': {path: 'i/20px', font: 'normal 20px/20px Tahoma, DejaVu, Geneva, sans-serif'},
        '22': {path: 'i/22px', font: 'normal 22px/22px Tahoma, DejaVu, Geneva, sans-serif'},
        '24': {path: 'i/24px', font: 'normal 24px/24px Tahoma, DejaVu, Geneva, sans-serif'}
    };
    
    var newsize = 12;
    
    if (typeof sizes[size] != 'undefined') {
        newsize = size;
    } else if (size < 25) {
        for (var i in sizes)
            if (parseInt(i) >= size) {
                newsize = parseInt(i);
                break;
            }
    } else {
        newsize = 24;
    }
    
    console.log(newsize, size);
    if (newsize != size) {
        $tester.css({font: sizes[newsize].font});
        _fixfontsize(newsize, $fix, $tester);
        clearInterval(fix_interval);
        fix_interval = setInterval(function(){
            _fixfontsize(newsize, $fix, $tester);
        }, 1000);
        return;
    }
    
    var path = sizes[newsize].path;    

    var css = "#header_top .menu ul a {background-image: url('_SIZE_/header_top_menu-arrow.gif')} #header_top .menu .last {background-image: url('_SIZE_/header_top_menu-bottom.gif')} #header_top .menu {background-image: #585858 url('_SIZE_/header_top_menu-left.gif')} #header_top .submenu div {background-image: url('_SIZE_/header_top_menu-right.gif')} #header_top .menu ul {background-image: url('_SIZE_/header_top_menu-top.gif')} #header_top #lang a {background-image: url('_SIZE_/header-lang.gif')} #header-login {background-image: url('_SIZE_/header-login.png')} #header #logout h2 {background-image: url('_SIZE_/header-logout-l.gif')} #header #logout h2 a {background-image: url('_SIZE_/header-logout-r.gif')} #header-password {background-image: url('_SIZE_/header-password.png')} #header #personal .tip {background-image: url('_SIZE_/header-password-tip.png')} #header_top #print_lnk a {background-image: url('_SIZE_/header-print.gif')} #sidebar .block .bottom {background-image: url('_SIZE_/sidebar-block-bottom-l.png')} #sidebar .block .bottom span {background-image: url('_SIZE_/sidebar-block-bottom-r.png')} #sidebar .block h2 {background-image: url('_SIZE_/sidebar-block-top-l.png')} #sidebar .block h2 span {background-image: url('_SIZE_/sidebar-block-top-r.png')} #sidebar #consult .help {background-image: url('_SIZE_/sidebar-help.gif')} #sidebar #consult .icq-offline {background-image: url('_SIZE_/sidebar-icq-offline.gif')} #sidebar #consult .icq-online {background-image: url('_SIZE_/sidebar-icq-online.gif')} #sidebar #info li.active a {background-image: url('_SIZE_/sidebar-info-active.gif')} #sidebar #info .collapsed {background-image: url('_SIZE_/sidebar-info-collapsed.gif')} #sidebar #info .expanded {background-image: url('_SIZE_/sidebar-info-expanded.gif')} #sidebar #info .leaf {background-image: url('_SIZE_/sidebar-info-leaf.gif')} #sidebar #uslugi li.active {background-image: url('_SIZE_/sidebar-li-active.gif')} #sidebar #consult .webim {background-image: url('_SIZE_/sidebar-webim.gif')} #whois_dom_top {background-image: url('_SIZE_/whois_dom_top-bg.png')}".replace(/_SIZE_/g, path);


    if (!$('style#fixdesign').length)
        $('head').append('<style type="text/css" id="fixdesign"></stype>');
    $('style#fixdesign').text(css);

    $('#header-submit').attr('src', path+'/header-submit.png');
    $('.btn', '#subscription').attr('src', path+'/sidebar-subscribe-ok.png');
    $('img', '#uslugi').attr('src', path+'/sidebar-uslugi-new.gif');
    $('#dsubmit', '#whois_dom_top').attr('src', path+'/whois_dom_top-submit.gif');

}*/