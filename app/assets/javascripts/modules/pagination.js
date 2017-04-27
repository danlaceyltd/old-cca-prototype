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
                "lengthMenu": [[15, 25, 50, 10], [15, 25, 50, 100]]
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


    };

    root.VOA.Pagination = Pagination;

}).call(this);
