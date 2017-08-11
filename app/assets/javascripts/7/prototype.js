// JavaScript Document


    var $errorMsg = $("<span class='error-message'>Please enter a valid UK postcode</span>");
$("#lookup-select").hide();
$("#lookup-form").hide();




$(function() {
       $('#lookup-manual').click(function() {
           $('#lookup-form').show();
           return false;
       });        
   });


$("#lookup-btn").on("click", function () {
        var toReturn = true;
        $("#lookup-input").each(function () {
            if ($(this).val() === "") {
                if (!$(this).data("error")) {
                    $(this).data("error", $errorMsg.clone().insertAfter($(this)));
                }
                toReturn = false;
            }
            else {
				$("#lookup-select").show();
                if ($(this).data("error")) {
                    $(this).data("error").remove();
                    $(this).removeData("error");
					
                }
            }
        });
        return toReturn;
    });

 
