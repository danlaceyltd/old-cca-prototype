(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var CheckWizard = function (){

        $('#checkWizard [type="submit"]').click(function(e){
            e.preventDefault();

            var selected = $('[name="checkType"]:checked').val();

            if( selected === 'internal'){
                window.location = "/dashboard/1/check/internal";
            }else if(selected === 'external'){
                window.location = "/dashboard/1/check/external";
            }else if(selected === 'split'){
                window.location = "/dashboard/1/check/split";
            }else if(selected === 'merge'){
                window.location = "/dashboard/1/check/merge";
            }else if(selected === 'remove'){
                window.location = "/dashboard/1/check/remove";
            }else if(selected === 'legal-decision'){
                window.location = "/dashboard/1/check/legal";
            }
        });


    };

    root.VOA.CheckWizard = CheckWizard;

    }).call(this);
