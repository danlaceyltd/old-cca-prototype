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
            .not('#propertiesTable thead tr#filterrow th:eq(0), #propertiesTable thead tr#filterrow th:eq(4)')
                .each( function () {
                    $(this).html( '<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>' );

            });

        $('#propertiesTable thead tr#filterrow th:eq(4)').html('<a href="#" class="clear">Clear search</a>');


        $(document).on('click', '#propertiesTable #filterrow button', function(e) {
            e.preventDefault();
            var i = $(this).closest('th').index();
            var value = $(this).prev().val();
            table.columns(i).search(value).draw();
        });

        $(document).on('click', '#propertiesTable .clear', function(e) {
            e.preventDefault();
            $('#filterrow input').val('');
            table.columns(1).search('').draw();
            table.columns(2).search('').draw();
            table.columns(3).search('').draw();
        });





        var table = $('#propertiesTable').DataTable({
            ajax: 'https://api.myjson.com/bins/wqmfl',//'https://api.myjson.com/bins/11vcw9',
            orderCellsTop: true,
            //stateSave: true,
            "language": {
                "info": "Showing page _PAGE_ of _PAGES_",
                "lengthMenu": "Show _MENU_"
            },
            "aoColumns": [{
                'checkboxes': {
                'selectRow': true
                }
            },
             null,
             null,
             null,
               { "bSortable": false },
               { "bSortable": false, "visible": false   }
            ],
             'order': [[1, 'asc']],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                //console.log(aData[0])

                $('td:eq(0)', nRow).find('input').attr('id', 'row_'+aData[0]);

                if(aData[4] === 'y'){
                        $('td:eq(4)', nRow).html('<ul class="list list-actions"><li><a href="#">Accept client request</a></li><li><a href="#">Reject client request</a></li></ul>');
                }else if(aData[5] === "Pending"){
                        $('td:eq(4)', nRow).html('<a href="/dashboard/5/agent/pending?client='+aData[3]+'&address='+aData[1]+'&ba='+aData[2]+'">Pending VOA approval</a>');
                }else if(aData[5] === "declined 1" || aData[5] === "declined 2" || aData[5] === "declined 3" || aData[5] === "declined 4" || aData[5] === "declined 5" || aData[5] === "declined 6"){
                    $('td:eq(4)', nRow).html('<ul class="list list-actions"><li><a href="/dashboard/5/agent/valuations?client='+aData[3]+'&address='+aData[1]+'&ba='+aData[2]+'&status='+aData[5]+'">Property details</a></li><li><a href="#">Delete</a></li></ul>');

                }else{
                    $('td:eq(4)', nRow).html('<a href="/dashboard/5/agent/valuations?client='+aData[3]+'&address='+aData[1]+'&ba='+aData[2]+'&status='+aData[5]+'">Property details</a>');

                }

                if(!aData[3]){
                    $('td:eq(3)', nRow).html('<a href="/dashboard/5/agent/appoint-agent">Appoint agent</a>');

                }



            },
            initComplete: function( settings, json ) {
                table.columns(5).search('Approved').draw();
                table.columns(3).search('').draw();
                $('#propertiesTable .count').text(table.page.info().recordsDisplay);
                $('#propertiesTable .filter').text('approved');

            },
            "drawCallback": function( settings ) {
                isChecked();
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
                table.columns(5).search('').draw();
                table.columns(3).search('').draw();
                $('#propertiesTable .filter').text('');
            }else if($(this).attr('data-filter') === 'ABC Agent'){
                table.columns(3).search($(this).attr('data-filter')).draw();
                table.columns(4).search('').draw();
            }
            else {
                table.columns(5).search($(this).attr('data-filter')).draw();
                table.columns(3).search('').draw();
                $('#propertiesTable .filter').text($(this).attr('data-filter'));
            }
            $('#propertiesTable .count').text(table.page.info().recordsDisplay);






        });

        $('.data-filter').insertBefore($('#propertiesTable'));

        $('#propertiesTable_length').insertAfter($('#propertiesTable_info')).css({'float' : 'none', 'margin-left': '30px', 'display' : 'inline-block', 'margin-top': '13px'});
        $('#propertiesTable_paginate').css({'margin-top': '8px','margin-right': '-10px'});

        function isChecked(){
            $('#propertiesTable .dt-checkboxes').each(function(){

                if($(this).is(':checked')){
                    $(this).closest('tr').addClass('selected')
                }else{
                    $(this).closest('tr').removeClass('selected')
                }

            });
        }


        $(document).on('change', '#propertiesTable .dt-checkboxes-select-all input[type="checkbox"], .dt-checkboxes', function(e) {
            isChecked();

            var len = $('input[type=checkbox]:checked').length;
                if (len > 0) {
                    drawBulkAction()
                } else if (len === 0) {
                    $('#propertiesTable_wrapper .bulk-action').remove();
                }

        });

        function drawBulkAction(){
                $('#propertiesTable_wrapper .bulk-action').remove();
                $('#propertiesTable_wrapper .data-filter li:last-child').after(
                    '<li class="bulk-action">' +
                        '<label for="bulk-action-select" class="visuallyhidden">Bulk action</label>' +
                        '<select name="bulk-action-select" class="form-control" style="width:200px; border-width: 1px; border-color: rgb(166, 166, 166); font-size: initial">' +
                            '<option selected="true" disabled="disabled">More actions</option>' +
                            '<option value="1">bulk action 1</option>' +
                            '<option value="2">bulk action 2</option>' +
                            '<option value="3">bulk action 3</option>' +
                        '</select>' +
                    '</li>'
                );
        }


        /*
        $(document).on('change', '#propertiesTable_wrapper  [name="bulk-action-select"]', function(e) {
            var array = [];
            $('#propertiesTable .dt-checkboxes:checked').each(function(){
                array.push($(this).attr('id'));
            });
            alert($('.bulk-action option:selected').text() + ' on rows ' + array.toString())

        });
        */




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

    root.VOA.PropertiesTable = PropertiesTable;

}).call(this);
