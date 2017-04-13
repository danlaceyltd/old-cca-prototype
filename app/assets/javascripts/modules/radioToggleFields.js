
(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var RadioToggleFields = function (){

        var getDataToggleIds = function (scope) {
            var ids = [];
            $(scope).closest('fieldset').find('[data-toggle-id]').each(function(){
                ids.push($(this).attr('data-toggle-id').split(','));
            });
            return [].concat.apply([], ids);
        };

        var uniqueArray = function (array) {
            var unique = [];
            $.each(array, function(i, el){
                if($.inArray(el, unique) === -1){
                    unique.push(el);
                }
            });
            return unique;
        };

        var removeFromArray = function(array, value){
            for(var i = array.length; i--;) {
                if(array[i] === value) {
                    array.splice(i, 1);
                }
            }
            return array;
        };

        //Aria attributes and hide if no css

        $('[data-toggle-hidden]').each(function(){
            $(this).css('display', 'none').attr({'aria-expanded': 'false', 'aria-visible':'false'});
        });

        //Toggle on change

        $('input:radio').change(function(){
            var _this = this;

            //Get ids

            var ids = uniqueArray(getDataToggleIds(_this));

            //When data-toggle-id checked

            if($(_this).is('[data-toggle-id]:checked')){

                //Show correct ids

                $.each($(_this).attr('data-toggle-id').split(','), function( index, value ) {
                    $('#'+value).css('display', 'block').attr({'aria-expanded': 'true', 'aria-visible':'true'});
                    ids = removeFromArray(ids,value);
                });

                //Hide the rest

                $.each(ids, function( index, value ) {
                    $('#'+value).css('display', 'none').attr({'aria-expanded': 'false', 'aria-visible':'false'});
                });
            }else{

                //Hide the rest

                $.each($(this).closest('fieldset').find('[data-toggle-id]'), function( index, value ) {
                    $.each($(this).attr('data-toggle-id').split(','), function( index, value ) {
                        $('#'+value).css('display', 'none').attr({'aria-expanded': 'false', 'aria-visible':'false'});
                    });
                });
            }
        });

        //Onload show each checked

        $('input:radio[data-toggle-id]').each(function(){
            if($(this).is(':checked')){
                var ids = $(this).attr('data-toggle-id').split(',');
                $.each(ids, function( index, value ) {
                    $('#'+value).css('display', 'block').attr({'aria-expanded': 'true', 'aria-visible':'true'});
                });
            }
        });
    };

    root.VOA.RadioToggleFields = RadioToggleFields;

}).call(this);
