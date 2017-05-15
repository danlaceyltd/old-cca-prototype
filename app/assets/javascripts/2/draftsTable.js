(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var DraftsTable = function (){



        $(document).on('click', '#draftsTable thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#draftsTable thead tr#filterrow th')
            .not('#draftsTable thead tr#filterrow th:eq(2), #draftsTable thead tr#filterrow th:eq(3), #draftsTable thead tr#filterrow th:eq(4), #draftsTable thead tr#filterrow th:eq(5)' )
                .each( function () {
                    $(this).html( '<input type="search" />' );
            });


        var table = $('#draftsTable').DataTable({
            orderCellsTop: true,

            "language": {
                "info": "Showing page _PAGE_ of _PAGES_",
                "lengthMenu": "Show _MENU_"
            },
            /*
            initComplete: function () {
                this.api().columns(2).every( function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo( $('#draftsTable thead tr#filterrow th:eq(2)') )
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
                });

            },
*/
            "aoColumns": [
             null,
             null,
             null,
             {"visible": false },
             null,
             { "bSortable": false }
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {


                //$('td:eq(1)', nRow).html('<a href="/dashboard/2/manage-clients">'+aData[1]+'</a>');
                //$('td:eq(2)', nRow).html('<a href="/dashboard/2/valuations">View valuations</a>');

            }
        });

        $("#draftsTable thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });

        $("#draftsTable thead input").on( 'input', function (e) {
            if (!this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });


        $(document).on('click', '.data-filter a', function(e) {
            $('.data-filter a').removeClass('current');
            $(this).addClass('current');
            if($(this).attr('data-filter') === 'all'){
                table.columns(3).search('').draw();
            } else {
                table.columns(3).search($(this).attr('data-filter')).draw();
            }
        });

        $('.data-filter').insertBefore($('#draftsTable'));




    };

    root.VOA.DraftsTable = DraftsTable;

}).call(this);
