$(function(){
    $('.btn-delete').click(function(){
        
        var data = $(this).data('user');
        $("#frm-delete").attr("action", "users/" + data.id);
        $('#spn-name').text(data.first_name + " " + data.last_name)
        $('#mdl-delete').modal(); 
        
    });
    
    
    var $image = $(".image-crop > img")
    
    $($image).cropper({
        aspectRatio: 27/6,
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
//        $inputImage.val($image.cropper("getDataURL"));
        $('#setting_image').val($image.cropper("getDataURL"));
        $('#frm-company-logo').submit();
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

