(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var Pagination = function (){


        $('#dataTable').DataTable({
            'ajax': 'https://api.myjson.com/bins/1e1cmv',
               "info": true,
               "paging": true,
               "lengthChange": true,
                "searching": true,
                "ordering": true,
                "language": {
                    "info": "Showing page _PAGE_ of _PAGES_",
                    "lengthMenu": "Show _MENU_ rows",
                     "sSearch": "Filter results"
                },
                "aoColumns": [
                    {"width": "auto"},
                    {"width": "208px"},
                    {"width": "auto"},
                    {"width": "auto"},
                    { "width": "120px", "sClass": "last", 'bSortable': false}
                ],
                "columnDefs": [
                    { targets: 'no-sort', orderable: false }
                ],
                "lengthMenu": [[15, 25, 50, 100], [15, 25, 50, 100]]
        });

        $('#dataTableClients').DataTable({
            "info": true,
            "paging": true,
            "lengthChange": false,
             "searching": false,
             "ordering": false,
             "language": {
                 "info": "Showing _START_ to _END_ of _TOTAL_"
             },
        });


        //filtering

        $(document).on('click', '#dataTableFilter thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#dataTableFilter thead tr#filterrow th').not('#dataTableFilter thead tr#filterrow th:last').each( function () {
               var title = $('#dataTableClients thead th').eq( $(this).index() ).text();
               $(this).html( '<input type="text" />' );
           } );

           var table = $('#dataTableFilter').DataTable( {
               ajax: 'https://api.myjson.com/bins/1e1cmv',
               orderCellsTop: true,
                "aoColumns": [
                    {"width": "auto"},
                    {"width": "208px"},
                    {"width": "auto"},
                    {"width": "auto"},
                    { "width": "120px", "sClass": "last", 'bSortable': false}
                ],
           } );

           $("#dataTableFilter thead input").on( 'keyup change', function () {
               table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
           } );

           $('#dataTableFilter').closest('.table-wrapper').find('.dataTables_filter').remove();





    };

    root.VOA.Pagination = Pagination;

}).call(this);
