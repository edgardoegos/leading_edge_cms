/* Set the defaults for DataTables initialisation */
$.extend( true, $.fn.dataTable.defaults, {
	"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'p i>>",
	"sPaginationType": "bootstrap",
	"oLanguage": {
		"sLengthMenu": "_MENU_"
	}
} );


/* Default class modification */
$.extend( $.fn.dataTableExt.oStdClasses, {
	"sWrapper": "dataTables_wrapper form-inline"
} );


/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
	return {
		"iStart":         oSettings._iDisplayStart,
		"iEnd":           oSettings.fnDisplayEnd(),
		"iLength":        oSettings._iDisplayLength,
		"iTotal":         oSettings.fnRecordsTotal(),
		"iFilteredTotal": oSettings.fnRecordsDisplay(),
		"iPage":          oSettings._iDisplayLength === -1 ?
			0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
		"iTotalPages":    oSettings._iDisplayLength === -1 ?
			0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
	};
};



/* Bootstrap style pagination control */
$.extend( $.fn.dataTableExt.oPagination, {
	"bootstrap": {
		"fnInit": function( oSettings, nPaging, fnDraw ) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function ( e ) {
				e.preventDefault();
				if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
					fnDraw( oSettings );
				}
			};

			$(nPaging).addClass('pagination').append(
				'<ul>'+
					'<li class="prev disabled"><a href="#"><i class="fa fa-chevron-left"></i></a></li>'+
					'<li class="next disabled"><a href="#"><i class="fa fa-chevron-right"></i></a></li>'+
				'</ul>'
			);
			var els = $('a', nPaging);
			$(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
			$(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
		},

		"fnUpdate": function ( oSettings, fnDraw ) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

			if ( oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			}
			else if ( oPaging.iPage <= iHalf ) {
				iStart = 1;
				iEnd = iListLength;
			} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}

			for ( i=0, ien=an.length ; i<ien ; i++ ) {
				// Remove the middle elements
				$('li:gt(0)', an[i]).filter(':not(:last)').remove();

				// Add the new list items and their event handlers
				for ( j=iStart ; j<=iEnd ; j++ ) {
					sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
					$('<li '+sClass+'><a href="#">'+j+'</a></li>')
						.insertBefore( $('li:last', an[i])[0] )
						.bind('click', function (e) {
							e.preventDefault();
							oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
							fnDraw( oSettings );
						} );
				}

				// Add / remove disabled classes from the static elements
				if ( oPaging.iPage === 0 ) {
					$('li:first', an[i]).addClass('disabled');
				} else {
					$('li:first', an[i]).removeClass('disabled');
				}

				if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
					$('li:last', an[i]).addClass('disabled');
				} else {
					$('li:last', an[i]).removeClass('disabled');
				}
			}
		}
	}
} );


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */

	// Set the classes that TableTools uses to something suitable for Bootstrap
	$.extend( true, $.fn.DataTable.TableTools.classes, {
		"container": "DTTT ",
		"buttons": {
			"normal": "btn btn-white",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"print": {
			"info": "DTTT_print_info modal"
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a bootstrap compatible dropdown
	$.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
	
$(".select2-wrapper").select2({minimumResultsForSearch: -1});	

$(function() {
    
    var responsiveHelper = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone : 480
    };    
    
    $( '.fld-content' ).find('textarea').each(function (){
        $(this).attr('name', $(this).attr('name').slice(0,-2));
    });
    
    $('#tab-post a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
    
    var fileName = "";
    
    var $image = $(".image-crop > img")
    
    $($image).cropper({
        aspectRatio: 25/9,
        preview: ".img-preview",
        done: function (data) {
            console.log('data:' + JSON.stringify(data))
            // Output the result data for cropping image.
        }
    });

    var $inputImage = $("#inputImage");
    if (window.FileReader) {
        $inputImage.change(function () {
            var fileReader = new FileReader(),
                    files = this.files,
                    file;

            if (!files.length) {
                return;
            }

            file = files[0];
            
            fileName = file.name
            
            if (/^image\/\w+$/.test(file.type)) {
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    $inputImage.val("");
                    $image.cropper("reset", true).cropper("replace", this.result);
                };
            } else {
                showMessage("Please choose an image file.");
            }
        });
    } else {
        $inputImage.addClass("hide");
    }

    $("#btn-add-image").click(function () {
        event.preventDefault();
        
        if (fileName != "") {
        
            $('#setting_image').val($image.cropper("getDataURL"));

            // Append Image
            var countTr = generateId();
            var source = "#post-image-tr";
            var template = Handlebars.compile($(source).html());

            $("#tbody-image-template").append(template({
                countTr: countTr,
                imageSrc: $image.cropper("getDataURL"),
                fileName: fileName
            }));

            var firstChild = $('#tbody-image-template #tr-new-' + countTr).is(':first-child');
            if (firstChild == true) {
                $('#tbody-image-template #tr-new-' + countTr).find('.unique').attr('checked', true);
                $('#tbody-image-template #tr-new-' + countTr).find('.unique').val(1);
            }
            

            $('#mdl-image-cropper').modal('toggle');
        
            fileName = "";
            $image.cropper("replace", "/assets/assets/img/empty-state.png");
            
        } else {
            
        }
        
    });

    $("#zoomIn").click(function () {
        $image.cropper("zoom", 0.1);
    });

    $("#zoomOut").click(function () {
        $image.cropper("zoom", -0.1);
    });

    $("#rotateLeft").click(function () {
        $image.cropper("rotate", 45);
    });

    $("#rotateRight").click(function () {
        $image.cropper("rotate", -45);
    });

    $("#setDrag").click(function () {
        $image.cropper("setDragMode", "crop");
    });
    
    $("#btn-reload").click(function () {
        $image.cropper("reset", "true");
    });

    //Button Clear
    $(document).on('click', '.btn-clear', function () {
        var imageId = $(this).data('id');
        var type = $(this).data('type');

        $('#confirmClear #hnd-fld-id').val(imageId);
        $('#confirmClear #hnd-fld-type').val(type);
        
         $('#confirm-clear').data('type', 'clear');
        
        $('#confirmClear').modal('toggle');
    });
    
    
    //Button Clear
    $(document).on('click', '.btn-delete', function () {
        var imageId = $(this).data('id');
        var type = $(this).data('type');

        $('#confirmClear #hnd-fld-id').val(imageId);
        $('#confirmClear #hnd-fld-type').val(type);
        
        
         $('#confirm-clear').data('type', 'delete');
        
        $("#frm-image-attachment-delete").attr("action", "delete_image_attachment/" + imageId);
        
        $('#confirmClear').modal('toggle');
    });
    
    //Confirm Clear
    $('#confirm-clear').click(function () {
        var id = $('#confirmClear #hnd-fld-id').val();
        var type = $('#confirmClear #hnd-fld-type').val();

        var isCover = $('#tbody-image-template #tr-new-' + id).find('.unique').val();
        var table = $('#tbody-image-template tr:first-child');
        var tr = $('#tbody-image-template #tr-new-' + id);

        var actionType = $(this).data('type')
        
        if (actionType == "delete") {
            $('#frm-image-attachment-delete').submit();
        } else {
            
            if (type == 'image') {

                if (isCover == 1) {
                    if (tr.is(':first-child')) {
                        tr.next('tr').find('.unique').val(1);
                        tr.next('tr').find('.unique').attr('checked', true);
                        $('#confirmClear').modal('hide');
                        tr.remove();
                    } else {
                        table.find('.unique').val(1);
                        table.find('.unique').attr('checked', true);
                        $('#confirmClear').modal('hide');
                        tr.remove();
                    }
                } else {
                    $('#confirmClear').modal('hide');
                    tr.remove();
                }
            } else if (type == "attribute") {

                $('#confirmClear').modal('hide');
                $('#tdy-attr-container #tr-new-' + id).remove();
            }
        }
    
    });
    
    //Checkbox allow 1 cover photo only
    $(document).on('click', 'input.unique', function () {
        $('input.unique').removeAttr('checked');
        $('input.unique').val(0);

        $(this).attr('checked', true);
        $(this).val(1);
    });
    
    // Datatables
    // Post All
    
    /*
     * Insert a 'details' column to the table
     */
    var nCloneThAll = document.createElement( 'th' );
    var nCloneTdAll = document.createElement( 'td' );
    nCloneTdAll.innerHTML = '<i class="fa fa-plus-circle"></i>';
    nCloneTdAll.className = "center";
    
    $('#tbl-post-all thead tr').each( function () {
        this.insertBefore( nCloneThAll, this.childNodes[0] );
    } );
     
    $('#tbl-post-all tbody tr').each( function () {
        this.insertBefore(  nCloneTdAll.cloneNode( true ), this.childNodes[0] );
    } );
     
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTableAll = $('#tbl-post-all').dataTable( {
	   "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
       "aaSorting": [],
				"oLanguage": {
			"sLengthMenu": "_MENU_ ",
			"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
		},
    });
    
    $('#tbl-post-all tbody td:first-child i').live('click', function () {
        var nTr = $(this).parents('tr')[0];
        var self = this;
        
        if ( oTableAll.fnIsOpen(nTr))
        {
            /* This row is already open - close it */
            $(this).removeClass("fa fa-minus-circle");
            $(this).addClass("fa fa-plus-circle");  
            oTableAll.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            $(this).removeClass("fa fa-plus-circle");
            $(this).addClass("fa fa-minus-circle");   
            
            oTableAll.fnOpen( nTr, fnFormatDetailsAll(oTableAll, nTr), 'details' );
        }
    });
    
    
    // Published
    /*
     * Insert a 'details' column to the table
     */
    var nCloneThPublished = document.createElement( 'th' );
    var nCloneTdPublished = document.createElement( 'td' );
    nCloneTdPublished.innerHTML = '<i class="fa fa-plus-circle"></i>';
    nCloneTdPublished.className = "center";
    
    $('#tbl-post-published thead tr').each( function () {
        this.insertBefore( nCloneThPublished, this.childNodes[0] );
    } );
     
    $('#tbl-post-published tbody tr').each( function () {
        this.insertBefore(  nCloneTdPublished.cloneNode( true ), this.childNodes[0] );
    } );
     
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTablePublished = $('#tbl-post-published').dataTable( {
	   "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
       "aaSorting": [],
				"oLanguage": {
			"sLengthMenu": "_MENU_ ",
			"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
		},
    });
    
    $('#tbl-post-published tbody td:first-child i').live('click', function () {
        var nTr = $(this).parents('tr')[0];
        var self = this;
        
        if ( oTablePublished.fnIsOpen(nTr))
        {
            /* This row is already open - close it */
            $(this).removeClass("fa fa-minus-circle");
            $(this).addClass("fa fa-plus-circle");  
            oTablePublished.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            $(this).removeClass("fa fa-plus-circle");
            $(this).addClass("fa fa-minus-circle");   
            
            oTablePublished.fnOpen( nTr, fnFormatDetailsPublished(oTablePublished, nTr), 'details' );
        }
    });
    
    // Drafted
    /*
     * Insert a 'details' column to the table
     */
    var nCloneThDrafted = document.createElement( 'th' );
    var nCloneTdDrafted = document.createElement( 'td' );
    nCloneTdDrafted.innerHTML = '<i class="fa fa-plus-circle"></i>';
    nCloneTdDrafted.className = "center";
    
    $('#tbl-post-drafted thead tr').each( function () {
        this.insertBefore( nCloneThDrafted, this.childNodes[0] );
    } );
     
    $('#tbl-post-drafted tbody tr').each( function () {
        this.insertBefore(  nCloneTdDrafted.cloneNode( true ), this.childNodes[0] );
    } );
     
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTableDrafted = $('#tbl-post-drafted').dataTable( {
	   "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
       "aaSorting": [],
				"oLanguage": {
			"sLengthMenu": "_MENU_ ",
			"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
		},
    });
    
    $('#tbl-post-drafted tbody td:first-child i').live('click', function () {
        var nTr = $(this).parents('tr')[0];
        var self = this;
        
        if ( oTableDrafted.fnIsOpen(nTr))
        {
            /* This row is already open - close it */
            $(this).removeClass("fa fa-minus-circle");
            $(this).addClass("fa fa-plus-circle");  
            oTableDrafted.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            $(this).removeClass("fa fa-plus-circle");
            $(this).addClass("fa fa-minus-circle");   
            
            oTableDrafted.fnOpen( nTr, fnFormatDetailsDrafted(oTableDrafted, nTr), 'details' );
        }
    });
    
    // Review
    /*
     * Insert a 'details' column to the table
     */
    var nCloneThReview = document.createElement( 'th' );
    var nCloneTdReview = document.createElement( 'td' );
    nCloneTdReview.innerHTML = '<i class="fa fa-plus-circle"></i>';
    nCloneTdReview.className = "center";
    
    $('#tbl-post-review thead tr').each( function () {
        this.insertBefore( nCloneThReview, this.childNodes[0] );
    } );
     
    $('#tbl-post-review tbody tr').each( function () {
        this.insertBefore(  nCloneTdReview.cloneNode( true ), this.childNodes[0] );
    } );
     
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTableReview = $('#tbl-post-review').dataTable( {
	   "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
       "aaSorting": [],
				"oLanguage": {
			"sLengthMenu": "_MENU_ ",
			"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
		},
    });
    
    $('#tbl-post-review tbody td:first-child i').live('click', function () {
        var nTr = $(this).parents('tr')[0];
        var self = this;
        
        if ( oTableReview.fnIsOpen(nTr))
        {
            /* This row is already open - close it */
            $(this).removeClass("fa fa-minus-circle");
            $(this).addClass("fa fa-plus-circle");  
            oTableReview.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            $(this).removeClass("fa fa-plus-circle");
            $(this).addClass("fa fa-minus-circle");   
            
            oTableReview.fnOpen( nTr, fnFormatDetailsReview(oTableReview, nTr), 'details' );
        }
    });
    
    // Trashed

    var tablePostTrashed = $('#tbl-post-trashed');

    tablePostTrashed.dataTable( {
		"sDom": "<'row'<'col-md-6'l T><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
			"oTableTools": {
			"aButtons": [
				{
					"sExtends":    "collection",
					"sButtonText": "<i class='fa fa-trash'></i> Delete",
					"aButtons":    [ "csv", "xls", "pdf", "copy"]
				}
			]
		},
		"sPaginationType": "bootstrap",
		 "aoColumnDefs": [
          { 'bSortable': false, 'aTargets': [ 0 ] }
		],
		"aaSorting": [[ 1, "asc" ]],
		"oLanguage": {
			"sLengthMenu": "_MENU_ ",
			"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
		},
		 bAutoWidth     : false,
        fnPreDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper) {
                responsiveHelper = new ResponsiveDatatablesHelper(tablePostTrashed, breakpointDefinition);
            }
        },
        fnRowCallback  : function (nRow) {
            responsiveHelper.createExpandIcon(nRow);
        },
        fnDrawCallback : function (oSettings) {
            responsiveHelper.respond();
        }
	});
    
    $('#tbl-post-all_wrapper .dataTables_filter input').addClass("input-medium ");
    $('#tbl-post-all_wrapper .dataTables_length select').addClass("select2-wrapper span12"); 
    
    $('#tbl-post-published_wrapper .dataTables_filter input').addClass("input-medium ");
    $('#tbl-post-published_wrapper .dataTables_length select').addClass("select2-wrapper span12");
    
    $('#tbl-post-review_wrapper .dataTables_filter input').addClass("input-medium ");
    $('#tbl-post-review_wrapper .dataTables_length select').addClass("select2-wrapper span12");
    
    $('#tbl-post-drafted_wrapper .dataTables_filter input').addClass("input-medium ");
    $('#tbl-post-drafted_wrapper .dataTables_length select').addClass("select2-wrapper span12");
    
    $('#tbl-post-trashed_wrapper .dataTables_filter input').addClass("input-medium ");
    $('#tbl-post-trashed_wrapper .dataTables_length select').addClass("select2-wrapper span12");
    
    
    $(".select2-wrapper").select2({minimumResultsForSearch: -1});
    
});

function fnFormatDetailsAll ( oTable, nTr ) {
    var aData = oTable.fnGetData( nTr );
    var data = $('#tr-post-all-' + nTr['_DT_RowIndex']).data('post'); 
    
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
    sOut += '<tr><td>Created By:</td><td>' + data['creator'] + '</td></tr>';
    sOut += '<tr><td>Published By:</td><td>' + data['publisher'] + '</td></tr>';
    sOut += '<tr><td>Last Update:</td><td>' + moment(data['updated_at']).format('MMMM Do YYYY') + '</td></tr>';
    sOut += '</table>';
     
    return sOut;
}

function fnFormatDetailsPublished ( oTable, nTr ) {
    var aData = oTable.fnGetData( nTr );
    var data = $('#tr-post-published-' + nTr['_DT_RowIndex']).data('post'); 
    
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
    sOut += '<tr><td>Created By:</td><td>' + data['creator'] + '</td></tr>';
    sOut += '<tr><td>Published By:</td><td>' + data['publisher'] + '</td></tr>';
    sOut += '<tr><td>Last Update:</td><td>' + moment(data['updated_at']).format('MMMM Do YYYY') + '</td></tr>';
    sOut += '</table>';
     
    return sOut;
}

function fnFormatDetailsDrafted ( oTable, nTr ) {
    var aData = oTable.fnGetData( nTr );
    var data = $('#tr-post-drafted-' + nTr['_DT_RowIndex']).data('post'); 
    
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
    sOut += '<tr><td>Created By:</td><td>' + data['creator'] + '</td></tr>';
    sOut += '<tr><td>Published By:</td><td>' + data['publisher'] + '</td></tr>';
    sOut += '<tr><td>Last Update:</td><td>' + moment(data['updated_at']).format('MMMM Do YYYY') + '</td></tr>';
    sOut += '</table>';
     
    return sOut;
}

function fnFormatDetailsReview ( oTable, nTr ) {
    var aData = oTable.fnGetData( nTr );
    var data = $('#tr-post-review-' + nTr['_DT_RowIndex']).data('post'); 
    
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
    sOut += '<tr><td>Created By:</td><td>' + data['creator'] + '</td></tr>';
    sOut += '<tr><td>Published By:</td><td>' + data['publisher'] + '</td></tr>';
    sOut += '<tr><td>Last Update:</td><td>' + moment(data['updated_at']).format('MMMM Do YYYY') + '</td></tr>';
    sOut += '</table>';
     
    return sOut;
}

function generateId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
