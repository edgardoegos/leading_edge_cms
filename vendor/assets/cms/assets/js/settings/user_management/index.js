$(function(){
    $('.btn-delete').click(function(){
        
        var data = $(this).data('user');
        $("#frm-delete").attr("action", "user_management/" + data.id);
        $('#spn-name').text(data.first_name + " " + data.last_name)
        $('#mdl-delete').modal(); 
        
    });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};