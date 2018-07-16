$(function() {
    /* move slider to input:checked position */
    slider_move_to($(':checked', '.slider').parents('li'));

    /* click handler */
    $('label', '.slider ul').click(function(){
        if ($(this).parents('li').hasClass('disabled'))
            return false;
            
        $('#' + $(this).attr('for')).click();
        
        slider_move_to($(this).parents('li'));   
        
        return false;
    });
    
    
    /* drag handler */
    var $range = $('.slider');
    var $ball  = $('.ball', '.slider');
    var $lis   = $('li', '.slider');
    var lisizes = [];
    
    var documentMousemove = function(e){
        var x = e.clientX - $range.offset().left + document.documentElement.scrollLeft - 1.5*EM;
        var max = $range.width() - $ball.width();
        if (x > max)
            x = max;
        if (x < 0)
            x = 0;
            
        $ball.css({
            left: x + 'px'
        });
        

        if (!$.browser.msie || $.browser.version > 7) // slow in IE6 & IE7
            for (var i = 0; i < lisizes.length; i++) {
                var $li = $lis.eq(i);
                if (x >= lisizes[i].left && x <= lisizes[i].right) {
                    if (!$li.hasClass('disabled'))
                        $li.addClass('hovered');
                } else {
                    $li.removeClass('hovered');
                }
            }
        
        return stopEvent(e);
    };
        
    var documentMouseup = function(e){
        $(document)
            .unbind('mousemove', documentMousemove)
            .unbind('mouseup', documentMouseup);
        
        $('.hovered', '.slider').removeClass('hovered');
            
        var x = e.clientX - $range.offset().left + document.documentElement.scrollLeft - 1.5*EM;
        var max = $range.width() - $ball.width();
        if (x > max)
            x = max;
        if (x < 0)
            x = 0;
    
        var moving = false;
        var e = 0;
        for (var i = 0; i < lisizes.length; i++) {
            var $li = $lis.eq(i);
            if (!$li.hasClass('disabled')) {
                e = i; 
            }
            if (x >= lisizes[i].left && x <= lisizes[i].right) {
                if (!$li.hasClass('disabled')) {
                    moving = true;
                    slider_move_to($('li', '.slider').eq(i));
                }
                break;
            }
        }

        if (!moving) {
            if (i > e) {
                slider_move_to($lis.eq(e));
            } else {
                slider_move_to($lis.not('.disabled').eq(0));
            }
        }                        
            
        return stopEvent(e);
    };
        
    $ball.mousedown(function(e){
        $lis.each(function(){
            lisizes[$lis.index(this)] = {
                left:  $(this).position().left - 2.5*EM,
                right: $(this).position().left + $(this).width() - 2.5*EM
            }
        });
    
        $(document)
            .mouseup(documentMouseup)
            .mousemove(documentMousemove);
        return stopEvent(e);
    });
});

/* move marker */
function slider_move_to($li)
{
    $('.ball', '.slider').animate({
        left: ($('.slider li').index($li) * 5) + 'em'  /* 5ems is li width */  
    }, 250);    
}

/* event helper */
function stopEvent(e)
{
    if (e.preventDefault) {
    	e.preventDefault();
    	e.stopPropagation();
    } else {
    	e.returnValue = false;
    	e.cancelBubble = true;
    }
    return false;
}