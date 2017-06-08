(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var PropertiesTableBusiness = function (){

        $(document).on('click', '#propertiesTableBusiness thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#propertiesTableBusiness thead tr#filterrow th')
            .not('#propertiesTableBusiness thead tr#filterrow th:eq(3)')
                .each( function () {
                    $(this).html( '<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>' );
            });

        $('#propertiesTableBusiness thead tr#filterrow th:eq(3)').html('<a href="#" class="clear">Clear search</a>');




        var table = $('#propertiesTableBusiness').DataTable({
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



                if(aData[4] === "Approved"){
                    $('td:eq(3)', nRow).html('<a href="/dashboard/4/business/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Property details</a>');
                }else if(aData[4] === "Pending"){
                    $('td:eq(3)', nRow).html('<ul class="list list-actions"><li><a href="/dashboard/4/business/pending">Pending VOA approval</a></li><li><a href="/dashboard/4/business/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'&status='+aData[4]+'">Property details</a></li></ul>');
                }else{
                    $('td:eq(3)', nRow).html('<a href="/dashboard/4/business/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'&status='+aData[4]+'">Property details</a>');
                }

                if(!aData[2]){
                    $('td:eq(2)', nRow).html('<a href="/dashboard/4/business/appoint-agent">Appoint agent</a>');

                }

                if(aData[2] === "client"){
                    $('td:eq(2)', nRow).html('<a href="/dashboard/4/business/pending-agent">Pending agent approval</a>');
                }


            },
            initComplete: function( settings, json ) {
                table.columns(4).search('Approved').draw();
                table.columns(2).search('').draw();
                $('#propertiesTableBusiness .count').text(table.page.info().recordsDisplay);
                $('#propertiesTableBusiness .filter').text('approved');
            }
        });

        $("#propertiesTableBusiness thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });


        $(document).on('click', '#propertiesTableBusiness #filterrow button', function(e) {
            e.preventDefault();
            var i = $(this).closest('th').index();
            var value = $(this).prev().val();
            table.columns(i).search(value).draw();
        });

        $(document).on('click', '#propertiesTableBusiness .clear', function(e) {
            e.preventDefault();
            $('#filterrow input').val('');
            table.columns(0).search('').draw();
            table.columns(1).search('').draw();
            table.columns(2).search('').draw();

        });


        $(document).on('click', '#propertiesTableBusiness_wrapper .data-filter li:not(".claim-property") a', function(e) {
            $('.data-filter li:not(".claim-property") a').removeClass('current');
            $(this).addClass('current');
            if($(this).attr('data-filter') === 'all'){
                table.columns(4).search('').draw();
                table.columns(2).search('').draw();
                $('#propertiesTableBusiness .filter').text('');
            }else if($(this).attr('data-filter') === 'MNO Client'){
                table.columns(2).search($(this).attr('data-filter')).draw();
                table.columns(4).search('').draw();
            }
            else {
                table.columns(4).search($(this).attr('data-filter')).draw();
                table.columns(2).search('').draw();
                $('#propertiesTableBusiness .filter').text($(this).attr('data-filter'));
            }
            $('#propertiesTableBusiness .count').text(table.page.info().recordsDisplay);

        });

        $('.data-filter').insertBefore($('#propertiesTableBusiness'));

        $('#propertiesTableBusiness_length').insertAfter($('#propertiesTableBusiness_info')).css({'float' : 'none', 'margin-left': '30px', 'display' : 'inline-block', 'margin-top': '13px'});
        $('#propertiesTableBusiness_paginate').css({'margin-top': '8px','margin-right': '-10px'});



                $(document).on('click', '.no-properties .data-filter  li:not(".claim-property") a', function(e) {
                    $('.no-properties .data-filter  li:not(".claim-property") a').removeClass('current');
                    $(this).addClass('current');
                    $('.no-properties .filter-help').text($('.current').attr('data-help'));
                });
                $('.no-properties .filter-help').text($('.current').attr('data-help'));




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

        function statusText(status){
            var text;
            if(status === 'declined 1'){
                text = "Property link declined by VOA";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>The property link has been declined by the VOA. If you believe this has been done in error, you should contact the VOA.</p>' +
                    '<p>Telephone: <strong>03000 501 501</strong></p>'
                );
                return text;
            }else if(status === 'declined 2'){
                text = "Agent declined representation request";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>The agent has declined your request for them to represent you for this property. They won’t be able to view detailed property information or start checks and challenges.</p>'
                );
                return text;
            }else if(status === 'declined 3'){
                text = "Property link revoked by VOA";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>The VOA has removed your link to this property. You can no longer view detailed property information or start or continue checks and challenges.</p>' +
                    '<p>If you believe this has been done in error, you should contact the VOA.</p>' +
                    '<p>Telephone: <strong>03000 501 501</strong></p>'
                );
                return  text;
            }else if(status === 'declined 4'){
                text = "Agent ended representation";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>Your agent has informed us that they no longer want to represent you for this property. They can no longer view detailed property information or start or continue checks and challenges.</p>'
                );
                return text;
            }else if(status === 'declined 5'){
                text = "Agent representation ended by client";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>You’ve informed us that you no longer want the agent to represent you for this property. They can no longer view detailed property information or start or continue checks and challenges.</p>'
                );
                return text;
            }else if(status === 'declined 6'){

                text = "Agent representation request timed out";
                $('#dialog-status .heading-small').text(text)
                $('#dialog-status .dialog-status-content').html(
                    '<p>Your agent request has timed out as the agent has not responded. If you still want to them to represent you for the property, you’ll need to appoint them again.</p>'
                );
                return text;
            }else{
                return 'Approved';
            }
        }

        $('.property-address').text(getUrlVars()["address"]);
        $('.property-client-name').text(getUrlVars()["client"]);
        $('.property-ba-ref').text(getUrlVars()["ba"]);
        $('.business-table .property-status').text(statusText(getUrlVars()["status"]));

    };

    root.VOA.PropertiesTableBusiness = PropertiesTableBusiness;

}).call(this);
