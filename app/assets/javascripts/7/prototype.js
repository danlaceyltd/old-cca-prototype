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

$('.toggleLink').on('click', function (e) {
        e.preventDefault();
        var elem = $(this).next('.toggleElement');
        elem.toggle('slow');
    });


// Method for selecting all

$(document).ready(function() {
  $('#selectAll, #selectAll2').click(function(e){
    e.preventDefault();
    $("input:checkbox").prop('checked', function(i, current) { return !current; });
	
   $('input:radio').prop('disabled', function(i, v) { return !v; });
   
  });
});



$('input:checkbox').change(function(){
    if($(this).is(":checked")) {
     $('input:radio').prop("disabled", false);
    } else {
          $('input:radio').prop("disabled", true);
		
    }
});



$(function() {
    $("[name=pendingRequests]").click(function(){
            $('.pendingRequestBtn').hide();
            $("#btn-"+$(this).val()).show();
    });
 });
 
