(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var PropertiesTable = function (){

        $(document).on('click', '#propertiesTable thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#propertiesTable thead tr#filterrow th')
            .not('#propertiesTable thead tr#filterrow th:eq(3)')
                .each( function () {
                    $(this).html( '<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>' );

            });

        $('#propertiesTable thead tr#filterrow th:eq(3)').html('<a href="#" class="clear">Clear search</a>');


        $(document).on('click', '#propertiesTable #filterrow button', function(e) {
            e.preventDefault();
            var i = $(this).closest('th').index();
            var value = $(this).prev().val();
            table.columns(i).search(value).draw();
        });

        $(document).on('click', '#propertiesTable .clear', function(e) {
            e.preventDefault();
            $('#filterrow input').val('');
            table.columns(0).search('').draw();
            table.columns(1).search('').draw();
            table.columns(2).search('').draw();
        });





        var table = $('#propertiesTable').DataTable({
            ajax: 'https://api.myjson.com/bins/11vcw9',
            orderCellsTop: true,
            //stateSave: true,
            "language": {
                "info": "Showing page _PAGE_ of _PAGES_",
                "lengthMenu": "Show _MENU_"
            },
            "aoColumns": [
             null,
             null,
              null,
               { "bSortable": false },
               { "bSortable": false, "visible": false   }
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {



                if(aData[3] === 'y'){
                        $('td:eq(3)', nRow).html('<ul class="list list-actions"><li><a href="#">Accept client request</a></li><li><a href="#">Reject client request</a></li></ul>');
                }else if(aData[4] === "Pending"){
                        $('td:eq(3)', nRow).html('<a href="/dashboard/4/agent/pending?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Pending VOA approval</a>');
                }else if(aData[4] === "declined 1" || aData[4] === "declined 2" || aData[4] === "declined 3" || aData[4] === "declined 4" || aData[4] === "declined 5" || aData[4] === "declined 6"){
                    $('td:eq(3)', nRow).html('<ul class="list list-actions"><li><a href="/dashboard/4/agent/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'&status='+aData[4]+'">Property details</a></li><li><a href="#">Delete</a></li></ul>');

                }else{
                    $('td:eq(3)', nRow).html('<a href="/dashboard/4/agent/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'&status='+aData[4]+'">Property details</a>');

                }

                if(!aData[2]){
                    $('td:eq(2)', nRow).html('<a href="/dashboard/4/agent/appoint-agent">Appoint agent</a>');

                }



            },
            initComplete: function( settings, json ) {
                table.columns(4).search('Approved').draw();
                table.columns(2).search('').draw();
                $('#propertiesTable .count').text(table.page.info().recordsDisplay);
                $('#propertiesTable .filter').text('approved');
                $('#propertiesTable .filter-help').html($('.current').attr('data-help'));

            }

        });

        $("#propertiesTable thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });

        $(document).on('click', '#propertiesTable_wrapper .data-filter li:not(".claim-property") a', function(e) {
            $('#propertiesTable_wrapper .data-filter li:not(".claim-property") a').removeClass('current');
            $(this).addClass('current');
            if($(this).attr('data-filter') === 'all'){
                table.columns(4).search('').draw();
                table.columns(2).search('').draw();
                $('#propertiesTable .filter-help').html('');
            }else if($(this).attr('data-filter') === 'ABC Agent'){
                table.columns(2).search($(this).attr('data-filter')).draw();
                table.columns(4).search('').draw();
            }
            else {
                table.columns(4).search($(this).attr('data-filter')).draw();
                table.columns(2).search('').draw();
                $('#propertiesTable .filter').text($(this).attr('data-filter'));
            }
            $('#propertiesTable .count').text(table.page.info().recordsDisplay);

        });




        $('.data-filter').insertBefore($('#propertiesTable'));

        $('#propertiesTable_length').insertAfter($('#propertiesTable_info')).css({'float' : 'none', 'margin-left': '30px', 'display' : 'inline-block', 'margin-top': '13px'});
        $('#propertiesTable_paginate').css({'margin-top': '8px','margin-right': '-10px'});


        //property-details


        function getUrlVars(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = decodeURI(hash[1]);
            }
            return vars;
        }


        function statusTextAgents(status){
            var text;
            if(status === 'declined 1'){
                text = "Property link declined by VOA";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>Your clients’ property link has been declined by the VOA. If they believe this has been done in error, they should contact the VOA. You can’t do this on their behalf.</p>'
                );
                return text;
            }else if(status === 'declined 2'){
                text = "Agent declined representation request";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>You’ve declined the request to represent the client for this property. You won’t be able to view detailed property information or start checks and challenges.</p>'
                );
                return text;
            }else if(status === 'declined 3'){
                text = "Property link revoked by VOA";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>The VOA has removed your clients’ link to this property. You can no longer view detailed property information or start or continue checks and challenges.' +
                    '<p>If your client believes this has been done in error, they should contact the VOA. You can’t do this on their behalf.</p>'
                );
                return  text;
            }else if(status === 'declined 4'){
                text = "Agent ended representation";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>You’ve informed us that you no longer want to represent the client for this property. You can no longer view detailed property information or start or continue checks and challenges.</p>'
                );
                return text;
            }else if(status === 'declined 5'){
                text = "Agent representation ended by client";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>Your client has informed us that they no longer want you to represent them for this property. You can no longer view detailed property information or start or continue checks and challenges.</p>'
                );
                return text;
            }else if(status === 'declined 6'){

                text = "Agent representation request timed out";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>The agent request has timed out as you did not respond. If you want to act as the agent for this property, you’ll need to ask your client to appoint you again.</p>'
                );
                return text;
            }else{
                return 'Approved';
            }
        }

        $('.property-address').text(getUrlVars()["address"]);
        $('.property-client-name').text(getUrlVars()["client"]);
        $('.property-ba-ref').text(getUrlVars()["ba"]);
        $('.agents-table .property-status').text(statusTextAgents(getUrlVars()["status"]));



    };

    root.VOA.PropertiesTable = PropertiesTable;

}).call(this);
