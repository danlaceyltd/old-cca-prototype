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
                    $('td:eq(3)', nRow).html('<a href="/dashboard/4/business/pending">Pending VOA approval</a>');
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
                $('#PropertiesTableBusiness .filter').text('approved');

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

        function statusText(status){
            if(status === 'declined 1'){
                return 'Property link declined by VOA';
            }else if(status === 'declined 2'){
                return 'Agent declined representation request';
            }else if(status === 'declined 3'){
                return  'Property link revoked by VOA';
            }else if(status === 'declined 4'){
                return 'Agent ended representation';
            }else if(status === 'declined 5'){
                return 'Agent representation ended by client';
            }else if(status === 'declined 6'){
                return 'Agent representation request timed out';
            }else{
                return 'Approved';
            }
        }

        $('.property-address').text(getUrlVars()["address"]);
        $('.property-client-name').text(getUrlVars()["client"]);
        $('.property-ba-ref').text(getUrlVars()["ba"]);
        $('.property-status').text(statusText(getUrlVars()["status"]));



    };

    root.VOA.PropertiesTableBusiness = PropertiesTableBusiness;

}).call(this);
