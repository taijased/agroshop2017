var fix_interval = null;
var thin_threshold = 0;
var verythin_threshold = 0;
var widefont = false;
var EM = 12;

$(function(){
	fix_fontsize_init('12px/12px Tahoma, "DejaVu Sans", Geneva, sans-serif', 12);
    check_fontname();
});

function fix_fontsize_init(font, expectedSize)
{
    if (typeof font == 'undefined' || font == '')
        font = 'normal 16px/16px Arial, sans-serif';
    if (typeof expectedSize == 'undefined' || expectedSize == 0)
        expectedSize = 16;

    $fix = $('body');
    $fix.append('<div id="__fontsize_tester__">A</div>');

    var $tester = $('#__fontsize_tester__');
    var $topmenu = $('#header_top .submenu div').eq(0);

    $tester.css({
        font:        font,
        position:   'absolute',
        left:       '-999em'
    });

    _fix_fontsize(expectedSize, $fix, $tester, $topmenu);

    fix_interval = setInterval(function(){
        _fix_fontsize(expectedSize, $fix, $tester, $topmenu);
    }, 1000);

}

function _fix_fontsize(expectedSize, $fix, $tester, $topmenu)
{

    if (!$.browser.opera && !$.browser.safari && !$.browser.msie) {
        var size = Math.round(expectedSize * expectedSize / $tester.height());
        $fix.css({ fontSize: size + 'px' });
    }
    
    EM = $tester.height();

    /* это теперь выполн€етс€ сменой класса body на thin/verythin
    
    if ($topmenu.height() > Math.ceil($tester.height() * 1.58333))
        $('#header_top .submenu div').css({ paddingRight: '2.5em', paddingLeft: '1em'});
    else
        $('#header_top .submenu div').css({ paddingRight: '4.66em', paddingLeft: '1.66em' });*/
}

function check_fontname()
{
    var testsize = '4em';
    var tstr = 'абвгдеЄжзийклмнопрстуфхцчшщъыьэ€ю';

    $('body').append('<div id="__fonttable_tester__"></div>');
    var $tester = $('#__fonttable_tester__');

    $tester.css({
        position: 'absolute',
        top: 0,
        left: '-9999em',
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: testsize,
        lineHeight: testsize,
        letterSpacing: 'normal',
        fontWeight: 'normal',
        fontStyle: 'normal',
        height: testsize
    });

    $tester.text(tstr);

    var koeff = $tester.width() / tstr.length / $tester.height();

    $tester.remove();

    if ( koeff >= 0.15 ) {
       widefont = true;
       if ($('#header_top #lang').hasClass('ru')) { // name -> class. name - невалидно 
	       $('body').addClass('widefont');
	       $('.support-ru').attr('src', 'i/widefont-support-ru.jpg');  
	       $('.support-en').attr('src', 'i/widefont-support-en.jpg');
	       $('.nitik-book-ru').attr('src', 'i/widefont-nitik-book-ru.jpg');  
	       $('.nitik-book-en').attr('src', 'i/widefont-nitik-book-en.jpg');
	    }
	}
}

/* новый код */
$(function(){
    if ($.browser.msie && $.browser.version < 7)
        return;

    setTimeout(function(){
        $('body').append('<div id="__emtester__"></div>');
        $('#__emtester__').css({width: widefont? '83em' : '79em'});
        thin_threshold = $('#__emtester__').width();
        $('#__emtester__').css({width: widefont? '78em' : '73em'});
        verythin_threshold = $('#__emtester__').width(); 
        $('#__emtester__').remove();
        
        $('#wrapper, .content-block').css({
            minWidth: $.browser.safari? '75em' : widefont? '65em' : '60em'
        });
    
        thincheck();
        $(window).resize(function(){
            thincheck();
        });
    }, 100);
});

function thincheck()
{
    var size = $('.content-block').eq(0).width();
    if (size >= thin_threshold) {
        $('body').removeClass('thin').removeClass('verythin');
    } else if (size >= verythin_threshold) {
        $('body').addClass('thin').removeClass('verythin');
    } else {
        $('body').addClass('verythin').removeClass('thin');
    }
}