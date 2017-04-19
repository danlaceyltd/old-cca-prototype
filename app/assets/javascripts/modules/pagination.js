(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var Pagination = function (){


        $('#dataTable').DataTable({
            'ajax': 'https://api.myjson.com/bins/1eoa93',//'https://api.myjson.com/bins/31ixi',
               "info": true,
               "paging": true,
               "lengthChange": true,
                "searching": true,
                "ordering": true,
                "language": {
                    "info": "Showing page _PAGE_ of _PAGES_",
                    "lengthMenu": "Show _MENU_ rows",
                     "sSearch": "Filter"
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
                ]
        });


    };

    root.VOA.Pagination = Pagination;

}).call(this);
