(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var ClientsTable = function (){



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

        var client = getUrlVars()["client"];
        var address = getUrlVars()["address"];

        $(document).on('click', '#clientsTable thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#clientsTable thead tr#filterrow th')
            .not('#clientsTable thead tr#filterrow th:eq(3), #clientsTable thead tr#filterrow th:eq(4)' )
                .each( function () {
                    $(this).html( '<input type="search" />' );
            });


        var table = $('#clientsTable').DataTable({
            ajax: 'https://api.myjson.com/bins/ns9vp',
            orderCellsTop: true,

            initComplete: function () {
/*
                this.api().columns(0).every( function () {
                    var column = this;
                    var select = $('<select><option value="">All clients</option></select>')
                        .appendTo( $('#clientsTable thead tr#filterrow th:eq(0)') )
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
*/

                        table.columns(0).search(client).draw();
                        table.columns(1).search(address).draw();
                        $("#clientsTable #filterrow th:eq(1) input").val(address);
                        $("#clientsTable #filterrow th:eq(0) input").val(client);


                        if(client || address){
                            $('.data-filter a').removeClass('current');
                        }

            },

            "language": {
                "info": "Showing page _PAGE_ of _PAGES_",
                "lengthMenu": "Show _MENU_"
            },

            "aoColumns": [
             null,
              null,
              null,
               { "bSortable": false },
               { "bSortable": false }
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {


                //$('td:eq(1)', nRow).html('<a href="/dashboard/2/manage-clients">'+aData[1]+'</a>');
                //$('td:eq(2)', nRow).html('<a href="/dashboard/2/valuations">View valuations</a>');

            }
        });

        $("#clientsTable thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });

        $("#clientsTable thead input").on( 'input', function (e) {
            if (!this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });


        $(document).on('click', '.data-filter li:not(".claim-property") a', function(e) {
            e.preventDefault();
            $('.data-filter li:not(".claim-property") a').removeClass('current');
            $(this).addClass('current');
            if($(this).attr('data-filter') === 'all'){

                $('#clientsTable input').val('');
                table.columns(0).search('').draw();
                table.columns(1).search('').draw();
                table.columns(2).search('').draw();

            } else {
                table.columns(0).search($(this).attr('data-filter')).draw();
            }
        });

        $('.data-filter').insertBefore($('#clientsTable'));

        $("#clientsTable #filterrow").change(function(){
            if(!$(this).val()){
                $('.data-filter a').removeClass('current');
            }
        });




    };

    root.VOA.ClientsTable = ClientsTable;

}).call(this);
