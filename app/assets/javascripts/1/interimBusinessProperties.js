(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var InterimBusinessProperties = function (){


        $(document).on('click', '#interimBusinessProperties thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#interimBusinessProperties thead tr#filterrow th')
            .not('#interimBusinessProperties thead tr#filterrow th:eq(2), #interimBusinessProperties thead tr#filterrow th:eq(3), #interimBusinessProperties thead tr#filterrow th:eq(4), #interimBusinessProperties thead tr#filterrow th:eq(5), #interimBusinessProperties thead tr#filterrow th:eq(6)')
                .each( function () {
                    $(this).html( '<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>' );

            });

        $('#interimBusinessProperties thead tr#filterrow th:eq(6)').html('<a href="#" class="clear">Clear search</a>');


        var table = $('#interimBusinessProperties').DataTable({
            ajax: 'https://api.myjson.com/bins/9p3ut',
            orderCellsTop: true,
            "lengthChange": false,
            //stateSave: true,
            "language": {
                "info": "Showing page _PAGE_ of _PAGES_",
                "lengthMenu": "Show _MENU_"
            },
            "aoColumns":[

                {"visible": false   },
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": false },
                {"visible": false   },
                { "bSortable": false },
                { "bSortable": false, width:'120px' }

            ],
             'order': [[1, 'asc']],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                $('td:eq(4)', nRow).html('<ul class="list list-actions"><li><a href="/dashboard/1/appoint-agent">Appoint agent</a></li><li><a href="/dashboard/1/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Property details</a></li></ul>');


            },
            initComplete: function( settings, json ) {
                table.columns(3).search('ABC Business').draw();
            },
            drawCallback: function( settings ) {

            }

        });


        $(document).on('click', '#interimBusinessProperties #filterrow button', function(e) {
            e.preventDefault();
            var i = $(this).closest('th').index()+1;
            var value = $(this).prev().val();
            table.columns(i).search(value).draw();
            console.log(i)
        });

        $(document).on('click', '#interimBusinessProperties .clear', function(e) {
            e.preventDefault();
            $('#filterrow input').val('');
            table.columns(0).search('').draw();
            table.columns(1).search('').draw();
            table.columns(2).search('').draw();
            table.columns(3).search('').draw();
            table.columns(4).search('').draw();
            table.columns(5).search('').draw();
            table.columns(6).search('').draw();
        });


        $("#interimBusinessProperties thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });



    };

    root.VOA.InterimBusinessProperties = InterimBusinessProperties;

}).call(this);
