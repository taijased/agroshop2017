$(function(){

    /*****
    new js    
    *****/

    /* header_top menu */
    $('.menu', '#header_top').hover(function(){
        if (!$('ul', this).is(":animated")) {
            $('ul', this).show(200);
        }
    }, function(){
        $('ul', this).hide(400);
    });
    
    /* header login form */
    $('#header-login', '#header').css({color: '#adadad'}).val('Логин').focus(function(){
        if ($(this).val() == 'Логин')
            $(this).val('').css({color: '#333'});;
    }).blur(function(){
        if ($(this).val() == '')
            $(this).val('Логин').css({color: '#adadad'});;
    });
    
    $('#header-password', '#header').val('').addClass('tip').focus(function(){
        if ($(this).val() == '')
            $(this).removeClass('tip');
    }).blur(function(){
        if ($(this).val() == '')
            $(this).addClass('tip');
    });
    

    // CLASSIC VARIANT
    /* header #regru-description scroller */
    var $description = $('#regru-description');
    var description_count = $('li', $description).length;
    $('.prev', $description).hide();
    $('.prev, .next', $description).css({visibility: 'visible'}).click(function(){
        var em = parseInt($('li', $description).eq(0).height()) / 1.33333;
        var diff = Math.round(1.33333 * em);
        var $original = $('ul', $description);
        var top = $original.position().top;
        
        if ($(this).is('.prev')) {
            $('.next', $description).show();
            top += diff;
            if (top >= 0) {
                $('.prev', $description).hide();
            } 
            if (top > 0) {
                //dont
                return false;
            }
        } else {
            $('.prev', $description).show();
            top -= diff;
            if (Math.abs(top) > em * (description_count - 2)) {
                $('.next', $description).hide();
            }
            if (Math.abs(top) > em * description_count) {
                //dont
                return false;
            }
        }
        
        $original.css({top: $original.position().top + 'px'}).animate({
            top: ''+top+'px'
        }, 150, function(){
            var fix_position = $original.position().top / em;
            $original.css({top: ''+fix_position+'em'}).removeClass('clone');
        });
        
        return false;
    });
    
    // ORIGINAL VARIANT
    /* header #regru-description scroller */
/*    var $description = $('#regru-description');
    var description_count = $('li', $description).length;
    $('.prev, .next', $description).css({visibility: 'visible'}).click(function(){
        var em = parseInt($('li', $description).eq(0).height());
        var diff = Math.round(3.083333 * em);
        var $original = $('ul', $description).not('.clone');
        var top = $original.position().top;
        
        if ($(this).is('.prev')) {
            top += diff;
            if (top > 0) {
                var clonetop = 0 - description_count;
                $original.clone().addClass('clone').insertBefore($original).css({
                    top: ''+clonetop+'em'
                });
                clonetop = clonetop * em + diff; 
            }
        } else {
            top -= diff;
            if (Math.abs(top) > em * description_count) {
                var clonetop = 3;
                $original.clone().addClass('clone').insertAfter($original).css({
                    top: ''+clonetop+'em'
                });
                clonetop = clonetop * em - diff;
            }
        }
        
        $original.css({top: $original.position().top + 'px'}).animate({
            top: ''+top+'px'
        }, 100, function(){
            var fix_position = Math.round($original.position().top / em) - 0.0833333;
            $original.css({top: ''+fix_position+'em'});
        });
        
        var $clone = $('ul.clone', $description);
        if ($clone.length) {
            $clone.css({top: $clone.position().top + 'px'}).animate({
                top: ''+clonetop+'px'
            }, 100, function(){
                var fix_position = Math.round($clone.position().top / em) - 0.0833333;
                $clone.css({top: ''+fix_position+'em'}).removeClass('clone');
                $original.remove();
            });
        }
    
        return false;
    });
*/

/* header #regru-description scroller */
/*    var $description = $('#regru-description');
    var description_count = $('li', $description).length;
    $('.prev', $description).css({opacity: 0});
    $('.prev, .next', $description).css({visibility: 'visible'}).click(function(){
        var em = parseInt($('li', $description).eq(0).height());
        var diff = Math.round(3.083333 * em);
        var $original = $('ul', $description).not('.clone');
        var top = $original.position().top;
        
        if ($(this).is('.prev')) {
            top += diff;
            if (top > 0) {
                var clonetop = 0 - description_count;
                $original.clone().addClass('clone').insertBefore($original).css({
                    top: ''+clonetop+'em'
                });
                clonetop = clonetop * em + diff; 
            }
        } else {
            top -= diff;
            if (Math.abs(top) > em * (description_count - 3)) {
                $('.prev', $description).css({opacity: 1});
            }
            if (Math.abs(top) > em * description_count) {
                var clonetop = 3;
                $original.clone().addClass('clone').insertAfter($original).css({
                    top: ''+clonetop+'em'
                });
                clonetop = clonetop * em - diff;
            }
        }
        
        $original.css({top: $original.position().top + 'px'}).animate({
            top: ''+top+'px'
        }, 100, function(){
            var fix_position = Math.round($original.position().top / em) - 0.0833333;
            $original.css({top: ''+fix_position+'em'});
        });
        
        var $clone = $('ul.clone', $description);
        if ($clone.length) {
            $clone.css({top: $clone.position().top + 'px'}).animate({
                top: ''+clonetop+'px'
            }, 100, function(){
                var fix_position = Math.round($clone.position().top / em) - 0.0833333;
                $clone.css({top: ''+fix_position+'em'}).removeClass('clone');
                $original.remove();
            });
        }
    
        return false;
    });*/
    
    /* sidebar uslugi - ie6 fix */
    if ($.browser.msie && $.browser.version < 7) {
        $('a', '#sidebar #uslugi').hover(function(){
            $('span', this).css({textDecoration: 'underline'});
        }, function(){
            $('span', this).css({textDecoration: 'none'});
        });
    }
    
    /* sidebar info menu */
    $('.collapsed .toggle, .expanded .toggle', '#sidebar').css({cursor: 'pointer'}).click(function(){
        var $li = $(this).parents('li');
        if ($li.hasClass('collapsed')) {
            $li.removeClass('collapsed').addClass('expanded');
            $('ul', $li).show();    
        } else {
            $li.removeClass('expanded').addClass('collapsed');
            $('ul', $li).hide();
        }
    });
    $('.collapsed .foo, .expanded .foo', '#sidebar').click(function(){
        $('.toggle', $(this).parents('li')).click();
        return false;
    });
    
    // fixing ie6 positioning bug
    if ($.browser.msie && $.browser.version < 7) {
        $(window).resize(function(){
            $('#wrapper-lb, #wrapper-rb').css({bottom: '1px'}).css({bottom: '0px'});
        });
    }
    
    /*******************
    old js, From Dima
    *******************/

    $('table tr td:last-child .item span').css('border', 'none');
    // unload
    $("#more_domens a").click(function() {
	$("#all_domens").css("display", "block");
	// $('#all_domens').show();
	// $("#pop_up_iframe").css("display","block");	
	$("iframe").css("display", "block");
	return false;
    });

    $("#all_domens #close a").click(function(){
	$("#all_domens").css("display", "none");
	// $('@all_domens').hide();
	return false;
    });

    $("#all_domens #top_close a").click(function(){
	$("#all_domens").css("display", "none");
	return false;
    });
	
    /* not used, old sidebar info menu

    //menu
    // item 1
    // $("ul#menu li.collapsed ul").css('display','none');
    $("ul#menu li#i1.collapsed a.plus").click(function(){
	if ($("ul#menu li#i1").attr("class") == 'collapsed') {
	    $("ul#menu li#i1").removeClass("collapsed");
	    $("ul#menu li#i1").addClass("collapsed-point");
	    $("ul#menu li#i1 ul").css('display', 'block');
	}
	else {
	    $("ul#menu li#i1").removeClass("collapsed-point");
	    $("ul#menu li#i1").addClass("collapsed");
	    $("ul#menu li#i1 ul").css('display', 'none');
	}
	return false;
    });

    $("ul#menu li#i1.collapsed-active a.plus").click(function(){
	if ($("ul#menu li#i1").attr("class") == 'collapsed-active') {
	    $("ul#menu li#i1").removeClass("collapsed-active");
	    $("ul#menu li#i1").addClass("collapsed-point_act");
	    $("ul#menu li#i1 ul").hide();
	}
	else {
	    $("ul#menu li#i1").removeClass("collapsed-point_act");
	    $("ul#menu li#i1").addClass("collapsed-active");
	    $("ul#menu li#i1 ul").show();
	}
	return false;
    });
	
    //item 2
    $("ul#menu li#i2.collapsed a.plus").click(function(){
	if ($("ul#menu li#i2").attr("class") == 'collapsed') {
	    $("ul#menu li#i2").removeClass("collapsed");
	    $("ul#menu li#i2").addClass("collapsed-point");
	    $("ul#menu li#i2 ul").show();
	}
	else {
	    $("ul#menu li#i2").removeClass("collapsed-point");
	    $("ul#menu li#i2").addClass("collapsed");
	    $("ul#menu li#i2 ul").hide();
	}
	return false;
    });
	
    $("ul#menu li#i2.collapsed-active a.plus").click(function(){
	if ($("ul#menu li#i2").attr("class") == 'collapsed-active') {
	    $("ul#menu li#i2").removeClass("collapsed-active");
	    $("ul#menu li#i2").addClass("collapsed-point_act");
	    $("ul#menu li#i2 ul").hide();
	}
	else {
	    $("ul#menu li#i2").removeClass("collapsed-point_act");
	    $("ul#menu li#i2").addClass("collapsed-active");
	    $("ul#menu li#i2 ul").show();
	}
	return false;
    });
	
    $("ul#menu li#i3.collapsed a.plus").click(function(){
	    if ($("ul#menu li#i3").attr("class") == 'collapsed') {
		    $("ul#menu li#i3").removeClass("collapsed");
		    $("ul#menu li#i3").addClass("collapsed-point");
		    $("ul#menu li#i3 ul").show();
	    }
	    else {
		    $("ul#menu li#i3").removeClass("collapsed-point");
		    $("ul#menu li#i3").addClass("collapsed");
		    $("ul#menu li#i3 ul").hide();
	    }
	    return false;
    });
    
    $("ul#menu li#i3.collapsed-active a.plus").click(function(){
	    if ($("ul#menu li#i3").attr("class") == 'collapsed-active') {
		    $("ul#menu li#i3").removeClass("collapsed-active");
		    $("ul#menu li#i3").addClass("collapsed-point_act");
		    $("ul#menu li#i3 ul").hide();
	    }
	    else {
		    $("ul#menu li#i3").removeClass("collapsed-point_act");
		    $("ul#menu li#i3").addClass("collapsed-active");
		    $("ul#menu li#i3 ul").show();
	    }
	    return false;
    });
    
    //item 3
    /* -- */
    $("#pp_wm_child").hide();

    $("#org_wm_child").hide();

    $("#pp_wm a").click(function(){
	    now = $("#pp_wm_child").css("display");
	    if (now == "block") {
	       $("#pp_wm_child").css("display", "none");
	    } else {
	       $("#pp_wm_child").css("display", "block");
	    }
    });
    $("#org_wm a").click(function(){
	    now = $("#org_wm_child").css("display");
	    if (now == "block") {
	       $("#org_wm_child").css("display", "none");
	    } else {
	       $("#org_wm_child").css("display", "block");
	    }
    });
    
    
    //partners
    $("table.sales tr.more_p").hide();
    $("table.sales tr.less_p").show();
    $("#content #partners table.sales td.links a#table_close_link").hide();
    $("#partners table.sales tr:first td:last div").append("<div style='position:absolute;right:-1px;top:-19px;'><a href='javascript://' id='table_close_link'><img src='/i/style/first/pop_up_top_close.gif'></a></test>");
    $("table.sales tr:first td:last div div").hide();
    
    //show close
    $(".zones .more_zones a").click(function(){
	    $("table.sales tr.more_p").show();
	    $("table.sales tr.less_p").hide();
	    $("#content #partners table.sales td.links a#table_close_link").show();
	    $("table.sales tr:first td:last div div").show();
    });
    $(".zones .full_table a").click(function(){
	    $("table.sales tr.more_p").show();
	    $("table.sales tr.less_p").hide();
	    $("#content #partners table.sales td.links a#table_close_link").show();
	    $("table.sales tr:first td:last div div").show();
    });
    
    //hide close
    $("#content #partners table.sales td.links a#table_close_link").click(function(){
	    $("table.sales tr.more_p").hide();
	    $("table.sales tr.less_p").show();
	    $("#content #partners table.sales td.links a#table_close_link").hide();
	    $("table.sales tr:first td:last div div").hide();
    });
    $("#content #partners table.sales a#table_close_link").click(function(){
	    $("table.sales tr.more_p").hide();
	    $("table.sales tr.less_p").show();
	    $("#content #partners table.sales td.links a#table_close_link").hide();
	    $("table.sales tr:first td:last div div").hide();
    });
    
    /* clients */
    $("table.sales tr.more_p").hide();
    $("#clients table.sales tr:first td:last div").append("<div style='position:absolute;right:-1px;top:-25px;'><a href='javascript://' id='table_close_link'><img src='/i/style/first/pop_up_top_close.gif'></a></test>");
    $("table.sales tr:first td:last div div").hide();
    
    $(".zones #client_table_o").click(function(){
	    $("table.sales tr.more_p").show();
	    $("#clients table.sales tr:first td:last div div").show();
    });
    
    $("#content #clients table.sales a#table_close_link").click(function(){
	    $("table.sales tr.more_p").hide();
	    $("table.sales tr.less_p").show();
	    $("#content #partners table.sales td.links a#table_close_link").hide();
	    $("table.sales tr:first td:last div div").hide();
    });
    
    /* not used, page has own embedded script
    
    // docs download menu
    $('#docs_download li div').hide();
    $('.docs_ltitle').click(function(){
	var div = $(this).parent().children('div');
	if ( div.attr("class") == 'active' ) {
	    div.removeClass("active");
	    div.hide();
	}
	else {
	    div.addClass("active");
	    div.show();
	}
    });
    */
    //
    //tooltip
    //
    $("#content #partners h3:first").css("border-top", "none");
    $("#content #partners .partners_title:first").css("border-top", "none");
    $("#content #clients h3:first").css("border-top", "none");
    /* quest */
    
    $('.tooltip').Tooltip({
	    delay: 0,
	    showURL: false
    });
    //tooltip
    
    
// new default js functions
    //target blank
    $("a[rel*=blank]").click(function(){
	    window.open(this.href);
	    return false;
    });
    //block menu show\hide, activiti status
    $("#content .block .menu li .menu_block:not(.active)").hide();
    $("#content .block .menu li a[rel*=toggle]").click(function(){	
	if($(this).parent().children(".menu_block").hasClass("active")) {
	    filter_id = "domain_list__"+$(this).attr("id");
	    $.ajax({
	      url: "/user/set_session_value?group_name=filter_groups&name="+filter_id+"&value=0",
	      cache: false,
	      success: function(status) {
		if ( status == 'Ok' ) {}
		else {
		    //alert ('Error');
		};}
	    });
	    $(this).parent().children(".menu_block").hide();
	    $(this).parent().children(".menu_block").removeClass("active");		
	}
	else {
	    filter_id="domain_list__"+$(this).attr("id");
	    $.ajax({
		url: "/user/set_session_value?group_name=filter_groups&name="+filter_id+"&value=1",
		cache: false,
		success: function(status) {
		    if ( status == 'Ok' ) {}
		    else {
			//alert ('Error');
		    };}
		});										
	    $(this).parent().children(".menu_block").show();
	    $(this).parent().children(".menu_block").addClass("active");			
	}
	return false;
    });

    /* not used, old header_top menu
     
    // hover show
    $('#project_menu').hover(function(){
	if ($('#project_menu ul ul').is(":animated")) {
	}
	else {
	    $('#project_menu ul ul').show(200);
	}
    }, function () {
	$('#project_menu ul ul').hide(400);
    });
	
	//hover active	
    $('#project_menu ul ul li a').hover(function() {
        $(this).parent('li').addClass('active');
    }, function () {
        $(this).parent('li').removeClass('active');
    });


    $('#tels_menu_rus').hover(function(){
	if ($('#tels_menu_rus ul ul').is(":animated")) {
	}
	else {
	    $('#tels_menu_rus ul ul').show(200);
	}
    }, function () {
	$('#tels_menu_rus ul ul').hide(400);
    });
        
    // hover active  
    $('#tels_menu_rus ul ul li a').hover(function() {
        $(this).parent('li').addClass('active');
    }, function () {
        $(this).parent('li').removeClass('active');
    });
    
    
    $('#tels_menu_ukr').hover(function(){
	if ($('#tels_menu_ukr ul ul').is(":animated")) {
	}
	else {
	    $('#tels_menu_ukr ul ul').show(200);
	}
    }, function () {
	$('#tels_menu_ukr ul ul').hide(400);
    });
        
    //hover active  
    $('#tels_menu_ukr ul ul li a').hover(function(){
        $(this).parent('li').addClass('active');
    }, function () {
        $(this).parent('li').removeClass('active');
    });
    */
    
    // Ссылки в newdomain/checkmany на занятый домен/ХУИЗ домена
    // В полной версии сайта - открываются в новом окне, в мобильной - в текущем
    $(".extPopUpIE").click(function(){	
	extPopUpIE($(this).attr("href"));
	return false;
    });
    
});

//reg.ru functions
//clear
function clear() {
    $('.progress').hide();
}
