$(function(){

    $('.btn-delete').click(function(){
        
        var data = $(this).data('category');
        $("#frm-delete").attr("action", "categories/" + data.id);
        $('#spn-name').text(data.name)
        $('#mdl-delete').modal(); 
        
    });
    
    $('.btn-delete-2').click(function(){
        
        var data = $(this).data('category');
        $("#frm-delete").attr("action", "../../categories/" + data.id);
        $('#spn-name').text(data.name)
        $('#mdl-delete').modal(); 
        
    });
    
    /*
     * Insert a 'details' column to the table
     */
    var nCloneTh = document.createElement( 'th' );
    var nCloneTd = document.createElement( 'td' );
    nCloneTd.innerHTML = '<i class="fa fa-plus-circle"></i>';
    nCloneTd.className = "center";
    
    $('#tbl-category thead tr').each( function () {
        this.insertBefore( nCloneTh, this.childNodes[0] );
    } );
     
    $('#tbl-category tbody tr').each( function () {
        this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
    } );
     
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTable = $('#tbl-category').dataTable( {
	   "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
       "aaSorting": [],
				"oLanguage": {
			"sLengthMenu": "_MENU_ ",
			"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
		},
    });
    
    $('#tbl-category tbody td:first-child i').live('click', function () {
        var nTr = $(this).parents('tr')[0];
        var self = this;
        
        if ( oTable.fnIsOpen(nTr))
        {
            /* This row is already open - close it */
            $(this).removeClass("fa fa-minus-circle");
            $(this).addClass("fa fa-plus-circle");  
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            $(this).removeClass("fa fa-plus-circle");
            $(this).addClass("fa fa-minus-circle");   
            
            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
        }
    });
    
});

function fnFormatDetails ( oTable, nTr )
{
    var aData = oTable.fnGetData( nTr );
    var data = $('#tr-category-' + nTr['_DT_RowIndex']).data('user'); 
    
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
    sOut += '<tr><td>Gender:</td><td>' + data['description'] + '</td></tr>';
    sOut += '</table>';
     
    return sOut;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}