function jq_hide (element_id) {
    var $jq = jQuery.noConflict();
    $jq(element_id).hide();
}

function toggle_checkbox_messages (messages_div_id) {
    var $jq = jQuery.noConflict();

    $jq(document).ready(function() {
        var new_attr = $jq(messages_div_id + ' #multi_checkbox').attr("checked") ? "checked" : "";
        
        $jq(messages_div_id + ' input:enabled[type=checkbox]').each(function() {
            $jq(this).attr("checked", new_attr);
        });
    });
    
}

function submit_message (messages_div_id, status, process_result, hide_layer_name, hide_layer_number, skip_checkbox_check, on_success_show_div, message_id) {
    var $jq = jQuery.noConflict();

    $jq(document).ready(function() {

    var message_processed = 0;
    if (!message_id) {
    var checkbox = $jq("#terms_accepted_" + hide_layer_number);
    
    if ( (! checkbox.attr("checked") && process_result == 'accepted') && !skip_checkbox_check )  {
        alert ('�� ������ ���������� � ��������� ��������-������!');
        return false;
    }
    
    var all_checkbox_number = $jq(messages_div_id + ' input[type=checkbox]:not(#multi_checkbox)').length;
    //alert ("ALL CHECKBOX NUM:" + all_checkbox_number);
    
    var checked_service_ids = $jq(messages_div_id + ' input[type=checkbox][checked]:not(#multi_checkbox)');
    //alert ('cheked_num: ' + checked_service_ids.length);
    
    var checked_enabled_service_ids = $jq(messages_div_id + ' input:enabled[type=checkbox][checked]:not(#multi_checkbox)');
    //alert ('cheked_num: ' + checked_enabled_service_ids.length);

    if (!checked_enabled_service_ids.length) {
        alert ('�� ������ ������� ��� ������� 1 �����!');
        return false;
    }
    
    checked_enabled_service_ids.each(function() {
        var message_id = $jq(this).attr("name");
        //alert("service_id = " + message_id);
        if (!message_id) {
            next;
        }
    
        /*if ($jq(this).disabled == true ) {
            next; //���������� ��� ������������
        }*/
        
        $jq(this).attr("disabled","disabled");
        //alert ("making request: " + '/user/process_message?id=' + message_id + '&status=' + status + '&process_result=' + process_result);    
        $jq.ajax({
            url: '/user/process_message?id=' + message_id + '&status=' + status + '&process_result=' + process_result,
            async: false,
            success: function(msg) {
                if ( msg == 'ok' ) {}
                else {
                    alert ('������ ��� ��������� �  ��'); return false;
                };
            }
        });
     });


    var disabled_service_ids = $jq(messages_div_id + ' input[type=checkbox][disabled]:not(#multi_checkbox)');
    //alert ('disabled: ' + disabled_service_ids.length);
    }
    else {
        $jq.ajax({
            url: '/user/process_message?id=' + message_id + '&status=processed&process_result=accepted',
            async: false,
            success: function(msg) {
                if ( msg == 'ok' ) {}
                else {
                    alert ('������ ��� ��������� �  ��'); return false;
                };
            }
        });
        message_processed = 1;
    }
    
    if ( message_processed || (checked_service_ids.length == disabled_service_ids.length &&
        disabled_service_ids.length == all_checkbox_number) ) {
        // ���� �� ����� ��������� �����������
        // ���������� ��������� ����� ���������
        //alert('ALL PROCESSED!');
        $jq(hide_layer_name + hide_layer_number).hide();
        show_layer_number = hide_layer_number - 1;
        
        if (show_layer_number < 1) { // ��� ������ ���������
            if (on_success_show_div) { // �������� �������� � ���������, �.�. �� ������������� ���������
                $jq(on_success_show_div).show();
            } else {
                document.refresh_page.submit(); // ��������� ��������
            }
        //window.location = '/user/domain_list?nocache=[% rand %]'; // ��������� ��������
        } else {
            $jq(hide_layer_name + show_layer_number).show();
        }
    }

    });
    
    return true;
}