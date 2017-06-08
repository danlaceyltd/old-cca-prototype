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

        $('#dataTableFilter thead tr#filterrow th').
            not('#dataTableFilter thead tr#filterrow th:eq(2), #dataTableFilter thead tr#filterrow th:eq(4)')
                .each( function () {
                    //var title = $('#dataTableFilter thead th').eq( $(this).index() ).text();
                    $(this).html( '<input type="text" />' );
            });

           var table = $('#dataTableFilter').DataTable( {
               ajax: 'https://api.myjson.com/bins/1e1cmv',
               orderCellsTop: true,
                "aoColumns": [
                    {"width": "auto"},
                    {"width": "208px"},
                    {"width": "auto"},
                    {"width": "auto"},
                    {"width": "120px", "sClass": "last", 'bSortable': false}
                ],
                initComplete: function () {
                    this.api().columns(2).every( function () {
                        var column = this;
                        var select = $('<select><option value=""></option></select>')
                            .appendTo( $('#dataTableFilter thead tr#filterrow th:eq(2)') )
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );

                                column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                    .draw();
                            } );

                        column.data().unique().sort().each( function ( d, j ) {
                            select.append( '<option value="'+d+'">'+d+'</option>' )
                        } );
                    } );
                }
           } );

            $("#dataTableFilter thead input").on( 'keyup change', function () {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            });

            $('#dataTableFilter').closest('.table-wrapper').find('.dataTables_filter').empty().append('<a href="#">Show filters</a>');

            $(document).on('click', '#dataTableFilter_filter a', function(e) {
                e.preventDefault();
                $('#dataTableFilter thead tr#filterrow').toggle();
                $(this).text(function(i, text){
                    return text === 'Show filters' ? 'Hide filters' : 'Show filters';
                });
            });

    };

    root.VOA.Pagination = Pagination;

}).call(this);
