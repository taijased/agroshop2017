function checkwhois( frm ) {
  dname = frm.domain_name.value;
  if (! dname)
    return false;

  return true;
}
function month( offset, lang ) {
    var month = new Array(12);
    if (lang == '/en') {
	month[-1+ offset] = "December";
	month[0+ offset] = "January";
	month[1+ offset] = "February";
	month[2+ offset] = "March";
	month[3+ offset] = "April";
	month[4+ offset] = "May";
	month[5+ offset] = "June";
	month[6+ offset] = "July";
	month[7+ offset] = "August";
	month[8+ offset] = "September";
	month[9+ offset] = "October";
	month[10+ offset] = "November";
	month[11+ offset] = "December";
    }
    else {
	month[-1+ offset] = "Декабрь";
	month[0+ offset] = "Январь";
	month[1+ offset] = "Февраль";
	month[2+ offset] = "Март";
	month[3+ offset] = "Апрель";
	month[4+ offset] = "Май";
	month[5+ offset] = "Июнь";
	month[6+ offset] = "Июль";
	month[7+ offset] = "Август";
	month[8+ offset] = "Сентябрь";
	month[9+ offset] = "Октябрь";
	month[10+ offset] = "Ноябрь";
	month[11+ offset] = "Декабрь";
    }
    return month;
}


function extPopUp( Url, Width, Height) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(Url, '" + id + "', 'toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=1,resizable=1,width=Width,height=Height');");
}

function extPopUpNoBars( Url, Width, Height) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(Url, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=Width,height=Height');");
}


function extPopUpIE(Url) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(Url, '" + id + "', 'toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=1,resizable=1');");
}

function openwin( winname ) {
    window.open("/tlds_help/"+winname+".pl","littlehelp","toolbar=no,scrollbars=yes,width=360,height=450");
}

function openwin2( winname ) {
    window.alert('Регистрация в зоне "'+winname+'" ещё не начата на нашем сайте');
}

function openwin3( winname ) {
    window.alert('Регистрация в зоне "'+winname+'" приостановлена');
}

function changeall_availform( state ) {
    $('input[name^=tld_]').each( function() {
          $(this).attr('checked', state);
    });
}

function changepopular( state ) {
    $('input.main_tld').add('.popular_tlds').each( function() {
          $(this).attr('checked', state);//state.attr('checked'));
    });
}

function changeall_page( state ) {
//    state = $('.all_tlds');
    $('input:checkbox').each( function() {
          $(this).attr('checked', state);
    });
}

function popUp_and_fill() {
    $("#all_domens").css("display", "block");
    $("iframe").css("display", "block");
    $('input[name=dname]').each( function() {
          $(this).attr('value',
          $('input#domain_name').attr('value'));
    });
}

function addEngine() {
    if ((typeof window.sidebar == "object") && (typeof window.sidebar.addSearchEngine == "function")) {
    alert('Добавляем REG.Бар');
        window.sidebar.addSearchEngine(
            "https://www.reg.ru/docs/searchplugins/reg.ru.domain.src",
            "https://www.reg.ru/docs/searchplugins/reg.ru.domain.gif",
            "REG.RU WHOIS",
            "Web");
    } else {
        alert("Sorry, you need a Mozilla-based browser (such as Firefox) to install a search plugin.");
    }
}

function checkall_disabled_availform( frm ) {
  for (var i = 0; i < frm.elements.length; i++) {
    var elem = frm.elements[i];
    var s4 = elem.name.substring(0, 4);
    if ( s4 == 'tld_' && !elem.disabled && elem.checked) {
      return false;
    }
  }
  return true;
}

function changeall_selections( frm, prefix, limit ) {
  //var frm = document.forms[2];
  var count = 0;
  var prefix_length = prefix.length;
  for (var i = 0; i < frm.elements.length; i++) {
    var elem = frm.elements[i];
    var start = elem.name.substring(0, prefix_length);
    if ( start == prefix && !elem.disabled ) {
      count++;
      if (count <= limit || !frm.select_all.checked) {
        elem.checked = frm.select_all.checked;
      } else if (count == limit + 1) {
        alert('Выделено только '+limit+' позиций! Массовая операция невозможна для более чем '+limit+' элементов.');
	return;
      }
    }
  }
}


function changeall_domainlist( frm ) {
  return changeall_selections( frm, 'service_', 1000);
}

function changeall_folderlist( frm ) {
  return changeall_selections( frm, 'folder_', 200);
}

function gotoifconf( question, url ) {
    if (confirm(question)) {
	location.href=url
    }
}

function gElByID ( id ) {
    return document.getElementById( id );
}

function validate_whois( frmname ) {
    var submitOK = true;

    frm = document.getElementById( frmname );

    if (frm.dname.value.length == 0) {
        submitOK = false;
    }

    if (submitOK) {
	var el = document.getElementById( 'progress' );
	el.style.display = 'block';
    }

    return submitOK;
}

// Проверить корректность указания объёкта RIPN
function validate_ripn_object( frmname ) {
    var frm = document.getElementById( frmname );
    var val = frm.registrar.value;

    if (val.length == null || val.length == 0) {
	alert( 'Не введено имя!' );
	return false;
    }
    else if ( ! val.match( /^\s*[A-Z0-9]+(?:-[A-Z0-9]+)?-[A-Z0-9]+\s*$/i ) ) {
	alert( 'Не верное имя!' );
	return false;
    }

    var el = document.getElementById( 'progress' );
    el.style.display = 'block';

    return true;
}

function validate_regform( frmname ) {
    var frm = document.getElementById( frmname );
    var submitOK = true;
    var error_name = false;
    var dname = frm.dname.value;
    if (dname.length == 0) {
        submitOK = false;
    }
    if (checkall_disabled_availform( frm ) && dname.search(/\./) == -1) {
	error_name = true;
        submitOK = false;
    }

    if (submitOK) {
	var el = document.getElementById( 'progress' );
	el.style.display = 'block';
    } else {
	if (error_name) {
	    alert('Пожалуйста, отметьте хотя бы одну доменную зону или укажите ее напрямую внутри имени (например: yourdomain.com).');
	} else {
	    alert('Пожалуйста, введите имя домена.');
	}
    }

    return submitOK;
}

function hide_progress() {
    var progress = document.getElementById( 'progress' );
    progress.style.display = 'hidden';
}

function addZero(vNumber){
    return ((vNumber < 10) ? "0" : "") + vNumber
}

function formatDate(vDate, vFormat){
    var vDay              = addZero(vDate.getDate());
    var vMonth            = addZero(vDate.getMonth()+1);
    var vYearLong         = addZero(vDate.getFullYear());
    var vYearShort        = addZero(vDate.getFullYear().toString().substring(3,4));
    var vYear             = (vFormat.indexOf("yyyy")>-1?vYearLong:vYearShort)
    var vHour             = addZero(vDate.getHours());
    var vMinute           = addZero(vDate.getMinutes());
    var vSecond           = addZero(vDate.getSeconds());
    var vDateString       = vFormat.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear)
    vDateString           = vDateString.replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond)
    return vDateString
}

function nowdate( addmonths ) {
    var date = new Date;
    if (addmonths && addmonths != 0) {
	date.setMonth( date.getMonth() + addmonths );
    }
    return formatDate( date, 'yyyy-MM-dd' );
}

function nowdate_mstart() {
    return formatDate( new Date, 'yyyy-MM-01' );
}

function nowdate_mend() {
    return formatDate( new Date, 'yyyy-MM-31' );
}


// My Domains

function toggle_folders_for_all() {
    var sign = $('#folders_toggle_sign');
    var signs = $('a.folders_toggle_sign');

    if (sign.html() == '&gt;&gt;&gt;') {
      sign.html('&lt;&lt;&lt;');
      signs.html('&lt;&lt;&lt;');
      signs.hide();
      $('div.folders_for_service').show();
    }
    else {
      $('div.folders_for_service').hide();
      sign.html('&gt;&gt;&gt;');
      signs.html('&gt;&gt;&gt;');
      signs.show();
    }
}

function toggle_folders( service_id ) {
    var id = 'folders_for_'+service_id;

    var obj = $('#'+id);
    var sign = $('.folders_toggle_sign', obj);

    $('div.folders_for_service', obj).toggle();

    if (sign.html() == '&gt;&gt;&gt;') {
      sign.html('&lt;&lt;&lt;');
    }
    else {
      sign.html('&gt;&gt;&gt;');
    }
}

function toggle_nss_for_all() {
    var sign = $('#nss_toggle_sign');
    var signs = $('a.nss_toggle_sign');

    if (sign.html() == '&gt;&gt;&gt;') {
      sign.html('&lt;&lt;&lt;');
      signs.html('&lt;&lt;&lt;');
      signs.hide();
      $('div.nss_for_service').show();
    }
    else {
      $('div.nss_for_service').hide();
      sign.html('&gt;&gt;&gt;');
      signs.html('&gt;&gt;&gt;');
      signs.show();
    }
}

function toggle_nss( service_id ) {
    var id = 'nss_for_'+service_id;

    var obj = $('#'+id);
    var sign = $('.nss_toggle_sign', obj);

    $('div.nss_for_service', obj).toggle();

    if (sign.html() == '&gt;&gt;&gt;') {
      sign.html('&lt;&lt;&lt;');
    }
    else {
      sign.html('&gt;&gt;&gt;');
    }
}

function check_right_action() {
    var frm = document.domainlist;
    if ( frm.multi_action.options[ frm.multi_action.selectedIndex ].value == '' ) {
      alert('Действие не выбрано')
      return false;
    }

    if (document.getElementById('service_n_0').checked == true)
    {
      return true;
    }

    var success = 0;
    for (i = 0; i < frm.service_ids.length; i++) {
      if (frm.service_ids[i].checked == true) {
        success = 1;
        last;
      }
    }

    if ( success == 0 ) {
      alert('Домены не выбраны');
      return false;
    }

    return true;
}

function toggle_date_filter() {
    var date_filter = $('#toggle_date_filter');
    date_filter.toggle();

    if (date_filter.css("display") == 'none') {
      //alert('hidden!');
      $('#toggle_date_filter input').attr('disabled', 'disabled');
    } else {
      $('#toggle_date_filter input').removeAttr('disabled');
    }
}

// generic function to show/hide div/span block by ID

function toggle_div_block(block_id) {
    var div_obj = $(block_id);
    div_obj.toggle();
}

function disable_exp_or_cre_input_filter(filter_name, self) {
    var obj = "#" + filter_name + " input";

    if ( self.value == '') {
      $(obj).removeAttr('disabled');
    }
    else {
      $(obj).attr('disabled', 'disabled');
    }
}

function set_private_flag_by_action(flag) {
    if (flag == 1) {
      $('#private_person_flag').attr('value', 1);
    } else {
      $('#private_person_flag').attr('value', 0);
    }
}

function check_search_details(obj) {
    if ( $('#misc_functions_id').css("display") == 'none' ) {
      $('#misc_functions_id > span > input').attr('disabled', 'disabled');
    }
    prepare_userpref_names(obj);
    return true;
}

function prepare_userpref_names(obj) {
    $(".session_prefs input").
    add(".session_prefs textarea").
    add(".session_prefs select").each( function (i) {
        $(this).attr('name', 'filters_' + $(this).attr('name'));
    });
}

function wish_toggle_anonymous() {
    $("#wish input:not(:radio, :checkbox, #valid, :image)").each( function
(i) {
        if ( $(this).attr("disabled") == 1 ) {
          $(this).attr("disabled", 0);
        } else {
          $(this).attr("disabled", 1);
        }
      }
    );
}

function bind_default_value_for_input(elem_selector, default_value) {
    $(document).ready(function() {
        if (!default_value) {
            default_value = $(elem_selector).val(); // start value
	}

	$(elem_selector).focus(function () {
            $(this).click();
	});

        $(elem_selector).click(function () {
            if ( $(this).val() == default_value ) {
                $(this).val('');
            }
        });

        $(elem_selector).blur(function () {
            if($(this).val() == "") {
                $(this).val(default_value);
            }
        });

    });
}

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox')
            this.checked = false;
        else if (t == 'radio' && this.value == '')
            this.checked = true;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

function check_required( field ) {
    if (!field.checked) { 
	window.alert('Услуга не может быть отменена!');
	field.checked = 1;
    }
}
