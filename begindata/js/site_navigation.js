function validate_whois( frmname ) {
    var submitOK = true;

    frm = document.getElementById( frmname );

    if (frm.dname.value.length == 0) {
        submitOK = false;
    } else if (frmname == 'whois_dom_top' && frm.dname.value == 'Whois') {
	submitOK = false;
    }

    if (submitOK) {
	var el = document.getElementById( 'progress' );
	el.style.display = 'block';
    }

    return submitOK;
}

$(document).ready(function(){
//переменные для topline
    var $header_top = $('#header_top'),
	$tl_submenu = $('.submenu_wrap', $header_top),
	$whois = $('#whois_dom_top'),
	animated_tl = false,
	delay_tl = false,
	$last_dropdown,
	set_delay_for_open,
	set_delay_for_search,
	$contacts_tl_menu = $('#contacts_tl_menu'),
	max_width = 0;
	
//ровнение ширины колонок в подменю контактов в topline
    $('div.country_column', $contacts_tl_menu).each(function(){
	$contacts_tl_menu.css({
	    visibility: 'hidden',
	    display: 'block'
	})
	max_width = ($(this).width() > max_width) ? $(this).width() : max_width;
    }).width(max_width);
    $contacts_tl_menu.removeAttr('style')

//распределение ширины между блоками проектов в topline
    $('li','#project_tl_menu').each(function(i){
	if( (i+2)%3 == 0) $(this).addClass('center')
    });

//анимация подменю в topline
    $('.show_submenu', $header_top).bind('mouseout', function(){
	if (typeof set_delay_for_open != 'undefined') 
	    clearTimeout(set_delay_for_open);
    })

    $('.show_submenu', $header_top).bind('mouseover', function(){
	if ($(this).hasClass('.no_submenu')) return false;

	var $this = $(this);
	var $submenu = $('#' + $this.attr('id').replace('show_',''));
	var $submenu_title = $submenu.children('div.submenu_title_wrap');

	if ($submenu.is(':visible')) return false;

	set_delay_for_open = setTimeout(function(){
	    $tl_submenu.hide(2);
	    
	    $submenu.css({
		top: $this.parent().position().top + 25, //высота активного пункта меню
		left: $this.parent().position().left
	    })

	    if ($this.attr('id') == 'show_project_tl_menu') {
		$submenu_title.css({
		    marginLeft: $this.parent().position().left + 7
		});			
		$submenu.css({
		    width: $this.parents('div.content-block').eq(0).width() + 14
		});	
	    }
						    
				    
	    $submenu.fadeIn(50, function(){
		var info_timeout;
		$submenu_title.add($submenu).unbind().bind('mouseout', function(e){
		    if (typeof info_timeout != 'undefined') 
			clearTimeout(info_timeout);
		    var $target = e.relatedTarget,
			$ignore = $submenu.find('*').andSelf();
		    if ($.inArray($target, $ignore) < 0) {
			info_timeout = setTimeout(function(){
			    $submenu.hide(2);
			}, 150)
		    }
		})
	    });	
	
	}, 100)
    })

	
//Whois в topline
    $('input:text', $whois).blur(function(){
	if ($(this).val() == '') {
	    $(this).val('Whois');
	    $whois.removeClass('active');
	}
    })
    $('input:text', $whois).focus(function(){
	if ($(this).val() == 'Whois') {
	    $(this).val('');
	    $whois.addClass('active');
	}
    })

//target blank
    $("a[rel*=blank]").click(function(){
	window.open(this.href);
	return false;
    });
	

});

