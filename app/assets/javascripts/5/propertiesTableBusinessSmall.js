(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var PropertiesTableBusinessSmall = function (){

        $(document).on('click', '#propertiesTableBusinessSmall thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#propertiesTableBusinessSmall thead tr#filterrow th')
            .not('#propertiesTableBusinessSmall thead tr#filterrow th:eq(3)')
                .each( function () {
                    $(this).html( '<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>' );
            });

            $('#propertiesTableBusinessSmall thead tr#filterrow th:eq(3)').html('<a href="#" class="clear">Clear search</a>');


        var table = $('#propertiesTableBusinessSmall').DataTable({
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
                if(!aData[2]){
                    $('td:eq(2)', nRow).html('<a href="/dashboard/4/business-small/appoint-agent">Appoint agent</a>');
                }

                if(aData[4] === "Approved"){
                    $('td:eq(3)', nRow).html('<a href="/dashboard/4/business-small/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Property details</a>');
                }else if(aData[4] === "Pending"){
                    $('td:eq(3)', nRow).html('<a href="/dashboard/4/business-small/pending">Pending VOA approval</a>');
                }
            }
        });

        $("#propertiesTableBusinessSmall thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });

        $(document).on('click', '#propertiesTableBusinessSmall #filterrow button', function(e) {
            e.preventDefault();
            var i = $(this).closest('th').index();
            var value = $(this).prev().val();
            table.columns(i).search(value).draw();
        });

        $(document).on('click', '#propertiesTableBusinessSmall .clear', function(e) {
            e.preventDefault();
            $('#filterrow input').val('');
            table.columns(0).search('').draw();
            table.columns(1).search('').draw();
        });


        $(document).on('click', '#propertiesTableBusinessSmall_wrapper .data-filter li:not(".claim-property") a', function(e) {
            $('.data-filter li:not(".claim-property") a').removeClass('current');
            $(this).addClass('current');
            if($(this).attr('data-filter') === 'all'){
                table.columns(4).search('').draw();
                table.columns(2).search('').draw();
                $('#propertiesTableBusinessSmall .filter').text('');
            }else if($(this).attr('data-filter') === 'MNO Client'){
                table.columns(2).search($(this).attr('data-filter')).draw();
                table.columns(4).search('').draw();
            }
            else {
                table.columns(4).search($(this).attr('data-filter')).draw();
                table.columns(2).search('').draw();
                $('#propertiesTableBusinessSmall .filter').text($(this).attr('data-filter'));
            }
            $('#propertiesTableBusinessSmall .count').text(table.page.info().recordsDisplay);
        });

        function count(){
             if(table.page.info()){
                 return table.page.info().recordsDisplay
            }
        }


        table.columns(4).search('Approved').draw();
        table.columns(2).search('').draw();
        $('#propertiesTableBusinessSmall .count').text(count());
        $('#PropertiesTableBusinessSmall .filter').text('approved');


        $('.data-filter').insertBefore($('#propertiesTableBusinessSmall'));
        $('#propertiesTableBusinessSmall_length').insertAfter($('#propertiesTableBusinessSmall_info')).css({'float' : 'none', 'margin-left': '30px', 'display' : 'inline-block', 'margin-top': '13px'});
        $('#propertiesTableBusinessSmall_paginate').css({'margin-top': '8px','margin-right': '-10px'});


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


        $('.property-address').text(getUrlVars()["address"]);
        $('.property-client-name').text(getUrlVars()["client"]);
        $('.property-ba-ref').text(getUrlVars()["ba"]);



    };

    root.VOA.PropertiesTableBusinessSmall = PropertiesTableBusinessSmall;

}).call(this);
