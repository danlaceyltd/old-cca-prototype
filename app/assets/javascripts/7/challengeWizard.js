(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var ChallengeWizard = function (){

        $('#challengeWizard [type="submit"]').click(function(e){
            e.preventDefault();

            var selected = $('[name="challengeType"]:checked').val();

            if( selected === 'The valuation was wrong on 1st April 2017'){
                window.location = "/dashboard/1/challenge/challengeType-1.html";
            }else if(selected === 'A change made by the VOA on or after 1st April 2017 is wrong'){
                window.location = "/dashboard/1/challenge/challengeType-2.html";
            }else if(selected === 'The effective date of a change made by the VOA on or after 1st April 2017 is wrong'){
                window.location = "/dashboard/1/challenge/challengeType-3.html";
            }else if(selected === 'Something in the local area which affects my property has made the valuation wrong'){
                window.location = "/dashboard/1/challenge/challengeType-4.html";
            }else if(selected === 'The property should not be in the rating list'){
                window.location = "/dashboard/1/challenge/challengeType-5.html";
            }else if(selected === 'The property should be split into more than one'){
                window.location = "/dashboard/1/challenge/challengeType-6.html";
            }else if(selected === 'The property should be merged with others into one or more new properties'){
                window.location = "/dashboard/1/challenge/challengeType-7.html";
            }else if(selected === 'The valuation is wrong because of a legal decision which affects this property'){
                window.location = "/dashboard/1/challenge/challengeType-8.html";
            }



        });


    };

    root.VOA.ChallengeWizard = ChallengeWizard;

    }).call(this);
