$(function(){
    $('.btn-delete').click(function(){
        
        var data = $(this).data('user');
        $("#frm-delete").attr("action", "user_management/" + data.id);
        $('#spn-name').text(data.first_name + " " + data.last_name)
        $('#mdl-delete').modal(); 
        
    });
    
    // image avatar
    var fileName = "";
    var $image = $(".image-avatar-crop > img")
    
    $($image).cropper({
        aspectRatio: 1/1,
        preview: ".img-avatar-preview",
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

    $("#btn-crop").click(function () {
        event.preventDefault();
        
        if (fileName != "") {
            $('#user_avatar').val($image.cropper("getDataURL"));
            $('#avatar_file_name').val(fileName);
            $('#frm-user-avatar').submit();
        } else {
            Messenger().post({
                message: "Upload you image first",
                type: "error",
                showCloseButton: true,
                position: 'top'
            });  
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
    
    $('#edit-name').click(function(){
        $('#dv-name-container').removeClass('hidden');
        $('#dv-username-container').addClass('hidden');
        $('#dv-contact-container').addClass('hidden');
        $('#dv-password-container').addClass('hidden');
        
        $('#spn-edit-name').text('full name');
        
        $('#mdl-edit-account').modal('toggle');
    });
    
    $('#edit-username').click(function(){
        
        $('#dv-name-container').addClass('hidden');
        $('#dv-username-container').removeClass('hidden');
        $('#dv-contact-container').addClass('hidden');
        $('#dv-password-container').addClass('hidden');
        
        $('#spn-edit-name').text('username');
        
        $('#mdl-edit-account').modal('toggle');
    });
    
    $('#edit-contact').click(function(){
    
        $('#dv-name-container').addClass('hidden');
        $('#dv-username-container').addClass('hidden');
        $('#dv-contact-container').removeClass('hidden');
        $('#dv-password-container').addClass('hidden');
        
        $('#spn-edit-name').text('contact information');
        
        $('#mdl-edit-account').modal('toggle');
    });
    
    $('#edit-password').click(function(){
    
        $('#dv-name-container').addClass('hidden');
        $('#dv-username-container').addClass('hidden');
        $('#dv-contact-container').addClass('hidden');
        $('#dv-password-container').removeClass('hidden');
        
        $('#spn-edit-name').text('current password');
        
        $('#mdl-edit-account').modal('toggle');
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