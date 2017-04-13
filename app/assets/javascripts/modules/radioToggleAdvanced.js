(function () {
    /* jshint expr: true */
    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var RadioToggleAdvanced = function (){

        function swapsy(_this){
            if($(_this).filter(':checked').val() === 'SCAT'){
                $('#fieldScat').insertBefore('#fieldBa');
                $('#fieldBa .error-message').css('display', 'none');
                $('#fieldScat .error-message').css('display', 'block');
                $('#secondaryParams').css('display', 'none');
                $('#fieldBa').css('display', 'none');
                $('#searchFilters').insertAfter('#fieldScat');
            }else if($(_this).filter(':checked').val() === 'ADDRESS'){
                $('#fieldScat,#secondaryParams').css('display', 'none');
                $('#fieldScat .error-message, #fieldBa .error-message').css('display', 'none');
                $('#searchFilters').insertBefore('#fieldScat');
            }else if($(_this).filter(':checked').val() === 'BA'){
                $('#fieldScat,#secondaryParams').css('display', 'none');
                $('#fieldScat').insertAfter('#fieldBa');
                $('#searchFilters').insertAfter('#fieldBa');
                $('#fieldBa .error-message').css('display', 'block');
                $('#fieldScat .error-message').css('display', 'none');
            }else{
                $('#fieldBa .error-message').css('display', 'block');
                $('#fieldScat .error-message').css('display', 'none');
                $('#fieldBa').insertBefore('#fieldScat');
            }
            if($('#fieldBa span').hasClass('error-message')){
                $('#searchFilters').insertAfter('#fieldBa');
            }
            if($('#fieldScat span').hasClass('error-message')){
                $('#searchFilters').insertAfter('#fieldScat');
            }
            $('#searchFilters a').text('Show additional search filters');
        }

        $('[name="primaryCriteria"]').change(function(){
            swapsy(this);
        });

        $('[name="primaryCriteria"]').each(function(){
            swapsy(this);
        });

        $('#searchFilters a').click(function(e){
            e.preventDefault();

            if($(this).text() === 'Show additional search filters'){
                $(this).text('Hide additional search filters');
            }else{
                $(this).text('Show additional search filters');
            }

            if($('[name="primaryCriteria"]').filter(':checked').val() === 'ADDRESS'){
                $('#fieldScat,#secondaryParams').toggle();
                $('#searchFilters').insertBefore('#fieldScat');
            }
            else if($('[name="primaryCriteria"]').filter(':checked').val() === 'BA'){
                $('#fieldScat,#secondaryParams').toggle();
                $('#searchFilters').insertAfter('#fieldBa');
            }
            else if($('[name="primaryCriteria"]').filter(':checked').val() === 'SCAT'){
                $('#fieldBa,#secondaryParams').toggle();
                $('#searchFilters').insertAfter('#fieldScat');
            }

        });

    };

    root.VOA.RadioToggleAdvanced = RadioToggleAdvanced;
}).call(this);
