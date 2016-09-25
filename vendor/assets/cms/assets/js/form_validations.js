/* Webarch Admin Dashboard 
/* This JS is only for DEMO Purposes - Extract the code that you need
-----------------------------------------------------------------*/ 
$(document).ready(function() {				
	$(".select2").select2();
    
    $('.input-append.date').datepicker({
            startView: 2,
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            format: 'dd/mm/yyyy'
	   });
    
    $(".phone").mask("(999) 999-9999");
    $(".postal-code").mask('99999');
    
});	
	 