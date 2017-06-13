(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var myPropertiesTable = function (){

        $(document).on('click', '#myPropertiesTable thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#myPropertiesTable thead tr#filterrow th')
            .not('#myPropertiesTable thead tr#filterrow th:eq(2), #myPropertiesTable thead tr#filterrow th:eq(3)')
                .each( function () {
                    $(this).html( '<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>' );
            });

        $('#myPropertiesTable thead tr#filterrow th:eq(3)').html('<a href="#" class="clear">Clear search</a>');


        var table = $('#myPropertiesTable').DataTable({
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
              { "bSortable": false},
               { "bSortable": false },
               { "bSortable": false, "visible": false   }
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {



                if(aData[3] === 'y'){
                        $('td:eq(3)', nRow).html('<ul class="list list-actions"><li><a href="#">Accept client request</a></li><li><a href="#">Reject client request</a></li></ul>');
                }else if(aData[4] === "Pending"){
                        $('td:eq(3)', nRow).html('<a href="/dashboard/4/agent/pending?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Pending VOA approval</a>');
                }else{
                    $('td:eq(3)', nRow).html('<a href="/dashboard/4/agent/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'&status='+aData[4]+'">Property details</a>');
                }

                if(!aData[2]){
                    $('td:eq(2)', nRow).html('<a href="/dashboard/4/agent/appoint-agent">Appoint agent</a>');

                }




            },
            initComplete: function( settings, json ) {
                table.columns(2).search('ABC Agent').draw();
                table.columns(4).search('Approved').draw();
                $('#myPropertiesTable .count').text(table.page.info().recordsDisplay);
                $('#myPropertiesTable .filter').text('approved');

            }
        });

        $("#myPropertiesTable thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });

        //table.columns(2).search("ABC Agent").draw();
        //table.columns(4).search('').draw();


        $(document).on('click', '#myPropertiesTable #filterrow button', function(e) {
            e.preventDefault();
            var i = $(this).closest('th').index();
            var value = $(this).prev().val();
            table.columns(i).search(value).draw();
        });

        $(document).on('click', '#myPropertiesTable .clear', function(e) {
            e.preventDefault();
            $('#filterrow input').val('');
            table.columns(0).search('').draw();
            table.columns(1).search('').draw();
        });


        function count(){
             if(table.page.info()){
                 return table.page.info().recordsDisplay
            }
        }

        $(document).on('click', '#myPropertiesTable_wrapper .data-filter li:not(".claim-property") a', function(e) {
            $('.data-filter li:not(".claim-property") a').removeClass('current');

            $(this).addClass('current');

             if($(this).attr('data-filter') === 'ABC Agent'){
                table.columns(2).search('ABC Agent').draw();
                table.columns(4).search('').draw();
                console.log('all')
                $('#myPropertiesTable .filter').text('');
            }else  if($(this).attr('data-filter') === 'approved'){
                table.columns(2).search('ABC Agent').draw();
                table.columns(4).search('approved').draw();
                $('#myPropertiesTable .filter').text($(this).attr('data-filter'));
                console.log('approved')
            }else  if($(this).attr('data-filter') === 'pending'){
                table.columns(2).search('ABC Agent').draw();
                table.columns(4).search('pending').draw();
                $('#myPropertiesTable .filter').text($(this).attr('data-filter'));
                console.log('pending')
            }else  if($(this).attr('data-filter') === 'declined'){
                table.columns(2).search('ABC Agent').draw();
                table.columns(4).search('declined').draw();
                $('#myPropertiesTable .filter').text($(this).attr('data-filter'));
                console.log('declined');
            }

            $('#myPropertiesTable .count').text(count());
        });

        $('.data-filter').insertBefore($('#myPropertiesTable'));

        $('#myPropertiesTable_length').insertAfter($('#myPropertiesTable_info')).css({'float' : 'none', 'margin-left': '30px', 'display' : 'inline-block', 'margin-top': '13px'});
        $('#myPropertiesTable_paginate').css({'margin-top': '8px','margin-right': '-10px'});


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

    root.VOA.myPropertiesTable = myPropertiesTable;

}).call(this);
