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
                window.location = "/dashboard/4/pubs-check/internal";
            }else if(selected === 'external'){
                window.location = "/todo";
            }else if(selected === 'split'){
                window.location = "/todo";
            }else if(selected === 'merge'){
                window.location = "/todo";
            }else if(selected === 'remove'){
                window.location = "/todo";
            }else if(selected === 'legal-decision'){
                window.location = "/todo";
            }
        });


    };

    root.VOA.CheckWizard = CheckWizard;

    }).call(this);
